"use client";

import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import * as actions from "@/actions";
import { FaGithub, FaGoogle } from "react-icons/fa";

interface CTASectionProps {
  [key: string]: any;
}

export default function CTASection({ ...props }: CTASectionProps) {
  const session = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSignIn = (provider: "github" | "google") => {
    return () => actions.signIn(provider);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    try {
      const result = await actions.register(email, password);
      console.log("Registration result:", result);
      alert("Registration successful! Please log in.");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
      );
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <section
      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 px-4 rounded-lg shadow-lg mb-32"
      {...props}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl mb-8">
          Join NoToDo today and start managing your tasks efficiently!
        </p>

        {session.data?.user ? (
          <div>
            <p className="text-2xl font-semibold mb-4">
              Welcome back, {session.data.user.name}!
            </p>
            <p className="text-lg mb-6">
              Continue your journey to better habits.
            </p>
            <Button
              size="lg"
              color="secondary"
              variant="shadow"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Go to Dashboard
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-lg mb-4">
              Start breaking bad habits and building good ones:
            </p>
            <div className="flex gap-4 mb-4">
              <Button
                size="lg"
                color="default"
                variant="shadow"
                startContent={<FaGithub />}
                onClick={handleSignIn("github")}
              >
                GitHub
              </Button>
              <Button
                size="lg"
                color="warning"
                variant="shadow"
                startContent={<FaGoogle />}
                onClick={handleSignIn("google")}
              >
                Google
              </Button>
            </div>
            <div className="w-full max-w-md">
              <form onSubmit={handleRegister} className="space-y-4">
                <Input
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  color="primary"
                  variant="shadow"
                  isLoading={isRegistering}
                >
                  Register
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
