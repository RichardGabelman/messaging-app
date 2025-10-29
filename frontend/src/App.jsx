import "./App.css";
import { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import LoginForm from "./components/auth/LoginForm";
import UserList from "./components/users/UserList";
import ConversationView from "./components/conversation/ConversationView";

function AppContent() {
  const { user, loading } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState(null);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <Layout>
        <div>
          <h1>Welcome to the Messaging App</h1>
          <p>Connect with others (near) instantly!</p>
          <LoginForm />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {selectedUserId ? (
        <ConversationView
          otherUserId={selectedUserId}
          onBack={() => setSelectedUserId(null)}
        />
      ) : (
        <UserList onSelectUser={setSelectedUserId} />
      )}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
