import Link from 'next/link';
import { Code, ArrowUpRight } from 'reicon-react';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen flex-col bg-primary text-primary-foreground font-sans">
      <header className="flex items-center justify-between border-b border-primary-foreground/10 px-10 py-5">
        <div className="flex items-center gap-2.5">
          <Code size={24} />
          <span className="font-display text-lg font-semibold tracking-tight">Oryn</span>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-primary-foreground transition-colors hover:text-accent-p"
        >
          Back to home <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </header>

      <main className="grid flex-1 grid-cols-[1fr_minmax(0,424px)_1fr]">
        <div className="min-w-0" />

        <div className="flex items-center border-x border-primary-foreground/10 px-8 py-12">
          <div className="w-full">
            <p className="mb-5 font-mono text-xs tracking-wide">
              <span className="text-primary-foreground/50">ACCOUNT</span>
              <span className="mx-2.5 text-primary-foreground/50">/</span>
              <span>SIGN UP</span>
            </p>

            <h1 className="mb-3 text-[28px] font-display font-normal leading-[1.1] tracking-tight">
              Create your account.
            </h1>
            <p className="mb-7 text-[0.8rem] leading-snug text-primary-foreground/55">
              Set up your workspace in seconds.
              <br />
              Pick a provider to get started.
            </p>

            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border border-primary-foreground/95 bg-primary-foreground/95 px-4 py-2.5 text-sm font-medium text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-p"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                Sign up with Google
              </button>

              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-md border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-2.5 text-sm font-medium text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-p"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                Sign up with GitHub
              </button>
            </div>

            <div className="mb-5 mt-7 h-px bg-primary-foreground/10" />

            <p className="text-xs leading-relaxed text-primary-foreground/50">
              By creating an account, you agree to our{' '}
              <Link
                href="/terms"
                className="text-primary-foreground underline underline-offset-[3px] transition-colors hover:text-accent-p"
              >
                Terms of Service
              </Link>
              <br />
              and{' '}
              <Link
                href="/privacy"
                className="text-primary-foreground underline underline-offset-[3px] transition-colors hover:text-accent-p"
              >
                Privacy Policy
              </Link>
              .
            </p>
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