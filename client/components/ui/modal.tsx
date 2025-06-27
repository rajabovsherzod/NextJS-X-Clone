import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import { ReactElement } from 'react'

interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    title?: ReactElement;
    body?: ReactElement;
    footer?: ReactElement;
    step?: number;
    totalSteps?: number;
}

const Modal = ({ isOpen, onClose, title, body, footer, step, totalSteps }: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="pt-0">
        <DialogHeader>
            <DialogTitle className="sr-only">Modal</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
            {body}
        </div>
        {footer && (
            <div className="mt-4">
                {footer}
            </div>
        )}
    </DialogContent>
    </Dialog>
  )
}

export default Modal


