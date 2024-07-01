import { SessionProvider } from "next-auth/react";
import react from "react";

export const NextAuthProvider = ({ children }: { children: react.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
