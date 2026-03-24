"use client";

import { HomeFinalCta } from "./_components/HomeFinalCta";
import { HomeHero } from "./_components/HomeHero";
import { HomeHowWeWork } from "./_components/HomeHowWeWork";
import { HomeLocation } from "./_components/HomeLocation";
import { HomeServices } from "./_components/HomeServices";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <HomeHero />
      <HomeServices />
      <HomeHowWeWork />
      <HomeLocation />
      <HomeFinalCta />
    </div>
  );
}