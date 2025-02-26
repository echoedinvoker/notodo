'use client';

import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import { FaGithub, FaGoogle } from 'react-icons/fa';

interface CTASectionProps {
  [key: string]: any
}

export default function CTASection({ ...props }: CTASectionProps) {
  const session = useSession();

  const handleSignIn = (provider: 'github' | 'google') => {
    return () => actions.signIn(provider);
  }

  return (
    <section className="relative py-24 px-6 mb-20 overflow-hidden" {...props}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 skew-y-3 transform origin-top-right -translate-y-12"></div>
      
      <div className="relative container mx-auto bg-white rounded-2xl shadow-2xl p-12 z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ready to Transform Your Habits?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Join thousands who are already breaking bad habits and building better ones with Notodo.</p>
        </div>

        {session.data?.user ? (
          <div className="text-center">
            <p className="text-2xl font-semibold mb-4 text-gray-800">Welcome back, {session.data.user.name}!</p>
            <p className="text-lg mb-8 text-gray-600">Continue your journey to better habits.</p>
            <Button
              size="lg"
              color="primary"
              variant="shadow"
              className="px-10 py-6 text-lg"
              onClick={() => window.location.href = '/dashboard'}
            >
              Go to Dashboard
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-6">
            <p className="text-lg mb-2 text-gray-700">Start breaking bad habits and building good ones today:</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                color="default"
                variant="shadow"
                startContent={<FaGithub />}
                className="px-8 py-6 text-lg bg-gray-800 text-white hover:bg-gray-900"
                onClick={handleSignIn('github')}
              >
                Sign in with GitHub
              </Button>
              <Button
                size="lg"
                color="warning"
                variant="shadow"
                startContent={<FaGoogle />}
                className="px-8 py-6 text-lg"
                onClick={handleSignIn('google')}
              >
                Sign in with Google
              </Button>
            </div>
            <p className="text-gray-500 mt-8">Free to use. No credit card required.</p>
          </div>
        )}
      </div>
    </section>
  )
}
