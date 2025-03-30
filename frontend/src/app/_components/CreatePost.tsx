"use client";

import type { z } from "zod";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Plus } from "lucide-react";
import { create } from "zustand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createPostSchema as formSchema } from "@/services/posts/schemas";
import { useCreatePost } from "@/services/posts/hooks";
import { Textarea } from "@/components/ui/textarea";

type DefaultValues = Partial<z.infer<typeof formSchema>>;

interface ModalState {
  open: boolean;
  defaultValues: DefaultValues;
  openModal: (values?: DefaultValues) => void;
  closeModal: () => void;
}

export const useCreatePostModal = create<ModalState>((set) => ({
  open: false,
  defaultValues: {},
  openModal: (values) => set({ open: true, defaultValues: values }),
  closeModal: () => set({ open: false }),
}));

export function CreatePostModal() {
  const { open, defaultValues, closeModal } = useCreatePostModal();
  const m = useCreatePost();

  const f = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (open)
      f.reset({
        title: "",
        content: "",
        ...defaultValues,
      });
  }, [open, f, defaultValues]);

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="max-h-[80svh] w-full max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear Post</DialogTitle>
          <DialogDescription>
            Crea un nuevo post para compartir con la comunidad
          </DialogDescription>
        </DialogHeader>
        <Form {...f}>
          <form
            onSubmit={f.handleSubmit((data) => m.mutateAsync(data))}
            className="grid gap-4"
          >
            <FormField
              control={f.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Título del post"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={f.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contenido *</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Contenido del post" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="mt-4"
              disabled={f.formState.isSubmitting || !f.formState.isDirty}
            >
              {f.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  Creando...
                </>
              ) : (
                <>
                  <Plus className="mr-2" />
                  Crear
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
