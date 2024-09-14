"use client";

import NumberCounter from "./components/NumberCounter";
import ProfileCard from "./components/ProfileCard";
import profiles from "./helpers/Profiles";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-4 px-6 sm:px-8 lg:px-12">
      {/* About Section */}
      <section className="w-full max-w-6xl mx-auto mb-16">
        {" "}
        {/* Added margin-bottom for spacing */}
        <h2 className="text-3xl sm:text-5xl font-bold text-blue-600 mb-8 text-center lg:text-left lg:mb-12 lg:ml-8 animate-slideInFromLeft">
          About
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center mx-auto mt-8">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-700">
              Our department boasts a vibrant community with a strong focus on
              academic excellence and innovation.
            </p>
          </div>
          <div className="flex justify-center lg:items-end lg:mr-8">
            <div className="flex gap-20 items-center lg:items-end animate-fadeIn">
              <NumberCounter target={500} label="Students" />
              <NumberCounter target={12} label="Staff" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="w-full max-w-6xl mx-auto">
        <div className="min-h-screen flex flex-col items-center py-8 px-4">
          <h1 className="text-3xl font-bold mb-8">Our Team</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-20">
            {profiles.map((profile, index) => (
              <ProfileCard
                key={index}
                image={profile.image}
                name={profile.name}
                degrees={profile.degrees}
                content={profile.content}
                social={profile.social}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
