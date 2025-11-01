import { useTheme } from "@/contexts/ThemeContext";
import { FaEnvelope, FaInstagram, FaCommentDots, FaFacebook, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

const Footer = () => {
  const { isDark } = useTheme();

  // Section title color based on theme
  const sectionTitleColor = isDark ? "#ffffff" : "#1a1a1a";

  // Social icon class helper
  const socialClass = `p-3 rounded-full transition-colors ${
    isDark ? "bg-gray-800 hover:bg-pink-500 text-gray-100" : "bg-gray-200 hover:bg-pink-500 text-gray-900"
  }`;

  return (
    <footer
      className={`w-full py-10 px-6 md:px-20 transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0 border-b border-gray-400 pb-6"
      >
        {/* Left Section */}
        <div className="flex-1">
          <h2
            className="text-xl font-serif font-bold transition-colors duration-300"
            style={{ color: sectionTitleColor }}
          >
            Rich Zenzi Art
          </h2>
          <p className="mt-2 text-sm max-w-xs">
            Creating timeless portraits that capture the essence of the human spirit.
          </p>
        </div>

        {/* Middle Section */}
        <div className="flex-1">
          <h3
            className="font-semibold mb-2 transition-colors duration-300"
            style={{ color: sectionTitleColor }}
          >
            Quick Links
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="hover:text-pink-500 transition-colors">Home</a>
            </li>
            <li>
              <a href="/gallery" className="hover:text-pink-500 transition-colors">Gallery</a>
            </li>
            <li>
              <a href="/commissions" className="hover:text-pink-500 transition-colors">Commissions</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-pink-500 transition-colors">Contact</a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="flex-1 flex flex-col gap-6">
        {/* Follow Me */}
        <div>
            <h3
            className="font-semibold mb-2 transition-colors duration-300"
            style={{ color: sectionTitleColor }}
            >
            Follow Me
            </h3>
            <div className="flex gap-4">
            <a
                href="https://www.facebook.com/munzenzirichart"
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
            >
                <FaFacebook />
            </a>
            <a
                href="https://www.instagram.com/richzenziart/?igsh=MWFwYXRxbWM0OGlmag%3D%3D#"
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
            >
                <FaInstagram />
            </a>
            <a
                href="https://tiktok.com/@richzenziart"
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
            >
                <SiTiktok />
            </a>
            <a
                href="https://www.youtube.com/@richzenziart"
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
            >
                <FaYoutube />
            </a>
            </div>
        </div>

        {/* Contact Me */}
        <div>
            <h3
            className="font-semibold mb-2 transition-colors duration-300"
            style={{ color: sectionTitleColor }}
            >
            Contact Me
            </h3>
            <div className="flex gap-4">
            <a href="richzenziart@gmail.com" className={socialClass}>
                <FaEnvelope />
            </a>
            <a
                href="https://wa.me/260760741435" 
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
            >
                <FaWhatsapp />
            </a>
            </div>
        </div>
        </div>

      </div>

      <p className="mt-6 text-center text-sm">
        © {new Date().getFullYear()} Rich Zenzi Art | All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;