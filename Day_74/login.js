import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Button, Input, Card } from "@/components/ui";
import { Lock, Mail, User, LogOut } from "lucide-react";

export default function AuthPage({ isRegister = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        // After successful registration, automatically log in
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      
      // Clear form and redirect
      setEmail("");
      setPassword("");
      router.push("/dashboard");
    } catch (err) {
      console.error("Authentication error:", err);
      
      // Provide more specific error messages
      switch (err.code) {
        case 'auth/user-not-found':
          setError("No account found with this email address");
          break;
        case 'auth/wrong-password':
          setError("Incorrect password");
          break;
        case 'auth/invalid-email':
          setError("Invalid email address");
          break;
        case 'auth/email-already-in-use':
          setError("An account with this email already exists");
          break;
        case 'auth/weak-password':
          setError("Password should be at least 6 characters");
          break;
        default:
          setError(isRegister ? 
            "Registration failed. Please try again." : 
            "Login failed. Please check your credentials and try again."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="p-6 max-w-md w-full shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isRegister ? "Create an Account" : "Student Portal Login"}
        </h2>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border p-2 rounded-md bg-white">
            <Mail className="text-gray-500 mr-2" />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full"
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
              disabled={loading}
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading}
          >
            {loading ? "Please wait..." : (isRegister ? "Sign Up" : "Login")}
          </Button>
        </form>
        <p className="text-center mt-4">
          {isRegister ? (
            <span>
              Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
            </span>
          ) : (
            <span>
              Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign up</a>
            </span>
          )}
        </p>
      </Card>
    </div>
  );
}

export function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Card className="p-6 max-w-lg w-full shadow-lg rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h2>
        <p className="text-gray-700 mb-2">Logged in as: {user.email}</p>
        <p className="text-gray-700 mb-6">Access your courses, notifications, and more.</p>
        <Button onClick={handleLogout} className="flex items-center justify-center">
          <LogOut className="mr-2" /> Logout
        </Button>
      </Card>
    </div>
  );
}
