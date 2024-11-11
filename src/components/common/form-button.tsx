'use client';

import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
  children: React.ReactNode;
  [key: string]: any;
}

export default function FormButton({ children, ...props }: FormButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" isLoading={pending} {...props}>
      {children}
    </Button>
  )
}
