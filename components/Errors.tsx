import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

const Errors = () => {
  return (
    <div className="">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Please follow the following step tof preseed before fill and submit
          the filed{" "}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Errors;
