import { Cpu, Globe2, Video, Users, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export function AboutMeSection() {
  return (
    <section id="about" className="py-20 md:py-24 bg-background border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.1fr),minmax(0,0.9fr)] items-start">
          {/* Text block */}
          <div className="space-y-6">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-muted-foreground">
              Personal brand & ecosystem
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Building a life around <span className="gold-gradient">systems, freedom and work that matters</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              I design and operate systems that remove low-value work from people’s lives: AI agents, automation
              workflows and content engines that bring attention and clients. Everything you see here — the agency,
              SaaS tools, The University and the Warriors community — is built from my real experiments and client
              work.
            </p>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              The goal is simple: take what actually works in business, automation and personal performance, and turn
              it into something you can plug into your own life without pretending to be someone else.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400">
                  <Cpu className="h-4 w-4" />
                  <span>Content + Automation Agency</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Done-for-you systems for brands who want distribution, leads and less chaos: AI assistants, outbound
                  engines, content pipelines.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400">
                  <Video className="h-4 w-4" />
                  <span>SaaS & AI Systems</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Pre-built workflows, clipping engines and assistants that turn your existing content and operations
                  into something scalable.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400">
                  <Users className="h-4 w-4" />
                  <span>The University & Warriors</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Education and community for people who want to build their own ecosystem: skills, systems and
                  positioning.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-400">
                  <Globe2 className="h-4 w-4" />
                  <span>Long-term game</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Everything is built with a 5–10 year horizon in mind: assets, reputation and relationships, not quick
                  hacks.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Button asChild variant="outline" className="border-zinc-700 hover:border-amber-400">
                <Link href="/automation">
                  <ArrowRight className="mr-2 h-4 w-4" />
                  See how we implement this for clients
                </Link>
              </Button>
            </div>
          </div>

          {/* Side card */}
          <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-6 md:p-8 space-y-6 premium-shadow">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-400">
              Current focus
            </p>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>Deep AI automation stacks for service businesses and e-commerce in Ukraine and beyond.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>
                  Turning long-form ideas and lessons into short-form distribution across YouTube, TikTok and Instagram.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>
                  Building The University curriculum from real work: client cases, internal systems and experiments.
                </span>
              </li>
            </ul>

            <div className="border-t border-zinc-800 pt-4 mt-2 text-xs text-zinc-500">
              This site is not about perfection. It is a live control center for everything I build next.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
