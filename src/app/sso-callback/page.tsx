"use client";

import { useRouter } from "next/navigation";
import { HandleSSOCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  const router = useRouter();

  const go = (destination: string) => {
    if (destination.startsWith("http")) {
      window.location.href = destination;
    } else {
      router.push(destination);
    }
  };

  return (
    <HandleSSOCallback
      navigateToApp={({ session, decorateUrl }) => {
        const destination = session?.currentTask
          ? decorateUrl("/profile")
          : decorateUrl("/profile");
        go(destination);
      }}
      navigateToSignIn={() => router.push("/signin")}
      navigateToSignUp={() => router.push("/signin")}
    />
  );
}