import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Chrome } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, loading, signInWithGoogle } = useAuth(); // Use signInWithGoogle from context
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/app");
    }
  }, [user, loading, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Mail className="h-10 w-10 text-blue-600" />
              <span className="font-bold text-2xl">EmailDrip.AI</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to start rewriting your emails
            </p>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-3 transition-colors mb-6"
          >
            <Chrome className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="text-center text-sm text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
