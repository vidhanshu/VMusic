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
import Image from "next/image";
import { ArrowLeft, ChevronRight } from "lucide-react";
import Logo from "@/components/common/Logo";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "@/zod-schemas/auth";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof SignInSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof SignInSchema>> = ({
    password,
    email,
  }) => {
    console.log(password, email);
  };

  return (
    <Card className="w-[500px] bg-primary-800 p-8 shadow-md">
      <CardHeader className="block space-y-4">
        <Logo withName className="mx-auto w-fit" />
        <div className="flex items-center  gap-x-4">
          <Button
            color="primary"
            isIconOnly
            radius="full"
            startContent={<ArrowLeft size={16} />}
          />
          <Typography variant="T_Bold_H3">Sign in to your account</Typography>
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
            {errors.email?.message && (
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
            {errors.password?.message && (
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
            Sign in
          </Button>
        </form>
        <Typography className="text-center">
          Don&apos; Have an account?{" "}
          <Link className="hover:underline" href="/sign-up">
            Sign up
          </Link>
        </Typography>
      </CardBody>
      <Divider />
      <CardFooter className="items-center gap-x-4">
        <Button
          fullWidth
          className="bg-primary-500"
          startContent={
            <Image src="/google.svg" alt="google" width={24} height={24} />
          }
        />
        <Button
          fullWidth
          className="bg-primary-500"
          startContent={
            <Image src="/github.svg" alt="google" width={24} height={24} />
          }
        />
      </CardFooter>
    </Card>
  );
}
