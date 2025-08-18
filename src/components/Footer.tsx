import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      // Simulate newsletter subscription
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Thank you for subscribing to our newsletter!");
      setEmail("");
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("Failed to subscribe. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-black text-gray-300 py-10 px-4 md:px-20">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4">CONTACT INFO</h3>
            <p>
              <strong>ADDRESS:</strong>
              <br />
              SM Electronics, Kathmandu, Nepal
            </p>
            <p className="mt-2">
              <strong>PHONE:</strong>
              <br />
              +977 9860989021
            </p>
            <p className="mt-2">
              <strong>EMAIL:</strong>
              <br />
              smelectronics@gmail.com
            </p>
            <p className="mt-2">
              <strong>WORKING DAYS/HOURS:</strong>
              <br />
              Sun - Friday / 10AM - 8PM
            </p>
            <div className="flex space-x-4 mt-4">
              {[
                { icon: <FaFacebookF />, href: "#" },
                { icon: <FaInstagram />, href: "#" },
                { icon: <FaTwitter />, href: "#" },
                { icon: <FaWhatsapp />, href: "#" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="p-2 border border-gray-500 rounded-full text-gray-300 hover:bg-white hover:text-black transition"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="hover:text-white transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/sign-in" className="hover:text-white transition">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="text-white font-bold mb-4">POPULAR CATEGORIES</h3>
            <div className="flex flex-wrap sm:flex-row items-center gap-2">
              {[
                "iPhone 16",
                "Macbook Air",
                "Macbook Pro",
                "iMac 24 inch",
                "Mac Mini",
                "Airpods Max",
              ].map((category, index) => (
                <span
                  key={index}
                  className="border border-gray-500 px-2 py-1 rounded text-sm text-gray-300 hover:bg-white hover:text-black transition"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Subscribe Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-4">SUBSCRIBE NEWSLETTER</h3>
            <p className="mb-4 text-gray-400">
              Get all the latest information on events, sales and offers. Sign
              up for newsletter:
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-center gap-2"
            >
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-auto flex-1 px-4 py-2 rounded-full border border-gray-600 bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-white outline-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? "Subscribing..." : "SUBSCRIBE"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
          &copy; SM Electronics {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

