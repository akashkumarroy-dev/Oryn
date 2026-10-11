import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold">Oryn</h1>
      <p className="mt-4 text-muted-foreground">Welcome to Oryn</p>
      <Link href="/signin" className="mt-6 text-accent-p hover:underline">
        Sign in
      </Link>
    </main>
  );
}