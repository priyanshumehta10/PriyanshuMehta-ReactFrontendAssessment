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

  return (
    <div className="flex min-h-screen">
      {showSidebar && (
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      )}

      <main
        className={`
          flex-1 px-6 py-12 transition-padding duration-300
          flex flex-col items-center
          ${showSidebar ? (collapsed ? "pl-16 md:pl-16" : "pl-64 md:pl-64") : ""}
        `}
        style={{ marginLeft: 0 }}
      >
        <section className="w-full max-w-3xl text-center">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-semibold mb-4">Contact Us</h1>
            <p className="text-base leading-relaxed max-w-2xl mx-auto">
              Have questions or want to reach out? Here’s how you can get in
              touch with our team. We’re here to help and would love to hear from
              you.
            </p>
          </header>

          {/* Contact Cards */}
          <div className="mb-12 grid gap-8 sm:grid-cols-2">
            <div className="border rounded-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-medium mb-2">General Inquiries</h2>
              <p className="text-sm mb-1">
                <span className="font-semibold">Email:</span> {contactInfo.email}
              </p>
              <p className="text-sm mb-1">
                <span className="font-semibold">Phone:</span> {contactInfo.phone}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Address:</span> {contactInfo.address}
              </p>
            </div>
            <div className="border rounded-lg p-6 flex flex-col items-center">
              <h2 className="text-xl font-medium mb-2">Support</h2>
              <p className="text-sm mb-1">
                <span className="font-semibold">Email:</span> {contactInfo.supportEmail}
              </p>
              <p className="text-sm mb-1">
                <span className="font-semibold">Hours:</span> {contactInfo.businessHours}
              </p>
              <div className="mt-2">
                <div className="text-sm font-semibold mb-1">Follow Us:</div>
                <div className="flex gap-4 justify-center">
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
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>
            <form className="grid gap-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="flex-1 border rounded-md p-3"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="flex-1 border rounded-md p-3"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full border rounded-md p-3"
              />
              <textarea
                placeholder="Your Message"
                className="w-full border rounded-md p-3 h-32 resize-none"
              />
              <div>
                <button
                  type="submit"
                  className="px-6 py-3 w-full rounded-md border font-medium"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Footer/Extra */}
          <div className="text-sm text-gray-500">
            <p>We aim to respond within 1-2 business days.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
