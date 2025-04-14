"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import Logout from "./actions";

const LogoutButton = () => {
  return (
    <Button
      size="sm"
      onClick={async () => {
        await Logout();
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
