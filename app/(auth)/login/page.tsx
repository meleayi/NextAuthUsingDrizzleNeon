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
import { Label } from "@/components/ui/label";
import {
  loginUserFormSchama,
  loginUserFormSchamaValues,
} from "@/type/auth/login/type";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "./actions";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const form = useForm<loginUserFormSchamaValues>({
    resolver: zodResolver(loginUserFormSchama),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: loginUserFormSchamaValues) => {
    const response = await loginUser({
      email: data.email,
      password: data.password,
    });
    if (response?.error !== true) {
      form.setError("root", { message: response.message });
    } else {
      redirect("/dashboard");
    }
  };
  return (
    <div className="flex gap-3 flex-col w-full justify-center text-center items-center mx-auto h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Fill your username and password to login
          </CardDescription>
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

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Password"
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
                  <FormMessage>
                    {form.formState.errors.root.message}
                  </FormMessage>
                )}
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting ? true : false}
                >
                  {form.formState.isSubmitting ? "Loading ..." : "Login"}
                </Button>
              </fieldset>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col w-full">
          <div className="flex gap-4 flex-row text-sm text-muted-foreground text-center">
            Dont have an account? {""}
            <Link href="/register">Register</Link>
          </div>
          <div className="flex gap-4 flex-row  text-sm text-muted-foreground text-center">
            Forgot password? {""}
            <Link href="/password-reset">Forgot</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
