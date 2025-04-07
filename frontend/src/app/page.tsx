"use client";

import { useUserMustBeLogged } from "@/services/auth/hooks";
import { PageContent } from "./_components/PageContent";

export default function Page() {
  const { isAuthenticated } = useUserMustBeLogged();

  if (isAuthenticated) return <PageContent />;
}
