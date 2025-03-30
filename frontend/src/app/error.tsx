"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-center text-5xl font-extrabold text-primary sm:text-6xl">
        😢
      </h1>
      <p className="text-center text-2xl">Un error ha ocurrido</p>
      <Button asChild>
        <Link href="/">Regresar al inicio</Link>
      </Button>
    </div>
  );
}
