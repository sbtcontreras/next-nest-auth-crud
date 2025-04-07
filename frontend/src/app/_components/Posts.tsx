import { usePosts } from "@/services/posts/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2, Loader2 } from "lucide-react";
import { DeletePostModal, useDeletePostModal } from "./DeletePost";
import { UpdatePostModal, useUpdatePostModal } from "./UpdatePost";

export function Posts() {
  const { data, isLoading } = usePosts();
  const { openModal: launchUpdatePost } = useUpdatePostModal();
  const { openModal: launchDeletePost } = useDeletePostModal();

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center h-64">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {data?.map((post) => (
        <Card
          key={post.id}
          className="grid w-full gap-4 rounded-none md:rounded-lg"
        >
          <CardHeader className="flex flex-col items-center justify-between gap-2 border-b text-center lg:flex-row">
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>
              {new Date(post.createdAt).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>{post.content}</CardContent>
          <CardFooter className="grid gap-2 lg:grid-cols-2 lg:gap-4 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => launchUpdatePost(post)}
            >
              <Edit2 className="mr-2 size-4" />
              Editar
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => launchDeletePost(post)}
            >
              <Trash2 className="mr-2 size-4" />
              Eliminar
            </Button>
          </CardFooter>
        </Card>
      ))}
      <UpdatePostModal />
      <DeletePostModal />
    </div>
  );
}
