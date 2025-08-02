import React, { useContext, useState } from "react";
import Sidebar from "../components/sidebar";
import { ThemeContext } from "../context/ThemeContext";

const teamData = [
  {
    name: "Priyanshu Mehta",
    role: "Founder & Developer",
    bio: "Builds and maintains the core platform.",
  },
  {
    name: "Steve H",
    role: "Designer & Content Manager",
    bio: "Crafts visuals and manages content strategy.",
  },
  {
    name: "John Doe",
    role: "Marketing Lead",
    bio: "Handles growth and outreach.",
  },
];

const About: React.FC = () => {
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
            <h1 className="text-4xl font-semibold mb-4">About Us</h1>
            <p className="text-base leading-relaxed max-w-2xl mx-auto">
              Explore is a platform for sharing ideas, connecting people, and
              amplifying voices. We combine clarity, purpose, and community to
              help users express themselves and discover meaningful content.
            </p>
          </header>

          {/* Key Info */}
          <div className="mb-10 flex flex-col sm:flex-row justify-center gap-10">
            <div>
              <h2 className="text-lg font-medium mb-1">Founded</h2>
              <p>2024</p>
            </div>
            <div>
              <h2 className="text-lg font-medium mb-1">Location</h2>
              <p>Almora, Uttarakhand</p>
            </div>
            <div>
              <h2 className="text-lg font-medium mb-1">Mission</h2>
              <p>Empower people to share their knowledge and stories.</p>
            </div>
          </div>

          {/* Team */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
              {teamData.map((member) => (
                <div
                  key={member.name}
                  className="border rounded-lg p-4 flex flex-col items-center max-w-xs"
                >
                  {/* Placeholder avatar */}
                  <div className="w-12 h-12 rounded-full border flex items-center justify-center mb-3">
                    <span className="text-sm font-medium">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm mb-2">{member.role}</div>
                  <p className="text-sm text-center">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
