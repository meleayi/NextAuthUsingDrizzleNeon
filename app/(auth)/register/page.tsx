"use client";
import Errors from "@/components/Errors";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "./actions";
import Link from "next/link";
import {
  registerUserformSchema,
  RegisterUserFormSchemaValues,
} from "@/type/auth/register/type";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterUserFormSchemaValues>({
    resolver: zodResolver(registerUserformSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: RegisterUserFormSchemaValues) => {
    // setMessages({ error: false, message: "" });
    setLoading(true);
    const response = await registerUser({
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
    if (response?.error) {
      form.setError("email", { message: response?.message });
    }
    setLoading(false);
  };
  return (
    <main className="flex item-center justify-center max-h-screen mx-auto items-center mt-8">
      {form.formState.isSubmitSuccessful ? (
        <Card className="w-[300px] text-center">
          <CardHeader>
            <CardTitle>Login into your account</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href={"/login"}>Login</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Write your detail to register</CardDescription>
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

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
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
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting ? true : false}
                  >
                    {loading ? "Loading ..." : "Register"}
                  </Button>
                </fieldset>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col w-full">
            <div className="flex gap-4 flex-row text-sm text-muted-foreground text-center">
              Already have an account? {""}
              <Link href="/login">Login</Link>
            </div>
          </CardFooter>
        </Card>
      )}
    </main>
  );
};

export default Register;
