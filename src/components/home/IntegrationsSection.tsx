import React from "react";

export function IntegrationsSection() {
  const integrations = [
    {
      name: "Calendar Export",
      description:
        "Generates universal calendar invitation files that import directly into Google Calendar, Microsoft Outlook, Apple Calendar, and mobile devices.",
      highlight: true,
    },
    {
      name: "Google Workspace & Meet",
      description:
        "Architecture planned for two-way Google Calendar synchronization and automatic Google Meet conferencing link creation.",
      highlight: false,
    },
    {
      name: "Microsoft 365 & Teams",
      description:
        "Planned integration with Outlook 365 Exchange mailboxes and automated Teams meeting room attachment.",
      highlight: false,
    },
    {
      name: "Video Conferencing & Webhooks",
      description:
        "Planned webhook dispatchers to trigger Zoom link generation and CRM contact synchronization on confirmed bookings.",
      highlight: false,
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#fcfbf8] border-t border-[#e4e6e9]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="type-h2 font-bold text-[#071a31]">
            Designed to connect with the tools you use every day
          </h2>
          <p className="type-body-md text-[#5f6d77]">
            Plany is built on open standards, offering immediate RFC 5545 calendar invitations and an extensible architecture for future API connectors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {integrations.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-7 rounded-[20px] transition-all flex flex-col h-full ${
                item.highlight
                  ? "bg-white border-2 border-[#071a31] shadow-cal-md"
                  : "bg-white border border-[#d8dce0] shadow-sm hover:border-[#5f6d77]"
              }`}
            >
              <h3 className="text-lg font-bold text-[#071a31] leading-snug">
                {item.name}
              </h3>
              <p className="text-sm text-[#5f6d77] leading-relaxed mt-3">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
