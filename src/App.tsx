import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Assuming sonner is also desired
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import Pages
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import NewsFeedPage from "./pages/NewsFeedPage";
import UserProfilePage from "./pages/UserProfilePage";
import FriendsPage from "./pages/FriendsPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists in src/pages/

const queryClient = new QueryClient();

// Mock authentication check - replace with actual auth logic
const isAuthenticated = () => {
  // For this example, let's assume if we are not on login/register, we are "authenticated"
  // This is a very basic mock. In a real app, this would involve checking tokens, context, etc.
  // For page generation purpose, this simply allows access to protected routes.
  // If you want to test redirection, you might set a flag in localStorage during login.
  return true; // Or some logic like !!localStorage.getItem('authToken');
};

// ProtectedRoute component (example)
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  if (!isAuthenticated()) {
    // User not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }
  return children;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          
          {/* Default route: redirect to login or news-feed based on auth */}
          <Route 
            path="/" 
            element={isAuthenticated() ? <Navigate to="/news-feed" replace /> : <Navigate to="/login" replace />} 
          />

          {/* Protected Routes */}
          <Route 
            path="/news-feed" 
            element={
              <ProtectedRoute>
                <NewsFeedPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/user-profile/:userId" 
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/friends" 
            element={
              <ProtectedRoute>
                <FriendsPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch-all Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;