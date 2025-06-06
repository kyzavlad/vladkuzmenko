// components/MensCommunitySection.tsx
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Crown, Flame } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function MensCommunitySection() {
  return (
    <div className="w-full py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] bg-gradient-radial from-red-500 to-transparent blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] bg-gradient-radial from-orange-500 to-transparent blur-3xl"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
              WARRIORS TEAM
            </h2>
            <p className="text-2xl md:text-3xl font-semibold mb-6 text-foreground/90 max-w-4xl mx-auto">
              99.9% of modern-day men will never experience the power of Brotherhood and Community.
            </p>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              They will never experience what it's like to have other ambitious, hard working, diligent, and dutiful men at their side.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-24">
            {/* Section 1 - Brotherhood */}
            <motion.div 
              className="grid md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-red-500/10 rounded-lg">
                    <Users className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold">The Power of Brotherhood</h3>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Inside <span className="font-bold text-foreground">Warriors Team</span> you will access <span className="font-bold text-foreground">knowledge</span> that will
                  spark your genius and compel you to <span className="font-bold text-foreground">work your hardest</span> to
                  keep up.
                </p>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  There is no other place on earth with Men of this caliber. A network
                  with wide-ranging perspectives and capabilities; each
                  member aspiring and succeeding at becoming a <span className="font-bold text-foreground">great man.</span>
                </p>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
                <div className="relative rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src="/warriors-group-photo.jpg"
                    alt="Warriors Team Brotherhood"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Section 2 - Success Stories */}
            <motion.div 
              className="grid md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative group md:order-1">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
                <div className="relative rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src="/warriors-yacht-meeting.jpg"
                    alt="Warriors Team Success"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-6 md:order-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-orange-500/10 rounded-lg">
                    <Crown className="h-8 w-8 text-orange-500" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold">Surrounded by Success</h3>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  To experience being surrounded by <span className="font-bold text-foreground">success stories</span>.
                  To be among the <span className="font-bold text-foreground">most energetic</span> and <span className="font-bold text-foreground">lucky Men in the world.</span>
                </p>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  We have <span className="font-bold text-foreground">over 3,500 members worldwide</span>, with
                  specialists, experts, and professionals in every
                  field imaginable. All dedicated to the <span className="font-bold text-foreground">pursuit of excellence in all
                  areas of life.</span>
                </p>
              </div>
            </motion.div>

            {/* Section 3 - Transformation */}
            <motion.div 
              className="grid md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-red-500/10 rounded-lg">
                    <Flame className="h-8 w-8 text-red-500" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold">Your Transformation Awaits</h3>
                </div>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  <span className="font-bold text-foreground">Our ongoing Mission</span> is to ceaselessly empower Men like
                  you to become the very best versions of themselves through
                  <span className="font-bold text-foreground"> physical, mental, emotional, spiritual</span>, and <span className="font-bold text-foreground">financial
                  development</span>.
                </p>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  <span className="font-bold text-foreground">ALL Men should be strong, positive, law-abiding citizens</span> who are <span className="font-bold text-foreground">reliable</span> and <span className="font-bold text-foreground">dependable</span> for their families, friends,
                  and communities.
                </p>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-500 opacity-70"></div>
                <div className="relative rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src="/warriors-leaders.jpg"
                    alt="Warriors Team Leaders"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="text-center mt-24">
            <h3 className="text-3xl md:text-4xl font-bold mb-8">
              Which Version Will You Pursue?
            </h3>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto text-lg md:text-xl">
              Or one who understands that no great Man ever succeeded without a tribe.
              Join a brotherhood of men who are redefining what's possible.
            </p>
            <Link href="/warriors-team" passHref legacyBehavior>
              <a target="_blank" rel="noopener noreferrer" aria-label="Join The Warriors Team">
                <Button 
                  size="lg"
                  className="bg-transparent text-foreground border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300 uppercase font-bold text-base md:text-lg px-12 py-6 group shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.5)] hover:scale-105"
                >
                  Join Warriors Team
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
