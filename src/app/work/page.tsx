import React from 'react';

const departments = [
  {
    title: "Climate Programme",
    description: "Developing practical adaptation strategies for communities facing shifting rainfall and extreme weather.",
    activities: ["Drought resilience workshops", "Community reforestation", "Water conservation training"],
    contact: "Coordinator Name"
  },
  {
    title: "Climate Research & Analysis",
    description: "Translating global climate data into actionable insights for Zimbabwean farmers and policymakers.",
    activities: ["Rainfall pattern analysis", "Crop suitability reports", "Local impact assessments"],
    contact: "Head of Research"
  },
  {
    title: "Artificial Intelligence & Technology",
    description: "Building low-bandwidth tools to democratize access to climate information and early warning systems.",
    activities: ["SMS-based alerts", "Predictive modeling", "Digital literacy for farmers"],
    contact: "Tech Lead"
  },
  {
    title: "Events Coordination",
    description: "Organizing impactful events to foster community engagement.",
    activities: ["Conferences", "Clean-up campaigns", "Educational seminars"],
    contact: "Events Manager"
  },
  {
    title: "Public Relations",
    description: "Managing communications and ensuring consistent messaging.",
    activities: ["Media relations", "Social media management", "Brand oversight"],
    contact: "PR Officer"
  },
  {
    title: "Creative Committee",
    description: "Using art and media to communicate climate narratives effectively.",
    activities: ["Visual design", "Video production", "Artistic campaigns"],
    contact: "Creative Director"
  },
  {
    title: "Clubs & Societies Operations",
    description: "Coordinating youth clubs in schools and universities.",
    activities: ["Club formation", "Resource distribution", "Network building"],
    contact: "Operations Lead"
  }
];

export default function WorkPage() {
  return (
    <main className="flex-grow py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-brand-dark mb-4">Our Work</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Our organization operates through specialized departments, each focused on a critical aspect of our mission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((dept, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-green mb-3">{dept.title}</h3>
                <p className="text-stone-600 mb-4 text-sm leading-relaxed min-h-[60px]">
                  {dept.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-2">Key Activities</h4>
                  <ul className="text-sm text-stone-600 space-y-1">
                    {dept.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-1.5 h-1.5 bg-brand-green/50 rounded-full mr-2"></span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-stone-100">
                  <p className="text-xs text-stone-500">
                    <span className="font-semibold">Contact:</span> {dept.contact}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
