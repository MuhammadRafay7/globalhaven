"use client";
import React, { useTransition, useState, useEffect } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { TbWorld } from "react-icons/tb";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import Modal from "./Modal";
import SpinnerMini from "../Loader";
import { registerUser } from "@/services/auth";

const AuthModal = ({
  name,
  onCloseModal,
}: {
  name?: string;
  onCloseModal?: () => void;
}) => {
  const [isLoading, startTransition] = useTransition();
  const [title, setTitle] = useState(name || "");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setError,
    setFocus,
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "", name: "" },
  });
  const router = useRouter();
  const isLoginModal = title === "Login";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoginModal) setFocus("email");
      else setFocus("name");
    }, 300);
    return () => clearTimeout(timer);
  }, [isLoginModal, setFocus]);

  const onToggle = () => {
    const newTitle = isLoginModal ? "Sign up" : "Login";
    setTitle(newTitle);
    reset();
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const { email, password, name } = data;
    startTransition(async () => {
      try {
        if (isLoginModal) {
          const callback = await signIn("credentials", {
            email,
            password,
            redirect: false,
          });
          if (callback?.error) throw new Error(callback.error);
          if (callback?.ok) {
            toast.success("Welcome back to GlobalHaven!");
            onCloseModal?.();
            router.refresh();
          }
        } else {
          await registerUser({ email, password, name });
          setTitle("Login");
          toast.success("Account created! Welcome to GlobalHaven.");
          reset();
        }
      } catch (error: any) {
        toast.error(error.message);
        if (isLoginModal) {
          reset();
          setError("email", {});
          setError("password", {});
          setTimeout(() => setFocus("email"), 100);
        }
      }
    });
  };

  return (
    <div className="h-full w-full bg-white dark:bg-dark-card">
      <Modal.WindowHeader title={title} />
      <div className="flex flex-col items-center gap-1 pt-5 px-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
            <TbWorld className="text-white" size={15} />
          </div>
          <span className="font-bold text-lg text-slate-900 dark:text-white">
            Global<span className="text-primary-600 dark:text-primary-400">Haven</span>
          </span>
        </div>
      </div>
      <form
        className="flex flex-col gap-4 p-6 pb-0 w-full h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading
          title={!isLoginModal ? "Create your account" : "Welcome back"}
          subtitle={
            title === "Sign up"
              ? "Join millions of travelers worldwide"
              : "Sign in to access your account"
          }
        />

        {!isLoginModal && (
          <Input
            id="name"
            label="Full Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            watch={watch}
          />
        )}

        <Input
          id="email"
          label="Email Address"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          watch={watch}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          watch={watch}
        />

        <Button
          type="submit"
          className="flex items-center justify-center h-[44px] mt-1"
        >
          {isLoading ? <SpinnerMini className="w-5 h-5" /> : "Continue"}
        </Button>
      </form>
      <div className="flex flex-col gap-3 mt-3 p-6 pt-0">
        <div className="relative">
          <hr className="border-slate-200 dark:border-dark-border" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-dark-card px-3 text-xs text-slate-400 dark:text-slate-500 font-medium">
            or continue with
          </span>
        </div>
        <Button
          outline
          onClick={() => signIn("google")}
          className="flex flex-row justify-center gap-2 items-center px-3 py-2.5"
        >
          <FcGoogle className="w-5 h-5" />
          <span className="text-[14px]">Google</span>
        </Button>
        <Button
          outline
          onClick={() => signIn("github")}
          className="flex flex-row justify-center gap-2 items-center px-3 py-2.5"
        >
          <AiFillGithub className="w-5 h-5" />
          <span className="text-[14px]">GitHub</span>
        </Button>
        <div className="text-center mt-1 mb-3">
          <small className="text-[14px] text-slate-500 dark:text-slate-400">
            {!isLoginModal ? "Already have an account?" : "New to GlobalHaven?"}
          </small>
          <button
            type="button"
            onClick={onToggle}
            className="text-primary-600 dark:text-primary-400 cursor-pointer hover:underline ml-1.5 font-semibold text-[14px]"
          >
            {!isLoginModal ? "Log in" : "Create an account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
