"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import Typography from "@/components/common/Typography";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Logo from "@/components/common/Logo";
import Link from "next/link";
import { type SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "@/zod-schemas/auth";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof SignInSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInSchema),
  });
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onSubmit: SubmitHandler<z.infer<typeof SignInSchema>> = ({
    password,
    email,
  }) => {
  };

  return (
    <Card className="w-[500px] bg-primary-800 p-8 shadow-md relative">
      <div className="absolute inset-x-0 top-0 text-center bg-success px-2 py-1 text-sm text-white">
        Only google sign in works for now!
      </div>
      <CardHeader className="block space-y-4">
        <Logo withName className="mx-auto w-fit" />
        <div className="flex items-center  gap-x-4">
          <Button
            color="primary"
            isIconOnly
            radius="full"
            startContent={<ArrowLeft size={16} />}
          />
          <Typography variant="T_Bold_H3">Sign up</Typography>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-8">
          <div className="flex flex-col gap-1">
            <label htmlFor="email-sign-in">Email</label>
            <input
              {...register("email")}
              id="email-sign-in"
              className="rounded-md bg-primary-500 p-2 focus:bg-primary-400 focus:outline-none"
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <Typography color="danger" variant="T_Regular_H7">
                {errors.email?.message}
              </Typography>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password-sign-in">Password</label>
            <input
              {...register("password")}
              id="password-sign-in"
              className="rounded-md bg-primary-500 p-2 focus:bg-primary-400 focus:outline-none"
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <Typography color="danger" variant="T_Regular_H7">
                {errors.password?.message}
              </Typography>
            )}
          </div>
          <Button
            fullWidth
            type="submit"
            className="bg-blue-500"
            endContent={<ChevronRight size={16} />}
          >
            Sign up
          </Button>
        </form>
        <Typography className="text-center">
          Already have an account?{" "}
          <Link className="hover:underline" href="/sign-in">
            Sign in
          </Link>
        </Typography>
      </CardBody>
      <Divider />
      <CardFooter className="items-center gap-x-4">
        <Button
          fullWidth
          className="bg-primary-500"
          startContent={
            <img src="/google.svg" alt="google" width={24} height={24} />
          }
        />
        <Button
          fullWidth
          className="bg-primary-500"
          startContent={
            <img src="/github.svg" alt="google" width={24} height={24} />
          }
        />
      </CardFooter>
    </Card>
  );
}
