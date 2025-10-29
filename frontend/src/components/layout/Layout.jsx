import { useAuth } from "../contexts/AuthContext";

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <>
      <header>
        <h1>Messaging App</h1>
        {user && (
          <div>
            <span>Hello, {user.username}</span>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer>
        <a href="https://github.com/RichardGabelman/messaging-app">Github</a>
      </footer>
    </>
  );
};
export default Layout;
