"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import ButtonPrimary from "@/components/ui/ButtonPrimary";

export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) return <div>Loading…</div>;
  if (!isSignedIn) return <div>Not signed in.</div>;

  return (
    <div>
      <div className="p-6">
        {`${user.fullName ?? user.firstName ?? ""}, ${user.primaryEmailAddress?.emailAddress ?? ""}`}
      </div>
      <div className="px-6">
        <ButtonPrimary
          label="Sign out"
          type="button"
          theme="secondary"
          onClick={() => signOut({ redirectUrl: "/signin" })}
        />
      </div>
    </div>
  );
}