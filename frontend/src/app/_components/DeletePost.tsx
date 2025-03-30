"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Trash2 } from "lucide-react";
import { create } from "zustand";
import { useDeletePost } from "@/services/posts/hooks";
import { deletePostSchema as formSchema } from "@/services/posts/schemas";

type DefaultValues = Partial<z.infer<typeof formSchema>>;
interface ModalState {
  open: boolean;
  defaultValues: DefaultValues;
  openModal: (values: DefaultValues) => void;
  closeModal: () => void;
}

export const useDeletePostModal = create<ModalState>((set) => ({
  open: false,
  defaultValues: {},
  openModal: (values) => set({ open: true, defaultValues: values }),
  closeModal: () => set({ open: false }),
}));

export function DeletePostModal() {
  const { open, defaultValues, closeModal } = useDeletePostModal();
  const m = useDeletePost();

  const f = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    f.reset(defaultValues);
  }, [f, open, defaultValues]);

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="max-h-[80svh] w-full max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Eliminar Post</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar este post? Esta acción es
            irreversible.
          </DialogDescription>
        </DialogHeader>
        <Form {...f}>
          <form
            onSubmit={f.handleSubmit((data) => m.mutateAsync(data))}
            className="grid gap-4 md:grid-cols-2"
          >
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={f.formState.isSubmitting}
            >
              {f.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 animate-spin" /> Eliminando...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2" /> Eliminar
                </>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
