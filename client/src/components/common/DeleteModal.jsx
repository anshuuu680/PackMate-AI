import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DeleteModal({ isOpen, onConfirm, onCancel }) {
  return (
    <Dialog open={isOpen} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Chat?</DialogTitle>
          <p className="text-sm text-gray-500">
            This action cannot be undone. Are you sure you want to clear this
            chat?
          </p>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button
            className={"cursor-pointer"}
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            className={"cursor-pointer"}
            variant="destructive"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
