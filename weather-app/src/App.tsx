import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/providers/AuthContext";
import { AuthGuard } from "@/components/AuthGuard";
import { LoginPage } from "@/components/LoginPage";
import { WeatherApp } from "@/components/WeatherApp";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <AuthGuard>
                <WeatherApp />
              </AuthGuard>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
