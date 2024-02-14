"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Database } from "@/lib/database.types";
import { cp } from "fs";
import { red } from "@mui/material/colors";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignUp = async () => {
    console.log("signing up"); // TODO: remove
    router.replace("/auth/sign-up");

    router.refresh();
  };

  const handleSignIn = async () => {
    console.log("signing in"); // TODO: remove
    router.replace("/auth/login");

    router.refresh();
  };

  const handleSignOut = async () => {
    console.log("signing out"); // TODO: remove
    router.replace("/auth/logout")
    router.refresh();
  };

  return (
    <div className=" flex flex-col ">
      <input
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={handleSignUp}>Sign up</button>
      <button onClick={handleSignIn}>Sign in</button>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}