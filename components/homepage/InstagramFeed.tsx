import React from "react";
import Image from "next/image";
import { Heart, Camera } from "lucide-react";
import { instagramPosts } from "@/data";

export default function InstagramFeed() {
  return (
    <section className="w-full py-16 bg-[#faf9f6] dark:bg-[#151515] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#eae5de] dark:border-neutral-800">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
              Community Gallery
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white mt-1 font-serif">
              Worn by You • #LuxeAtelier
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:text-[#c5a880] dark:hover:text-[#c5a880] transition mt-2 sm:mt-0"
          >
            <Camera size={14} />
            <span>Follow @LuxeAtelier</span>
          </a>
        </div>

        {/* 4-Column Photo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {instagramPosts.map((post) => (
            <div
              key={post.id}
              className="group relative aspect-square rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 border border-[#eae5de] dark:border-neutral-800 cursor-pointer"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-108"
              />

              {/* Hover Dark Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-end">
                  <Camera size={16} className="text-white/80" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold block">{post.handle}</span>
                  <p className="text-[11px] text-neutral-300 line-clamp-1">{post.caption}</p>
                  <div className="flex items-center gap-1 text-[11px] text-[#e4cbb0] pt-1">
                    <Heart size={12} className="fill-[#e4cbb0]" />
                    <span>{post.likes.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
