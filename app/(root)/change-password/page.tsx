"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  changePasswordformSchema,
  changePasswordformSchemaValues,
} from "@/type/auth/change-password/type";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ChangePassword } from "./actions";
import { toast } from "sonner";
import { useToast } from "@/lib/toast";
// import { auth } from "@/auth";

const ChangePasswordPage = () => {
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const form = useForm<changePasswordformSchemaValues>({
    resolver: zodResolver(changePasswordformSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: changePasswordformSchemaValues) => {
    setLoading(true);

    const response = await ChangePassword({
      oldPassword: data.oldPassword,
      password: data.newPassword,
      confirmPassword: data.confirmPassword,
    });

    if (response?.error === true) {
      form.setError("root", { message: response?.message });
      //   toast.error(response.message);
      showToast("error", response.message);
    } else {
      form.reset();
      showToast("success", response.message);
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Paaword</CardTitle>
        <CardDescription>Dont fill the simple password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <fieldset
              disabled={form.formState.isSubmitting}
              className="flex flex-col gap-2.5 w-[380px]"
            >
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Old Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Old Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="New Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="confirm Password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <Button type="submit" disabled={loading ? true : false}>
                    {loading ? "Loading ..." : "Register"}
                  </Button> */}
              {!!form.formState.errors.root?.message && (
                <FormMessage>{form.formState.errors.root?.message}</FormMessage>
              )}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting ? true : false}
              >
                {form.formState.isSubmitting
                  ? "Loading ..."
                  : "Change Password"}
              </Button>
            </fieldset>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col w-full">
        <div className="flex gap-4 flex-row text-sm text-muted-foreground text-center">
          please take all charactors {/* <Link href="/login">Login</Link> */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChangePasswordPage;
