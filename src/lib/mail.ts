import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerifyEmail(email: string, token: string) {
    const link = `http://localhost:3000/verify-email?token=${token}`;

    return resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Verify your email',
        html: `
            <h1>Verify your email</h1>
            <p>Click the link below to verify your email</p>
            <a href="${link}">Verify Email</a>
            `
    });
}

export async function sendResetPassword(email: string, token: string) {
    const link = `http://localhost:3000/reset-password?token=${token}`;

    return resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Reset your password',
        html: `
            <h1>Reset your password</h1>
            <p>Click the link below to reset your password</p>
            <a href="${link}">Reset Password</a>
            `
    });
}
