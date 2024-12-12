import { useAuth } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const { auth } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-zinc-900 p-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-green-500 font-bold">
          <NavLink to={"/"}>MindNotes</NavLink>
        </div>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-zinc-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-9">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "text-zinc-300 font-semibold"
                : "text-zinc-600 font-semibold hover:text-zinc-400"
            }
          >
            <button className="px-3 py-1 rounded-md hover:bg-zinc-700">
              Dashboard
            </button>
          </NavLink>

          {auth.isLogin && (
            <NavLink
              to={"/createNote"}
              className={({ isActive }) =>
                isActive
                  ? "text-zinc-300 font-semibold"
                  : "text-zinc-600 font-semibold hover:text-zinc-400"
              }
            >
              <button className="px-3 py-1 rounded-md hover:bg-zinc-700">
                Create Note
              </button>
            </NavLink>
          )}

          {auth.isLogin && (
            <NavLink
              to={"/profile"}
              className={({ isActive }) =>
                isActive
                  ? "text-zinc-300 font-semibold"
                  : "text-zinc-600 font-semibold hover:text-zinc-400"
              }
            >
              <button className="px-3 py-1 rounded-md hover:bg-zinc-700">
                Profile
              </button>
            </NavLink>
          )}

          {!auth.isLogin && (
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                isActive
                  ? "text-zinc-300 font-semibold"
                  : "text-zinc-600 font-semibold hover:text-zinc-400"
              }
            >
              <button className="px-3 py-1 rounded-md hover:bg-zinc-700">
                Login
              </button>
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mt-4 md:hidden flex flex-col gap-4">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "text-zinc-300 font-semibold"
                : "text-zinc-600 font-semibold hover:text-zinc-400"
            }
          >
            <button className="w-full text-left px-3 py-2 rounded-md hover:bg-zinc-700">
              Dashboard
            </button>
          </NavLink>

          {auth.isLogin && (
            <NavLink
              to={"/createNote"}
              className={({ isActive }) =>
                isActive
                  ? "text-zinc-300 font-semibold"
                  : "text-zinc-600 font-semibold hover:text-zinc-400"
              }
            >
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-zinc-700">
                Create Note
              </button>
            </NavLink>
          )}

          {auth.isLogin && (
            <NavLink
              to={"/profile"}
              className={({ isActive }) =>
                isActive
                  ? "text-zinc-300 font-semibold"
                  : "text-zinc-600 font-semibold hover:text-zinc-400"
              }
            >
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-zinc-700">
                Profile
              </button>
            </NavLink>
          )}

          {!auth.isLogin && (
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                isActive
                  ? "text-zinc-300 font-semibold"
                  : "text-zinc-600 font-semibold hover:text-zinc-400"
              }
            >
              <button className="w-full text-left px-3 py-2 rounded-md hover:bg-zinc-700">
                Login
              </button>
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
