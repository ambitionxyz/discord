"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children, ...props }) {
  return <SessionProvider {...props}>{children}</SessionProvider>;
}
