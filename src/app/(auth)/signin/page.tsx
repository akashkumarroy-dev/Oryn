"use client";

import Link from "next/link";
import { Code } from "reicon-react";
import LinkPrimary from "@/components/ui/LinkPrimary";
import SocialButtons from "@/components/auth/SocialButtons";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col bg-primary text-primary-foreground font-sans">
      <header className="flex items-center justify-between border-b border-primary-foreground/10 px-10 py-5">
        <div className="flex items-center gap-2.5">
          <Code size={24} />
          <h3 className="font-display text-lg font-semibold tracking-tight">Oryn</h3>
        </div>
        <Link href="/" className="text-sm">
          <LinkPrimary text="Back to home" icon="arrow" className="transition-colors hover:text-accent-p" />
        </Link>
      </header>

      <main className="grid flex-1 grid-cols-[1fr_minmax(0,424px)_1fr]">
        <div className="min-w-0" />

        <div className="flex items-center border-x border-primary-foreground/10 px-8 py-12">
          <div className="w-full">
            <p className="mb-5 font-mono text-xs tracking-wide">
              <span className="text-primary-foreground/50">ACCOUNT</span>
              <span className="mx-2.5 text-primary-foreground/50">/</span>
              <span>SIGN IN</span>
            </p>

            <h1 className="mb-2 text-[28px] font-display font-medium leading-[1.1] tracking-tight">
              Welcome back <span className="text-accent-p">.</span>
            </h1>
            <p className="mb-7 text-[0.8rem] leading-snug text-primary-foreground/55">
              Sign in to your workspace.
              <br />
              Pick a provider to continue.
            </p>

            <SocialButtons />

            <div className="mb-5 mt-7 h-px bg-primary-foreground/10" />

            <p className="text-xs leading-relaxed text-primary-foreground/70">
              By signing in, you agree to our{' '}
              <Link
                href="/terms"
                className="text-xs text-primary-foreground underline underline-offset-[3px] transition-colors hover:text-accent-p"
              >
                Terms of Service
              </Link>
              <br />
              and{' '}
              <Link
                href="/privacy"
                className="text-xs text-primary-foreground underline underline-offset-[3px] transition-colors hover:text-accent-p"
              >
                Privacy Policy
              </Link>
              .
            </p>

            <div id="clerk-captcha" />
          </div>
        </div>

        <div className="min-w-0" />
      </main>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-primary-foreground/10 px-10 py-5 font-mono text-xs text-primary-foreground/40">
        <span>© 2026 Oryn</span>
        <span>Your workspace. Your identity.</span>
      </footer>
    </div>
  );
}