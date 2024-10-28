import { FaHandPaper } from "react-icons/fa"
import FormButton from "../common/FormButton"
import * as actions from "@/actions"
import { useFormState } from "react-dom";

interface ChallengeListActionGiveUpProps {
  notodoId: string;
}

export default function ChallengeListActionGiveUp({ notodoId }: ChallengeListActionGiveUpProps) {
  const [formState, action] = useFormState(actions.giveupChallenge.bind(null, notodoId), { errors: {} });

  return (
    <form action={action}>
      <FormButton
        variant="light"
        startContent={<FaHandPaper />}
        className="no-hover-effect w-full flex items-center justify-start"
      >Give up...</FormButton>
    </form>
  )
}
