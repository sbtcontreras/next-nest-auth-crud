"use client";

import type { z } from "zod";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Edit2, Loader2 } from "lucide-react";
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
import { updatePostSchema as formSchema } from "@/services/posts/schemas";
import { useUpdatePost } from "@/services/posts/hooks";
import { Textarea } from "@/components/ui/textarea";

type DefaultValues = Partial<z.infer<typeof formSchema>>;

interface ModalState {
  open: boolean;
  defaultValues: DefaultValues;
  openModal: (values: DefaultValues) => void;
  closeModal: () => void;
}

export const useUpdatePostModal = create<ModalState>((set) => ({
  open: false,
  defaultValues: {},
  openModal: (values) => set({ open: true, defaultValues: values }),
  closeModal: () => set({ open: false }),
}));

export function UpdatePostModal() {
  const { open, defaultValues, closeModal } = useUpdatePostModal();
  const m = useUpdatePost();

  const f = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (open) f.reset(defaultValues);
  }, [open, f, defaultValues]);

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="max-h-[80svh] w-full max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Post</DialogTitle>
          <DialogDescription>
            Edita los detalles del post aquí.
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
                  Editando...
                </>
              ) : (
                <>
                  <Edit2 className="mr-2" />
                  Editar
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
