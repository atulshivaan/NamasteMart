import { FaHome, FaUsers, FaBoxOpen, FaSignInAlt, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-600">
        {/* Logo / Brand */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">QuickyGiky</h2>
          <p>Your trusted platform for managing users and products efficiently.</p>
        </div>

        {/* Navigation Links with Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 hover:text-blue-500">
              <FaHome /> <a href="/home">Home</a>
            </li>
            <li className="flex items-center gap-2 hover:text-blue-500">
              <FaUsers /> <a href="/users">Users</a>
            </li>
            <li className="flex items-center gap-2 hover:text-blue-500">
              <FaBoxOpen /> <a href="/products">Products</a>
            </li>
            <li className="flex items-center gap-2 hover:text-blue-500">
              <FaSignInAlt /> <a href="/login">Login</a>
            </li>
          </ul>
        </div>

        {/* Contact Info with Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="flex items-center gap-2"><FaEnvelope /> support@quickygiky.com</p>
          <p className="flex items-center gap-2"><FaPhone /> +91 12345 67890</p>
          <p className="flex items-center gap-2"><FaMapMarkerAlt /> New Delhi, India</p>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-2 hover:text-blue-500">
              <FaLinkedin /> <a href="#">LinkedIn</a>
            </li>
            <li className="flex items-center gap-2 hover:text-blue-500">
              <FaGithub /> <a href="#">GitHub</a>
            </li>
            <li className="flex items-center gap-2 hover:text-blue-500">
              <FaTwitter /> <a href="#">Twitter</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="bg-gray-100 text-center py-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} QuickyGiky. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
