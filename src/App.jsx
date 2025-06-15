import { useEffect } from "react";
import {
  useNavigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { supabase } from "./lib/supabase";

// Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import App from "./pages/App";
import Pricing from "./pages/Pricing";
import Dashboard from "./pages/Dashboard";

// Create a callback component
function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (data.session) {
          console.log(
            "Callback: Successfully authenticated, redirecting to /app"
          );
          navigate("/app");
        } else {
          console.log("Callback: No session found, redirecting to /login");
          navigate("/login");
        }
      } catch (error) {
        console.error("Callback error:", error);
        navigate("/login");
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Completing Sign In
        </h2>
        <p className="text-gray-600">
          Just a moment while we set up your account...
        </p>
      </div>
    </div>
  );
}

// Main App Router
export default function MainApp() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/app" element={<App />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
