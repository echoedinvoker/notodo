import { FaHandPaper } from "react-icons/fa"
import * as actions from "@/actions"
import { useFormState } from "react-dom";
import { FormButton } from "../common";

interface ChallengeListActionGiveUpProps {
  notodoId: string;
}

export default function ChallengeListActionGiveUp({ notodoId }: ChallengeListActionGiveUpProps) {
  const [formState, action] = useFormState(actions.giveupChallenge.bind(null, notodoId), { errors: {} });

  return (
    <form action={action}>
      <FormButton
        variant="light"
        startContent={<div><FaHandPaper size="10" /></div>}
        className="no-hover-effect w-full flex items-center justify-start text-stone-700"
        size="sm"
      >Give up...</FormButton>
    </form>
  )
}
