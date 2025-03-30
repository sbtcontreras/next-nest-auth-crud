import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api";
import { toast } from "sonner";
import { useCreatePostModal } from "@/app/_components/CreatePost";
import { useUpdatePostModal } from "@/app/_components/UpdatePost";
import { CreatePostDto, Post, UpdatePostDto } from "./schemas";
import { useDeletePostModal } from "@/app/_components/DeletePost";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => apiClient<Post[]>("/posts"),
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { closeModal } = useCreatePostModal.getState();

  return useMutation({
    mutationFn: (newPost: CreatePostDto) =>
      apiClient("/posts", { method: "POST", body: JSON.stringify(newPost) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post creado con éxito");
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const { closeModal } = useUpdatePostModal.getState();

  return useMutation({
    mutationFn: (updatedPost: UpdatePostDto) =>
      apiClient(`/posts/${updatedPost.id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedPost),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", variables.id] });
      toast.success("Post actualizado con éxito");
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  const { closeModal } = useDeletePostModal.getState();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      apiClient(`/posts/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post eliminado con éxito");
      closeModal();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
