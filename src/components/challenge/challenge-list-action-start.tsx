'use client';

import { FaFlag } from "react-icons/fa"
import FormButton from "../common/FormButton"
import * as actions from "@/actions"
import { useFormState } from "react-dom";

interface ChallengeListActionStartProps {
  notodoId: string;
}

export default function ChallengeListActionStart({ notodoId }: ChallengeListActionStartProps) {
  const [formState, action] = useFormState(actions.startChallenge.bind(null, notodoId), { errors: {} });

  return (
    <form action={action}>
      <FormButton
        variant="light"
        startContent={<div><FaFlag size="10" /></div>}
        className="no-hover-effect w-full flex items-center justify-start text-stone-700"
        size="sm"
      >Start Challenge!</FormButton>
    </form>
  )
}
