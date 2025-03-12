import React from "react";
import { Globe } from "lucide-react";

const Footer = () => {
  const footerLinks = [
    {
      title: "LearnLabs",
      links: ["LearnLabs", "Get the app", "About us", "Contact us"],
    },
    {
      title: "Careers",
      links: ["Blog", "Help and Support", "Affiliate", "Investors"],
    },
    {
      title: "Terms",
      links: [
        "Privacy policy",
        "Cookie settings",
        "Sitemap",
        "Accessibility statement",
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="font-bold mb-4">{section.title}</h4>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="mb-2">
                    <a href="#" className="text-gray-400 hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <button className="flex items-center border border-white p-2 mb-4">
              <Globe className="h-5 w-5 mr-2" />
              <span>English</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-8">
          <div className="text-2xl font-bold mb-4 md:mb-0">
            <span className="text-purple-400">L</span>earn
            <span className="text-purple-400">L</span>abs
          </div>

          <div className="text-gray-400">© 2025 LearnLabs.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
