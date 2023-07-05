import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Button from "./Button";

const Navbar = () => {
  const { user, dispatch } = useAuthContext();

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  return (
    <header className="py-7 px-2 flex justify-between items-center bg-slate-100">
      <div className="logo">
        <Link
          to="/"
          className="text-xl font-semibold hover:text-violet-500 duration-300"
        >
          EnvChat
        </Link>
      </div>
      <nav>
        {!user && (
          <div className="flex gap-5">
            <Link
              to="/login"
              className="hover:text-violet-500  underline-offset-2 duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-violet-500  underline-offset-2 duration-300"
            >
              Register
            </Link>
          </div>
        )}

        {user && (
          <div className="flex gap-5 items-center">
            <p>
              Logged in as: <span className="text-violet-500">Hello</span>
            </p>
            <Button handleLogout={handleLogout} text="Logout" logout />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
