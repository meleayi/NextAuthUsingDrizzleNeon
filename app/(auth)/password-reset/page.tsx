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
  passwordRestFormSchema,
  passwordRestFormSchemaValues,
} from "@/type/auth/password-reset/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import passwordReset from "./actions";

const PasswordReset = () => {
  const form = useForm<passwordRestFormSchemaValues>({
    resolver: zodResolver(passwordRestFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: passwordRestFormSchemaValues) => {
    const response = await passwordReset(data.email);
    console.log("client side response .. ", response);
  };

  return (
    <Card className="flex gap-2 flex-col w-full justify-center text-center items-center mx-auto h-screen">
      <CardHeader className="w-full">
        <CardTitle>Password reset</CardTitle>
      </CardHeader>
      <CardDescription>
        Enter the email address to reset the password
      </CardDescription>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <fieldset
              disabled={form.formState.isSubmitting}
              className="flex flex-col gap-2.5 w-[380px]"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="email" type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!!form.formState.errors.root?.message && (
                <FormMessage>{form.formState.errors.root.message}</FormMessage>
              )}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting ? true : false}
              >
                {form.formState.isSubmitting ? "Loading ..." : "Submit"}
              </Button>
            </fieldset>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col w-full">
        <div className="flex gap-4 flex-row  text-sm text-muted-foreground text-center">
          Already have an account? {""}
          <Link href="/password-reset">Login</Link>
        </div>
        <div className="flex gap-4 flex-row text-sm text-muted-foreground text-center">
          Dont have an account? {""}
          <Link href="/register">Register</Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PasswordReset;
