import { Button } from "@/components/ui/button";
import { LogOut, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { CreatePostModal, useCreatePostModal } from "./CreatePost";
import { Posts } from "./Posts";

export function PageContent() {
  const { openModal: launchCreatePost } = useCreatePostModal();

  return (
    <>
      <Card className="grid w-full gap-4 rounded-none md:rounded-lg">
        <CardHeader className="flex flex-col items-center justify-between gap-2 border-b text-center lg:flex-row lg:text-left">
          <div>
            <CardTitle>Posts</CardTitle>
            <CardDescription>Gestiona tus Posts</CardDescription>
          </div>
          <div className="flex flex-col gap-2 lg:flex-row lg:gap-4 w-full lg:w-auto">
            <Button onClick={() => launchCreatePost()}>
              <Plus className="mr-2 size-4" />
              Crear Post
            </Button>
            <Button variant="outline" asChild>
              <Link href="/auth/logout">
                <LogOut className="mr-2 size-4" />
                Cerrar sesión
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Posts />
        </CardContent>
      </Card>
      <CreatePostModal />
    </>
  );
}
