"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar  from "./components/Navbar.js";
import Footer from "./components/Footer.js";
import Hero from "./components/hero.js";
/**
 * Drop this file in `app/page.js` (Next.js App Router)
 * Tailwind required. No extra libraries.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <Features />
      <Reporting />
      <ReportingSection />
      <WhyTrackTime />
      <Testimonials />
      <CTA />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}


import { FaRegClock, FaCalendarAlt, FaListUl } from "react-icons/fa";
import { MdAutorenew } from "react-icons/md";

function Features() {
  const features = [
    {
      icon: <FaRegClock className="text-blue-500 text-xl" />,
      title: "Timer",
      desc: "Track work hours in real time."
    },
    {
      icon: <FaListUl className="text-blue-500 text-xl" />,
      title: "Timesheet",
      desc: "Enter time in a weekly timesheet."
    },
    {
      icon: <FaCalendarAlt className="text-blue-500 text-xl" />,
      title: "Calendar",
      desc: "Visually block out and manage time."
    },
    {
      icon: <MdAutorenew className="text-blue-500 text-xl" />,
      title: "Auto tracker",
      desc: "Track activities automatically in the background."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Time management features</h2>
          <p className="mt-3 text-gray-600">
            Track productivity, attendance, and billable hours with a simple time tracker and timesheet.
          </p>

          <div className="mt-8 space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition">
                <div className="flex-shrink-0">{feature.icon}</div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Mock UI */}
        <div className="bg-blue-100 rounded-3xl p-6 flex flex-col space-y-4">
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-4 flex justify-between items-center shadow">
            <span className="text-gray-500">Working on...</span>
            <div className="flex items-center gap-3">
              <span className="text-blue-600 text-sm font-medium">+ Project</span>
              <span className="text-gray-700 font-semibold">00:00</span>
              <button className="bg-blue-500 text-white rounded-full p-2">
                ▶
              </button>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-xl p-4 flex justify-between items-center shadow">
            <span className="text-gray-700">Working</span>
            <div className="flex items-center gap-3">
              <span className="text-pink-500 text-sm font-medium">● Project X</span>
              <span className="text-gray-700 font-semibold">00:01</span>
              <button className="bg-red-500 text-white rounded-full p-2">
                ■
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function Reporting() {
  const [activeItem, setActiveItem] = useState("Reports");

  const content = {
    Reports: "Analyze and export tracked time reports",
    Activity: "See who works on what tasks in real-time",
    Rates: "View earnings, costs, and profit rates",
    Projects: "Track time and costs for different projects"
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        
        {/* LEFT: Dynamic content */}
        <div className="rounded-3xl border bg-white p-6 shadow-sm h-[350px] flex flex-col items-center justify-center text-center transition-all duration-300">
          <h3 className="text-2xl font-semibold">{activeItem}</h3>
          <p className="mt-4 text-gray-600">{content[activeItem]}</p>
        </div>

        {/* RIGHT: Hover Menu */}
        <div className="space-y-4">
          {Object.keys(content).map((item) => (
            <div
              key={item}
              onMouseEnter={() => setActiveItem(item)}
              className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition 
              ${activeItem === item ? "bg-blue-50 border-blue-400" : "bg-white hover:bg-gray-50"}`}
            >
              <span className="text-lg font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReportingSection() {
  const [activeItem, setActiveItem] = useState("Reports");

  const items = [
    {
      name: "Reports",
      description: "Analyze and export tracked time reports.",
      image: "/charts/reports.png", // Replace with actual image or chart
    },
    {
      name: "Activity",
      description: "See who works on what and track progress.",
      image: "/charts/activity.png",
    },
    {
      name: "Rates",
      description: "See earnings, cost, and profitability data.",
      image: "/charts/rates.png",
    },
    {
      name: "Projects",
      description: "Break down time by projects and tasks.",
      image: "/charts/projects.png",
    },
  ];

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-6xl w-full flex gap-12 px-8">
        
        {/* LEFT: Menu */}
        <div className="w-72 space-y-4">
          <h2 className="text-3xl font-bold mb-6">Reporting</h2>
          {items.map((item) => (
            <div
              key={item.name}
              onMouseEnter={() => setActiveItem(item.name)}
              className={`p-4 rounded-xl border cursor-pointer transition 
              ${activeItem === item.name ? "bg-blue-50 border-blue-400" : "bg-white hover:bg-gray-50"}`}
            >
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>

        {/* RIGHT: Dynamic preview */}
        <div className="flex-1 rounded-3xl bg-blue-100 flex items-center justify-center p-6 transition-all">
          <img
            src={items.find((i) => i.name === activeItem).image}
            alt={activeItem}
            className="w-[400px] rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}


import {  FaDollarSign } from "react-icons/fa";
import { MdOutlineBarChart, MdOutlinePeopleAlt } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";

function WhyTrackTime() {
  const [activeTab, setActiveTab] = useState("Timekeeping");

  const tabs = [
    {
      name: "Timekeeping",
      icon: <FaRegClock size={22} />,
      description:
        "Track time using a timer, clock-in kiosk, or timesheet.",
      image: "/images/timekeeping.png",
    },
    {
      name: "Budgeting",
      icon: <FaDollarSign size={22} />,
      description: "Manage project budgets and track expenses easily.",
      image: "/images/budgeting.png",
    },
    {
      name: "Planning",
      icon: <HiOutlineClipboardList size={22} />,
      description: "Plan tasks and allocate resources effectively.",
      image: "/images/planning.png",
    },
    {
      name: "Attendance",
      icon: <MdOutlinePeopleAlt size={22} />,
      description: "Track team attendance and working hours accurately.",
      image: "/images/attendance.png",
    },
    {
      name: "Reporting",
      icon: <TbReportAnalytics size={22} />,
      description: "Generate detailed reports and analyze data trends.",
      image: "/images/reporting.png",
    },
    {
      name: "Payroll",
      icon: <FaDollarSign size={22} />,
      description: "Simplify payroll with automated time tracking.",
      image: "/images/payroll.png",
    },
  ];

  const activeContent = tabs.find((tab) => tab.name === activeTab);

  return (
    <section className="w-full bg-blue-50 py-16 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8">Why track time with Clockify</h2>

      {/* Tabs */}
      <div className="flex bg-white rounded-xl shadow p-4 gap-6 mb-12">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex flex-col items-center px-4 py-2 text-sm font-medium transition
            ${activeTab === tab.name ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500"}`}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Dynamic Content */}
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl w-full px-6">
        {/* Image / Chart */}
        <div className="flex-1 bg-white rounded-xl shadow p-6 flex justify-center">
          <img
            src={activeContent.image}
            alt={activeContent.name}
            className="w-[400px] h-auto"
          />
        </div>

        {/* Text */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4">{activeContent.name}</h3>
          <p className="text-gray-600 mb-6">{activeContent.description}</p>
          <a href="#" className="text-blue-600 font-semibold hover:underline">
            Learn more →
          </a>
        </div>
      </div>
    </section>
  );
}


function Services() {
  const items = [
    { title: "Design", desc: "Landing pages, dashboards, and systems." },
    { title: "Development", desc: "Next.js apps with clean architecture." },
    { title: "Consulting", desc: "Performance, accessibility & SEO audits." },
  ];
  return (
    <section id="services" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Services</h2>
            <p className="mt-4 text-gray-600">Pick what you need—or mix and match.</p>
          </div>
          <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
            {items.map((it) => (
              <div key={it.title} className="rounded-2xl border p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-lg font-semibold">{it.title}</h3>
                <p className="mt-2 text-gray-600">{it.desc}</p>
                <a href="#contact" className="mt-4 inline-block text-sm underline">Request this</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { k: "10k+", v: "Downloads" },
    { k: "98%", v: "Satisfaction" },
    { k: "<50ms", v: "TTFB" },
    { k: "24/7", v: "Support" },
  ];
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-4 text-center">
          {stats.map((s) => (
            <div key={s.v} className="rounded-2xl border border-white/10 p-6">
              <div className="text-3xl font-bold">{s.k}</div>
              <div className="mt-1 text-sm text-white/80">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    { name: "Aarav", role: "Founder", text: "Clean, modern, and fast to ship." },
    { name: "Sara", role: "Student", text: "Perfect for my project demo!" },
    { name: "Meera", role: "Engineer", text: "Saves me hours every week." },
  ];
  return (
    <section id="testimonials" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">What users say</h2>
          <p className="mt-3 text-gray-600">Loved by builders and learners.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q) => (
            <figure key={q.name} className="rounded-2xl border p-6 shadow-sm">
              <blockquote className="text-gray-700">“{q.text}”</blockquote>
              <figcaption className="mt-4 text-sm text-gray-600">{q.name} · {q.role}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="get-started" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Ready to build faster?</h2>
        <p className="mt-3 text-gray-600">Start with the hero section, then plug in the blocks you need.</p>
        <a href="#contact" className="mt-6 inline-flex items-center rounded-xl bg-gray-900 px-6 py-3 text-white">Talk to us</a>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Is this free to use?", a: "Yes, feel free to copy and adapt." },
    { q: "Does it work in Next.js 13+?", a: "Yes, this is an App Router page using 'use client'." },
    { q: "How to add dark mode?", a: "Add the 'dark' class on <html> and supply dark: variants." },
  ];
  return (
    <section id="faq" className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold sm:text-4xl text-center">FAQ</h2>
        <div className="mt-10 space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border p-5">
              <summary className="list-none cursor-pointer select-none font-medium flex items-center justify-between">
                {f.q}
                <span className="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full border transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-gray-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Contact</h2>
            <p className="mt-4 text-gray-600">Send a message and we'll get back to you soon.</p>
            <div className="mt-8 rounded-2xl border p-6">
              <form onSubmit={(e) => e.preventDefault()} className="grid gap-4">
                <input className="rounded-xl border p-3" placeholder="Your name" />
                <input className="rounded-xl border p-3" type="email" placeholder="Email" />
                <textarea className="rounded-xl border p-3" rows={5} placeholder="Message" />
                <button className="rounded-xl bg-gray-900 px-5 py-3 text-white">Send</button>
              </form>
            </div>
          </div>
          <div className="rounded-3xl border p-6">
            <h3 className="text-lg font-semibold">Location</h3>
            <p className="mt-2 text-gray-600">Remote • Worldwide</p>
            <div className="mt-6 aspect-video w-full rounded-2xl bg-gray-100 grid place-items-center text-gray-500">
              Map/illustration placeholder
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

