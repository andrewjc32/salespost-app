import { verifyEmail } from "@/actions/authActions";
import { Card, Spinner, Alert } from "flowbite-react";
import AlertMessage from "@/app/(auth)/verify-email/AlertMessage";

const VerifyEmailPage = async ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  const result = await verifyEmail(searchParams.token);
  return (
    <div className="items-center flex justify-center align-middle h-screen">
      <Card className="max-w-sm w-4/5 mx-auto">
      <h5 className="text-center">Verifying your email please wait</h5>
      {!result && <Spinner />}
      <AlertMessage result={result} />
    </Card>
    </div>
  );
};

export default VerifyEmailPage;
