'use client'

import Image from 'next/image'

export default function Banner() {
  return (
    <section className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-lg mb-6">
      <Image
        src="/banner.jpg"
        alt="Banner"
        layout="fill"
        objectFit="cover"
        priority
        className="z-0"
      />
      <div className="absolute inset-0 bg-rose-600/60 z-10 flex items-center justify-center">
        <h1 className="text-white text-2xl sm:text-2xl md:text-5xl font-bold text-center drop-shadow-md">
          Welcome to the Public Blog
        </h1>
      </div>
    </section>
  )
}
