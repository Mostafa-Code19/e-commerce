"use client";

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button style={{ marginRight: 10 }} onClick={() => signIn()}>
      Sign in
    </button>
  );
}

export const LogoutButton = () => {
  return (
    <button className='border border-red-700 text-red-700 w-full py-2 yekan1 rounded-xl' onClick={() => signOut()}>
      خروج از حساب
    </button>
  );
}