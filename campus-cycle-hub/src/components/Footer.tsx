import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Bike } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bike className="h-8 w-8" />
              <span className="text-xl font-bold">CampusCycles</span>
            </div>
            <p className="text-sm opacity-90">
              Campus bicycle marketplace for verified students. Sustainable, secure, spam-free.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="opacity-90 hover:opacity-100 transition-opacity">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="opacity-90 hover:opacity-100 transition-opacity">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/faq" className="opacity-90 hover:opacity-100 transition-opacity">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/blog" className="opacity-90 hover:opacity-100 transition-opacity">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">For Users</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/explore" className="opacity-90 hover:opacity-100 transition-opacity">
                  Browse Bicycles
                </Link>
              </li>
              <li>
                <Link to="/sell" className="opacity-90 hover:opacity-100 transition-opacity">
                  Sell Your Cycle
                </Link>
              </li>
              <li>
                <Link to="/my-listings" className="opacity-90 hover:opacity-100 transition-opacity">
                  My Listings
                </Link>
              </li>
              <li>
                <Link to="/profile" className="opacity-90 hover:opacity-100 transition-opacity">
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 opacity-90">
                <Mail size={16} />
                <span>info@dev-evelopers.com</span>
              </li>
              <li className="flex items-center gap-2 opacity-90">
                <Phone size={16} />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center gap-2 opacity-90">
                <MapPin size={16} />
                <span>Campus Location</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-75">
          <p>&copy; 2025 CampusCycles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
