import React, { useContext, useState } from "react";
import Sidebar from "../components/sidebar";
import { ThemeContext } from "../context/ThemeContext";

const contactInfo = {
  address: "123 Mountain Lane, Almora, Uttarakhand",
  email: "info@example.com",
  phone: "+91 98765 43210",
  supportEmail: "support@example.com",
  businessHours: "Mon - Fri: 9:00 AM to 6:00 PM",
  socials: [
    { name: "Twitter", handle: "@explore_platform" },
    { name: "LinkedIn", handle: "Explore Inc." },
    { name: "Instagram", handle: "@explore_official" },
  ],
};

const Contact: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const showSidebar = theme === "theme2";

  const cardClasses = theme === "theme2"
    ? "bg-gray-800 text-white border border-gray-600"
    : "bg-white text-gray-900 border";

  return (
    <div className="flex min-h-screen">
      {showSidebar && (
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      )}

      <main
        className={`
          flex-1 px-4 py-10 transition-padding duration-300
          flex flex-col items-center
          ${showSidebar ? (collapsed ? "pl-16 md:pl-16" : "pl-64 md:pl-64") : ""}
        `}
      >
        <div className={`w-full max-w-4xl rounded-2xl shadow-xl p-6 sm:p-8 space-y-10 ${cardClasses}`}>
          {/* Header */}
          <section className="text-center">
            <header className="mb-6">
              <h1 className="text-3xl sm:text-4xl font-semibold mb-2">Contact Us</h1>
              <p className="text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                Have questions or want to reach out? Here’s how you can get in touch with our team. We’re here to help and would love to hear from you.
              </p>
            </header>

            {/* Contact Cards */}
            <div className="mb-8 grid gap-6 grid-cols-1 sm:grid-cols-2">
              <div className="rounded-lg p-5 flex flex-col items-start space-y-2">
                <h2 className="text-xl font-medium mb-1">General Inquiries</h2>
                <p className="text-sm">
                  <span className="font-semibold">Email:</span> {contactInfo.email}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Phone:</span> {contactInfo.phone}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Address:</span> {contactInfo.address}
                </p>
              </div>
              <div className="rounded-lg p-5 flex flex-col items-start space-y-2">
                <h2 className="text-xl font-medium mb-1">Support</h2>
                <p className="text-sm">
                  <span className="font-semibold">Email:</span> {contactInfo.supportEmail}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Hours:</span> {contactInfo.businessHours}
                </p>
                <div className="mt-2">
                  <div className="text-sm font-semibold mb-1">Follow Us:</div>
                  <div className="flex flex-wrap gap-4">
                    {contactInfo.socials.map((s) => (
                      <div key={s.name} className="text-sm">
                        <div>{s.name}</div>
                        <div className="italic">{s.handle}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>
              <form className="grid gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    aria-label="Your Name"
                    className="flex-1 border rounded-md p-3 w-full"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    aria-label="Your Email"
                    className="flex-1 border rounded-md p-3 w-full"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  aria-label="Subject"
                  className="w-full border rounded-md p-3"
                />
                <textarea
                  placeholder="Your Message"
                  aria-label="Your Message"
                  className="w-full border rounded-md p-3 h-40 resize-none"
                />
                <div>
                  <button
                    type="submit"
                    className="px-6 py-3 w-full rounded-md border font-medium hover:opacity-95 transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>

            {/* Footer/Extra */}
            <div className="text-sm text-gray-400">
              <p>We aim to respond within 1-2 business days.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Contact;
