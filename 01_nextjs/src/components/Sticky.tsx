"use client";

import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";


const content = [
  {
    title: "Collaborative Editing",
    description: "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly.",
    content: (
      <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" className="h-full w-full object-cover" alt="Team collaboration" />
    ),
  },
  {
    title: "Real-time Changes",
    description: "See changes as they happen. With our platform, you can track every modification in real-time. No more confusion about the latest version.",
    content: (
      <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998" className="h-full w-full object-cover" alt="Real-time tracking" />
    ),
  },
  {
    title: "Version Control",
    description: "Experience real-time updates and never stress about version control again. Always work on the most recent version of your project.",
    content: (
      <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c" className="h-full w-full object-cover" alt="Coding workspace" />
    ),
  },
  {
    title: "Global Sync",
    description: "Sync your work across all devices instantly. Whether you're on a laptop or a mobile device, your progress is always saved and updated.",
    content: (
      <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa" className="h-full w-full object-cover" alt="Global connectivity" />
    ),
  },
  {
    title: "Data Visualization",
    description: "Transform complex data into intuitive visuals. Understand your project metrics at a glance with our built-in analytical tools.",
    content: (
      <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71" className="h-full w-full object-cover" alt="Data charts" />
    ),
  },
  {
    title: "Cloud Security",
    description: "Your data is protected with enterprise-grade encryption. We ensure that your work remains private and secure at all times.",
    content: (
      <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3" className="h-full w-full object-cover" alt="Secure cloud" />
    ),
  },
  {
    title: "AI-Powered Insights",
    description: "Leverage the power of AI to get smart suggestions, automate repetitive tasks, and speed up your development process.",
    content: (
      <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995" className="h-full w-full object-cover" alt="AI brain" />
    ),
  },
  {
    title: "Seamless Integration",
    description: "Connect with your favorite tools like Slack, GitHub, and Jira. Manage your entire stack from one centralized dashboard.",
    content: (
      <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" className="h-full w-full object-cover" alt="Team integration" />
    ),
  },
];
export default function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
