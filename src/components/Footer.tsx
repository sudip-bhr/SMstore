import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      // Simulate newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Thank you for subscribing to our newsletter!');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Failed to subscribe. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-400 py-10 px-4 md:px-20">
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4">CONTACT INFO</h3>
            <p><strong>ADDRESS:</strong><br />SM Electronics, Kathmandu, Nepal</p>
            <p className="mt-2"><strong>PHONE:</strong><br />+977 9742858522</p>
            <p className="mt-2"><strong>EMAIL:</strong><br />smelectronics@gmail.com</p>
            <p className="mt-2"><strong>WORKING DAYS/HOURS:</strong><br />Sun - Friday / 10AM - 8PM</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="p-2 border rounded-full text-white hover:bg-white hover:text-black transition">
                <FaFacebookF />
              </a>
              <a href="#" className="p-2 border rounded-full text-white hover:bg-white hover:text-black transition">
                <FaInstagram />
              </a>
              <a href="#" className="p-2 border rounded-full text-white hover:bg-white hover:text-black transition">
                <FaTwitter />
              </a>
              <a href="#" className="p-2 border rounded-full text-white hover:bg-white hover:text-black transition">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="hover:text-white transition">All Products</Link></li>
              <li><Link to="/sign-in" className="hover:text-white transition">My Account</Link></li>
            <li><Link to="/cart" className="hover:text-white transition">Cart</Link></li>
            
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className=" text-white font-bold mb-4">POPULAR CATEGORIES</h3>
            <div className="flex flex-wrap sm:flex-row items-center gap-2 rounded-full">
              {[
                'iPhone 16', 'Macbook Air', 'Macbook Pro',
                'iMac 24 inch', 'Mac Mini', 'Airpods Max'
              ].map((category, index) => (
                <span key={index} className="border border-gray-600 px-2 py-1 rounded text-sm">{category}</span>
              ))}
            </div>
          </div>

          {/* Subscribe Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-4">SUBSCRIBE NEWSLETTER</h3>
            <p className="mb-4">Get all the latest information on events, sales and offers. Sign up for newsletter:</p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full sm:w-auto flex-1 px-4 py-2 rounded-full bg-gray-800 text-white placeholder-gray-400"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Subscribing...' : 'SUBSCRIBE'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
          &copy; SM Electronics {new Date().getFullYear()}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;