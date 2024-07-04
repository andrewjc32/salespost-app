import clsx from "clsx";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { Alert } from "flowbite-react";
import { ActionResult } from "@/types";

type Props = {
  result: ActionResult<string> | null;
};

const AlertMessage = ({ result }: Props) => {
  if (!result) return null;

  const getMessage = () => {
    if (!result) return null;
    if (result.status === "success") {
      return result.data;
    } else if (Array.isArray(result.error)) {
      return result.error.map((issue) => issue.message).join(", ");
    } else {
      return result.error;
    }
  };

  return (
    <Alert rounded color={result.status === "success" ? "success" : "failure"}>
      <div
        className={clsx(
          "w-full flex items-center justify-center gap-x-2 text-sm",
          {
            "text-danger-800 bg-danger-50": result?.status === "error",
            "text-success-800 bg-success-50": result?.status === "success",
          }
        )}
      >
        {result.status === "success" ? (
          <FaCheckCircle size={20} />
        ) : (
          <FaExclamationTriangle size={20} />
        )}

        <p>{getMessage()}</p>
      </div>
    </Alert>
  );
};

export default AlertMessage;
