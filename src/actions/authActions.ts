"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { signUpSchema, SignUpSchema } from "@/lib/schemas/signUpSchema";
import { TokenType, User } from "@prisma/client";
import { ActionResult } from "@/types";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { AuthError } from "next-auth";
import { generateToken, getTokenByToken } from "@/lib/tokens";
import { sendResetPassword, sendVerifyEmail } from "@/lib/mail";

export async function signUp(data: SignUpSchema): Promise<ActionResult<User>> {
  try {
    const validated = signUpSchema.safeParse(data);

    if (!validated.success) {
      return { status: 'error', error: validated.error.errors };
    }

    const { name, email, password } = validated.data;

    const passwordHash = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { status: 'error', error: "User already exists." };
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    const verificationToken = await generateToken(email, TokenType.VERIFICATION);

    await sendVerifyEmail(verificationToken.email, verificationToken.token);

    return { status: 'success', data: user };
  } catch (error) {
    console.error(error);
    return { status: 'error', error: "An error occurred, please try again later." };
  }
}

export async function getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
}

export async function signInUser(data: LoginSchema): Promise<ActionResult<string>> {
  try {
    const existingUser = await getUserByEmail(data.email);

    if(!existingUser || !existingUser.email) {
      return { status: 'error', error: 'Invalid credentials' };
    }

    if(!existingUser.emailVerified) {
      const token = await generateToken(data.email, TokenType.VERIFICATION);

      await sendVerifyEmail(data.email, token.token);

      return { status: 'error', error: 'Please verify your email' };
    }

    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false
    });

    return { status: 'success', data: 'Logged in' };
  } catch (error) {
    console.error(error);
    if(error instanceof AuthError) {
      switch(error.type) {
        case 'CredentialsSignin': {
          return { status: 'error', error: 'Invalid credentials' };
        }
        default: {
          return { status: 'error', error: 'An error occurred, please try again later.' };
        }
      }
    } else {
      return { status: 'error', error: 'An error occurred, please try again later.' };
    }
  }
}

export async function signOutUser() {
  await signOut({ redirectTo: '/' });
}

export async function verifyEmail(token: string): Promise<ActionResult<string>> {
  try {
    const existingToken = await getTokenByToken(token);

    if(!existingToken) {
      return { status: 'error', error: 'Invalid token' };
    }

    const hasExpired = new Date() > existingToken.expires;

    if(hasExpired) {
      return { status: 'error', error: 'Token has expired' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser) {
      return { status: 'error', error: 'User not found' };
    }

    await prisma.user.update({
      where: { email: existingToken.email },
      data: { emailVerified: new Date() }
    });
    
    await prisma.token.delete({
      where: { id: existingToken.id }
    });

    return { status: 'success', data: 'Email verified' };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function requestResetPassword(email: string): Promise<ActionResult<string>> {
  try {
    const existingUser = await getUserByEmail(email);

    if(!existingUser) {
      return { status: 'error', error: 'User not found' };
    }

    const token = await generateToken(email, TokenType.PASSWORD_RESET);

    await sendResetPassword(email, token.token);

    return { status: 'success', data: 'Password reset email has been sent.' };
  } catch (error) {
    console.error(error);
    return { status: 'error', error: 'An error occurred, please try again later.' };
  }
}

export async function resetPassword(password: string, token: string | null): Promise<ActionResult<string>> {
  if(!token)
    return { status: 'error', error: 'Invalid token' };

  try {
    const existingToken = await getTokenByToken(token);

    if(!existingToken) {
      return { status: 'error', error: 'Invalid token' };
    }

    const hasExpired = new Date() > existingToken.expires;

    if(hasExpired) {
      return { status: 'error', error: 'Token has expired' };
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if(!existingUser) {
      return { status: 'error', error: 'User not found' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email: existingToken.email },
      data: { passwordHash: hashedPassword }
    });

    await prisma.token.delete({
      where: { id: existingToken.id }
    });

    return { status: 'success', data: 'Password updated successfully' };
  } catch (error) {
    console.error(error);
    return { status: 'error', error: 'An error occurred, please try again later.' };
  }
}
