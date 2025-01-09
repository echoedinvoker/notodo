'use client';

import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import { FaGithub, FaGoogle } from 'react-icons/fa';

interface CTASectionProps {
  [key: string]: any
}

// TODO: try to make this component to be `server` component to make SEO better
export default function CTASection({ ...props }: CTASectionProps) {
  const session = useSession();

  const handleSignIn = (provider: 'github' | 'google') => {
    return () => actions.signIn(provider);
  }

  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 px-4 rounded-lg shadow-lg mb-32" {...props}>
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl mb-8">Join NoToDo today and start managing your tasks efficiently!</p>

        {session.data?.user ? (
          <div>
            <p className="text-2xl font-semibold mb-4">Welcome back, {session.data.user.name}!</p>
            <p className="text-lg mb-6">Continue your journey to better habits.</p>
            <Button
              size="lg"
              color="secondary"
              variant="shadow"
              onClick={() => window.location.href = '/dashboard'}
            >
              Go to Dashboard
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-lg mb-4">Start breaking bad habits and building good ones:</p>
            <div className="flex gap-4">
              <Button
                size="lg"
                color="default"
                variant="shadow"
                startContent={<FaGithub />}
                onClick={handleSignIn('github')}
              >
                GitHub
              </Button>
              <Button
                size="lg"
                color="warning"
                variant="shadow"
                startContent={<FaGoogle />}
                onClick={handleSignIn('google')}
              >
                Google
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
