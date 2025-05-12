import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between text-black h-15 m-2 w-full shadow-2xl px-8 rounded-md">
      {/* Left - Heading */}
      <div className="text-xl font-semibold">
        QuickyGiky
      </div>

      {/* Center - Navigation Links */}
      <div className="flex gap-6 justify-center">
        <Link to="/home">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/products">Products</Link>
      </div>

      
    </div>
  );
};

export default Navbar;
