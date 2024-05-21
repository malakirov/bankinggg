"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isloading, setIsloading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSumbit = async (data: z.infer<typeof formSchema>) => {
    setIsloading(true);
    try {
      //sign up with appwrite and create a plain link token.

      if (type === "sign-up") {
        const newUser = await signUp(data);
        setUser(newUser);
      } else if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className="text-26 font-ibm-flex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user
              ? "Link account"
              : type === "sign-in"
              ? "Sign in"
              : "Sign out"}
            <p className="text-gray-600 text-16 font-normal">
              {user
                ? "Link your account to get started"
                : "Please enter your details."}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap4">{/* plaid link */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      name={"firstName"}
                      placeholder={"Enter your first name"}
                      control={form.control}
                      label={"First name"}
                    />
                    <CustomInput
                      name={"lastName"}
                      placeholder={"Enter your last name"}
                      control={form.control}
                      label={"Last name"}
                    />
                  </div>
                  <CustomInput
                    name={"address1"}
                    placeholder={"Enter your specific address"}
                    control={form.control}
                    label={"Address"}
                  />
                  <CustomInput
                    name={"city"}
                    placeholder={"Enter your city"}
                    control={form.control}
                    label={"City"}
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      name={"state"}
                      placeholder={"Example: Buhairah"}
                      control={form.control}
                      label={"State"}
                    />
                    <CustomInput
                      name={"postalCode"}
                      placeholder={"Example: 11101"}
                      control={form.control}
                      label={"Postal Code"}
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      name={"dateOfBirth"}
                      placeholder={"YYYY-MM-DD"}
                      control={form.control}
                      label={"Date of birth"}
                    />
                    <CustomInput
                      name={"ssn"}
                      placeholder={"ex: 1234"}
                      control={form.control}
                      label={"SSN"}
                    />
                  </div>
                </>
              )}
              <CustomInput
                name={"email"}
                placeholder={"Enter your Email"}
                control={form.control}
                label={"Email"}
              />
              <CustomInput
                name={"password"}
                placeholder={"Enter your password"}
                control={form.control}
                label={"Password"}
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isloading}>
                  {isloading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign in"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 text-gray-600 font-normal">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};
export default AuthForm;
// 2.14 15 mins still
