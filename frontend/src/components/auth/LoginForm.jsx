import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = isSignup
<<<<<<< HEAD
        ? await api.register(username, password)
=======
        ? await api.signup(username, password)
>>>>>>> 576081d56c06ac77713664f45bcbd9489225fb2e
        : await api.login(username, password);

      if (response.token) {
        login({ username, id: response.userId }, response.token);
      } else {
        setError(response.error || "Authentication failed");
      }
    } catch (err) {
<<<<<<< HEAD
      setError(err.message || "Something went wrong. Please try again.");
      console.error('Login error:', err);
=======
      setError("Something went wrong. Please try again.");
>>>>>>> 576081d56c06ac77713664f45bcbd9489225fb2e
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{isSignup ? "Sign Up" : "Login"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <p>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            setIsSignup(!isSignup);
            setError("");
          }}
        >
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
