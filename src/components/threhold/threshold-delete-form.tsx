'use client'

import { useFormState } from "react-dom";
import * as actions from "@/actions";
import { FormButton } from "../common";

interface ThresholdDeleteFormProps {
  notodoId: string;
  thresholdId: string;
}

export default function ThresholdDeleteForm({
  notodoId,
  thresholdId,
}: ThresholdDeleteFormProps) {
  const [formState, action] = useFormState(actions.deleteThreshold.bind(null, { notodoId, thresholdId }), { errors: {} });
  return (
    <form action={action} className="flex justify-center mb-4">
      <FormButton className="w-72" color="danger">Delete</FormButton>
    </form>
  )
}
