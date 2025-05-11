import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-center items-center bg-amber-50 h-20 w-[90%] shadow-2xl ">
      <nav className="px-4 py-2">
        <div></div>
        <div>
          <Link to="/home">Home</Link>
          <Link to="/users">Users</Link>
          <Link to="/Products">Products</Link>
        </div>
        <div>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Singup</button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
