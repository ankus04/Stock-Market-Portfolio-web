import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { PublicLayout } from "../components/Layout";

const defaultSignupForm = {
  fullName: "",
  username: "",
  email: "",
  password: "",
  country: "",
  hobby: "",
};

const hobbyOptions = [
  "Reading", "Traveling", "Cooking", "Photography", "Gardening", "Painting", "Writing", "Music", "Dancing", "Sports",
  "Gaming", "Hiking", "Fishing", "Camping", "Yoga", "Meditation", "Knitting", "Woodworking", "Pottery", "Bird Watching",
  "Astronomy", "Chess", "Puzzles", "Collecting", "Origami", "Calligraphy", "Blogging", "Podcasting", "Volunteering", "Learning Languages",
  "Fitness", "Running", "Cycling", "Swimming", "Martial Arts", "Rock Climbing", "Skiing", "Surfing", "Scuba Diving", "Kayaking",
  "Theater", "Film Making", "Animation", "Graphic Design", "Web Development", "Programming", "Robotics", "Electronics", "DIY Projects", "Home Brewing"
];

const countryOptions = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada",
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba",
  "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador",
  "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
  "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hungary",
  "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
  "Jordan", "Kazakhstan", "Kenya", "Kiribati", "North Korea", "South Korea", "Kuwait", "Kyrgyzstan", "Laos", "Latvia",
  "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi",
  "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
  "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent", "Samoa", "San Marino", "Sao Tome", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone",
  "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan",
  "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
  "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

function AuthPage({ onSubmit, loading, error, successMessage }) {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin";
  const [mode, setMode] = useState(initialMode);
  const [signinForm, setSigninForm] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [signupForm, setSignupForm] = useState(defaultSignupForm);

  useEffect(() => {
    setMode(initialMode);
    // Reset forms when mode changes
    setSigninForm({
      emailOrUsername: "",
      password: "",
    });
    setSignupForm(defaultSignupForm);
  }, [initialMode]);

  useEffect(() => {
    // Redirect to dashboard after successful signin
    const checkAuth = () => {
      const storedAuth = localStorage.getItem("stockPortfolioAuth");
      if (storedAuth && !loading && !successMessage) {
        // User is authenticated and not in loading state, and no signup success message
        setTimeout(() => navigate("/dashboard", { replace: true }), 300);
      }
    };
    checkAuth();
  }, [loading, successMessage, navigate]);

  const switchMode = (nextMode) => {
    setMode(nextMode);
    navigate(`/auth?mode=${nextMode}`);
  };

  return (
    <PublicLayout>
      <section className="landing-hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>🔐 Secure Access</span>
            </div>
            <h1 className="hero-title">
              {mode === "signin"
                ? <>Welcome Back to Your <span className='gradient-text'>Portfolio</span></>
                : <>Join Our <span className='gradient-text'>Investment Community</span></>}
            </h1>

            <div className="auth-form-container">
              <div className="auth-tabs">
                <button
                  className={`auth-tab ${mode === "signin" ? "active" : ""}`}
                  onClick={() => switchMode("signin")}
                >
                  Sign In
                </button>
                <button
                  className={`auth-tab ${mode === "signup" ? "active" : ""}`}
                  onClick={() => switchMode("signup")}
                >
                  Sign Up
                </button>
              </div>

              <div className="auth-form-panel">
                {mode === "signin" ? (
                <form
                  className="auth-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    onSubmit("signin", signinForm);
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="signin-email">Email or Username</label>
                    <input
                      id="signin-email"
                      type="text"
                      value={signinForm.emailOrUsername}
                      onChange={(event) =>
                        setSigninForm((current) => ({
                          ...current,
                          emailOrUsername: event.target.value,
                        }))
                      }
                      placeholder="Enter email or username"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="signin-password">Password</label>
                    <input
                      id="signin-password"
                      type="password"
                      value={signinForm.password}
                      onChange={(event) =>
                        setSigninForm((current) => ({
                          ...current,
                          password: event.target.value,
                        }))
                      }
                      placeholder="Enter password"
                    />
                  </div>
                  <button className="auth-submit-btn" type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                </form>
              ) : (
                <form
                  className="auth-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    onSubmit("signup", signupForm);
                    setSignupForm(defaultSignupForm);
                  }}
                >
                  <div className="form-group">
                    <label htmlFor="signup-fullname">Full Name</label>
                    <input
                      id="signup-fullname"
                      type="text"
                      value={signupForm.fullName}
                      onChange={(event) =>
                        setSignupForm((current) => ({
                          ...current,
                          fullName: event.target.value,
                        }))
                      }
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="signup-username">Username</label>
                    <input
                      id="signup-username"
                      type="text"
                      value={signupForm.username}
                      onChange={(event) =>
                        setSignupForm((current) => ({
                          ...current,
                          username: event.target.value,
                        }))
                      }
                      placeholder="Choose a username"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="signup-email">Email</label>
                    <input
                      id="signup-email"
                      type="email"
                      value={signupForm.email}
                      onChange={(event) =>
                        setSignupForm((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="signup-password">Password</label>
                    <input
                      id="signup-password"
                      type="password"
                      value={signupForm.password}
                      onChange={(event) =>
                        setSignupForm((current) => ({
                          ...current,
                          password: event.target.value,
                        }))
                      }
                      placeholder="Create a password"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="signup-country">Country</label>
                      <select
                        id="signup-country"
                        value={signupForm.country}
                        onChange={(event) =>
                          setSignupForm((current) => ({
                            ...current,
                            country: event.target.value,
                          }))
                        }
                      >
                        <option value="">Select your country</option>
                        {countryOptions.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="signup-hobby">Hobby</label>
                      <select
                        id="signup-hobby"
                        value={signupForm.hobby}
                        onChange={(event) =>
                          setSignupForm((current) => ({
                            ...current,
                            hobby: event.target.value,
                          }))
                        }
                      >
                        <option value="">Select your hobby</option>
                        {hobbyOptions.map((hobby) => (
                          <option key={hobby} value={hobby}>
                            {hobby}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button className="auth-submit-btn" type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                  </button>
                </form>
              )}
              {error && <p className="auth-error">{error}</p>}
              {successMessage && <p className="auth-success">{successMessage}</p>}              </div>
            </div>

            <p className="hero-description">
              {mode === "signin"
                ? "Sign in to access your personalized portfolio dashboard and track your investments."
                : "Create your account to start building and managing your stock portfolio with advanced analytics."}
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

export default AuthPage;
