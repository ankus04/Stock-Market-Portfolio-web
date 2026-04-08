import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

// Import page components
import HomePage, { HomeContent } from "./pages/HomePage";
import ContactPage, { ContactContent } from "./pages/ContactPage";
import CareerPage, { CareerContent } from "./pages/CareerPage";
import HelpPage, { HelpContent } from "./pages/HelpPage";
import AuthPage from "./pages/AuthPage";

// Import dashboard components
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";

// Import layout components
import { PublicLayout, LoggedInPublicLayout, AuthenticatedLayout } from "./components/Layout";

const API_URL = "http://localhost:5000/api";
const storedAuth = localStorage.getItem("stockPortfolioAuth");

if (storedAuth) {
  const parsed = JSON.parse(storedAuth);
  axios.defaults.headers.common.Authorization = `Bearer ${parsed.token}`;
}

function AppShell() {
  const [auth, setAuth] = useState(storedAuth ? JSON.parse(storedAuth) : null);
  const [portfolios, setPortfolios] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserPortfolios, setSelectedUserPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAuthSuccess = (data) => {
    setAuth(data);
    localStorage.setItem("stockPortfolioAuth", JSON.stringify(data));
    axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    setError("");
    setLoading(false);
  };

  const loadUserPortfolio = async () => {
    const { data } = await axios.get(`${API_URL}/portfolios`);
    setPortfolios(data);
  };

  const loadAdminUsers = async () => {
    const { data } = await axios.get(`${API_URL}/admin/users`);
    setUsers(data);
  };

  const fetchSelectedUser = async (userId) => {
    const { data } = await axios.get(`${API_URL}/admin/users/${userId}/portfolios`);
    setSelectedUser({
      id: data.user._id,
      fullName: data.user.fullName,
      username: data.user.username,
      email: data.user.email,
      country: data.user.country,
      hobby: data.user.hobby,
    });
    setSelectedUserPortfolios(data.portfolios);
  };

  const handleAuthSubmit = async (type, formData) => {
    try {
      setLoading(true);
      setError("");
      setSuccessMessage("");
      const endpoint = type === "signin" ? "signin" : "signup";
      const { data } = await axios.post(`${API_URL}/auth/${endpoint}`, formData);
      
      if (type === "signup") {
        setSuccessMessage("Account created successfully! Please sign in to continue.");
        setLoading(false);
      } else {
        handleAuthSuccess(data);
      }
    } catch (requestError) {
      let errorMessage = "Request failed";
      
      if (requestError.response?.data?.message) {
        const backendMessage = requestError.response.data.message;
        
        if (backendMessage === "Email or username already exists") {
          errorMessage = "You already have an account! Please use that account to login.";
        } else if (backendMessage === "All fields are required") {
          errorMessage = "Please fill in all required fields.";
        } else if (backendMessage === "Invalid credentials") {
          errorMessage = "Invalid email/username or password.";
        } else {
          errorMessage = backendMessage;
        }
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  const handleCreatePortfolio = async (formData) => {
    try {
      const { data } = await axios.post(`${API_URL}/portfolios`, formData);
      setPortfolios((current) => [data, ...current]);
      setError("");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not save portfolio");
    }
  };

  const handleDeletePortfolio = async (portfolioId) => {
    try {
      await axios.delete(`${API_URL}/portfolios/${portfolioId}`);
      setPortfolios((current) =>
        current.filter((item) => item._id !== portfolioId)
      );
      setError("");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not delete portfolio");
    }
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");

    if (!confirmed) {
      return;
    }

    localStorage.removeItem("stockPortfolioAuth");
    delete axios.defaults.headers.common.Authorization;
    setAuth(null);
    setPortfolios([]);
    setUsers([]);
    setSelectedUser(null);
    setSelectedUserPortfolios([]);
    setError("");
    setSuccessMessage("");
    setLoading(false);
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data including portfolios."
    );

    if (!confirmed) {
      return;
    }

    const password = window.prompt("Please enter your password to confirm account deletion:");

    if (!password) {
      return; // User cancelled
    }

    try {
      await axios.delete(`${API_URL}/auth/account`, {
        data: { password }
      });
      // Account deleted successfully, log out the user
      localStorage.removeItem("stockPortfolioAuth");
      delete axios.defaults.headers.common.Authorization;
      setAuth(null);
      setPortfolios([]);
      setUsers([]);
      setSelectedUser(null);
      setSelectedUserPortfolios([]);
      setError("");
      setSuccessMessage("");
      setLoading(false);
      alert("Your account has been deleted successfully.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Failed to delete account");
    }
  };

  useEffect(() => {
    if (auth?.user?.role === "admin") {
      loadAdminUsers().catch(() => setError("Could not load users"));
    } else if (auth?.user?.role === "user") {
      loadUserPortfolio().catch(() => setError("Could not load portfolio"));
    }
  }, [auth]);

  if (!auth) {
    return (
      <main className="app-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route
            path="/auth"
            element={
              <AuthPage
                key={'unauthenticated'}
                onSubmit={handleAuthSubmit}
                loading={loading}
                error={error}
                successMessage={successMessage}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    );
  }

  if (auth?.user?.role === "admin") {
    return (
      <Routes>
            <Route
              path="/"
              element={
                <LoggedInPublicLayout user={auth.user} onLogout={handleLogout}>
                  <HomeContent />
                </LoggedInPublicLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <LoggedInPublicLayout user={auth.user} onLogout={handleLogout}>
                  <ContactContent />
                </LoggedInPublicLayout>
              }
            />
            <Route
              path="/career"
              element={
                <LoggedInPublicLayout user={auth.user} onLogout={handleLogout}>
                  <CareerContent />
                </LoggedInPublicLayout>
              }
            />
            <Route
              path="/help"
              element={
                <LoggedInPublicLayout user={auth.user} onLogout={handleLogout}>
                  <HelpContent />
                </LoggedInPublicLayout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <LoggedInPublicLayout user={auth.user} onLogout={handleLogout}>
                  <AdminDashboard
                    admin={auth.user}
                    users={users}
                    selectedUser={selectedUser}
                    selectedUserPortfolios={selectedUserPortfolios}
                    onSelectUser={fetchSelectedUser}
                    onLogout={handleLogout}
                  />
                  {error ? <p className="floating-error">{error}</p> : null}
                </LoggedInPublicLayout>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    );
  }

  if (auth?.user?.role === "user") {
    return (
      <Routes>
            <Route
              path="/"
              element={
                <LoggedInPublicLayout user={auth.user} onLogout={handleLogout}>
                  <HomeContent />
                </LoggedInPublicLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <LoggedInPublicLayout user={auth.user} onLogout={handleLogout}>
                  <ContactContent />
                </LoggedInPublicLayout>
              }
            />
            <Route
              path="/career"
              element={
                <LoggedInPublicLayout user={auth.user} onLogout={handleLogout}>
                  <CareerContent />
                </LoggedInPublicLayout>
              }
            />
            <Route
              path="/help"
              element={
                <LoggedInPublicLayout user={auth.user} onLogout={handleLogout}>
                  <HelpContent />
                </LoggedInPublicLayout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <LoggedInPublicLayout user={auth.user} onLogout={handleLogout}>
                  <UserDashboard
                    user={auth.user}
                    portfolios={portfolios}
                    onLogout={handleLogout}
                    onCreatePortfolio={handleCreatePortfolio}
                    onDeletePortfolio={handleDeletePortfolio}
                    onDeleteAccount={handleDeleteAccount}
                  />
                  {error ? <p className="floating-error">{error}</p> : null}
                </LoggedInPublicLayout>
              }
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    );
  }

  return <div>Loading...</div>;
}

function App() {
  return <BrowserRouter><AppShell /></BrowserRouter>;
}

export default App;
