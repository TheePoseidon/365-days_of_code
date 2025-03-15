import { useState } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Button, Input, Card } from "@/components/ui";
import { Lock, Mail, User } from "lucide-react";

export default function AuthPage({ isRegister = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.push("/dashboard");
    } catch (err) {
      setError(isRegister ? "Registration failed" : "Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="p-6 max-w-md w-full shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isRegister ? "Create an Account" : "Student Portal Login"}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border p-2 rounded-md bg-white">
            <Mail className="text-gray-500 mr-2" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center border p-2 rounded-md bg-white">
            <Lock className="text-gray-500 mr-2" />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">{isRegister ? "Sign Up" : "Login"}</Button>
        </form>
        <p className="text-center mt-4">
          {isRegister ? (
            <span>
              Already have an account? <a href="/login" className="text-blue-500">Login</a>
            </span>
          ) : (
            <span>
              Don't have an account? <a href="/register" className="text-blue-500">Sign up</a>
            </span>
          )}
        </p>
      </Card>
    </div>
  );
}
