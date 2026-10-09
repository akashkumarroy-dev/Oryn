"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import ButtonPrimary from "../ui/ButtonPrimary";

const SocialButtons = () => {
  const { signIn, fetchStatus } = useSignIn();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSignIn = async (strategy: "oauth_google" | "oauth_github") => {
    if (fetchStatus === "fetching" || !signIn) return;
    setLoading(strategy);
    try {
      const { error } = await signIn.sso({
        strategy,
        redirectUrl: "/profile",
        redirectCallbackUrl: "/sso-callback",
      });
      if (error) {
        console.error(error);
        setLoading(null);
      }
    } catch {
      setLoading(null);
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <ButtonPrimary
        label="Continue with Google"
        icon="google"
        theme="primary"
        onClick={() => handleSignIn("oauth_google")}
        disabled={loading !== null || fetchStatus === "fetching"}
      />

      <ButtonPrimary
        label="Continue with GitHub"
        icon="github"
        theme="secondary"
        onClick={() => handleSignIn("oauth_github")}
        disabled={loading !== null || fetchStatus === "fetching"}
      />
    </div>
  );
};

export default SocialButtons;