"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 via-white to-white" />
      <div className="absolute -top-24 right-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-purple-100 to-indigo-100 blur-3xl opacity-60" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Section: Heading + CTA */}
          <div>
            <span className="inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
              Time Tracking Made Simple
            </span>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
              Track Time, Boost Productivity
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-500">
                Start for Free.
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-gray-600 text-lg">
              Join thousands of teams using Clockify to manage time, track projects, and improve productivity—absolutely free.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/get-started"
                className="inline-flex items-center rounded-xl bg-purple-600 px-6 py-3 text-white font-medium hover:bg-purple-700 transition"
              >
                Get Started — It’s Free
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center rounded-xl border border-gray-300 px-6 py-3 text-gray-800 hover:bg-gray-50 transition"
              >
                See Features
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-purple-400 text-purple-600">
                  ✓
                </span>
                100% Free
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-purple-400 text-purple-600">
                  ✓
                </span>
                Unlimited Users
              </div>
            </div>
          </div>

          {/* Right Section: Screenshot Preview */}
          <div className="relative">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl border shadow-lg">
              <Image
                src="/clockify-dashboard.png"
                alt="Clockify Dashboard Preview"
                width={800}
                height={600}
                className="object-cover"
              />
            </div>
            {/* Floating Tip Card */}
            <div className="absolute -bottom-6 -left-6 hidden sm:block rounded-2xl border bg-white p-4 shadow">
              <p className="text-xs font-medium text-gray-500">Pro Tip</p>
              <p className="text-sm">
                Replace this image with a real <code>next/image</code> optimized screenshot.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
