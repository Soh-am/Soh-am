import { Toaster as Sonner } from "sonner@2.0.3";

interface ToasterProps {
  className?: string;
}

export function Toaster({ className }: ToasterProps) {
  return (
    <Sonner
      className={className}
      position="top-right"
      expand={true}
      richColors
      closeButton
      toastOptions={{
        style: {
          background: 'rgba(30, 30, 30, 0.95)',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
        },
        className: 'backdrop-blur-lg',
        duration: 4000,
      }}
    />
  );
}