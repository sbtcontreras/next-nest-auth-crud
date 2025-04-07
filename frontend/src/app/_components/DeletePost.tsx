"use client";

import { Button } from "@/components/ui/button";
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

interface ModalState {
  open: boolean;
  id?: string;
  openModal: (id: string) => void;
  closeModal: () => void;
}

export const useDeletePostModal = create<ModalState>((set) => ({
  open: false,
  id: undefined,
  openModal: (id) => set({ open: true, id }),
  closeModal: () => set({ open: false }),
}));

export function DeletePostModal() {
  const { open, id, closeModal } = useDeletePostModal();
  const m = useDeletePost();

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
        <div className="grid gap-4 md:grid-cols-2">
          <Button type="button" variant="secondary" onClick={closeModal}>
            Cancelar
          </Button>
          <Button
            onClick={() => m.mutateAsync({ id })}
            variant="destructive"
            disabled={m.isPending}
          >
            {m.isPending ? (
              <>
                <Loader2 className="mr-2 animate-spin" /> Eliminando...
              </>
            ) : (
              <>
                <Trash2 className="mr-2" /> Eliminar
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
