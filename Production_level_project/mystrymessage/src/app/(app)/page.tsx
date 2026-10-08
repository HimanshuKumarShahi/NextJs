"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import {
  ShieldCheck,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Quote,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const mockMessages = [
  {
    title: "Secret Admirer",
    content: "You always bring the best energy to the room. Never change!",
    time: "2 mins ago",
  },
  {
    title: "Honest Feedback",
    content:
      "Your recent project was incredible, but the presentation could be slower.",
    time: "1 hour ago",
  },
  {
    title: "Random Question",
    content: "If you could instantly master one instrument, what would it be?",
    time: "3 hours ago",
  },
  {
    title: "Deep Thought",
    content:
      "Sometimes I wonder how different our lives would be if we met earlier.",
    time: "1 day ago",
  },
];

export default function Home() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />

      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-4xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-orange-400 text-sm font-semibold tracking-wide backdrop-blur-sm">
            <Sparkles className="h-4 w-4" /> Powered by AI
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
            Dive into the World of <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              Anonymous Feedback
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            MysteryMessage is where honesty meets anonymity. Share your unique
            link, receive unfiltered thoughts, and use AI to generate intriguing
            questions for your audience.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/sign-up">
              <Button className="h-14 px-8 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-xl font-bold text-lg shadow-[0_0_30px_-5px_rgba(234,88,12,0.5)] hover:shadow-[0_0_40px_-5px_rgba(234,88,12,0.7)] transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="h-14 px-8 border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-white rounded-xl font-bold text-lg backdrop-blur-sm w-full sm:w-auto transition-all"
              >
                Login to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-full max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-zinc-200 flex items-center justify-center gap-2">
              <MessageSquare className="h-6 w-6 text-orange-500" />
              See What People Are Sending
            </h2>
          </div>

          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {mockMessages.map((message, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card className="bg-zinc-950/80 border-zinc-800 backdrop-blur-xl rounded-3xl overflow-hidden group hover:border-orange-500/50 transition-colors duration-300">
                      <CardHeader className="relative pb-2">
                        <Quote className="absolute top-4 right-4 h-12 w-12 text-zinc-800/50 -rotate-12" />
                        <CardTitle className="text-lg font-bold text-zinc-100 flex items-center gap-2 relative z-10">
                          {message.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative z-10">
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                          "{message.content}"
                        </p>
                        <p className="text-xs font-mono text-orange-500 font-semibold">
                          {message.time}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="hidden md:block">
              <CarouselPrevious className="bg-zinc-900 border-zinc-700 text-white hover:bg-orange-500 hover:text-white" />
              <CarouselNext className="bg-zinc-900 border-zinc-700 text-white hover:bg-orange-500 hover:text-white" />
            </div>
          </Carousel>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-5xl mx-auto w-full">
          <div className="p-6 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm">
            <div className="h-12 w-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4 border border-orange-500/20">
              <ShieldCheck className="h-6 w-6 text-cyan-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              100% Anonymous
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              We never track senders. Receive authentic, unfiltered feedback
              with complete peace of mind.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm">
            <div className="h-12 w-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4 border border-orange-500/20">
              <Sparkles className="h-6 w-6 text-cyan-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              AI Suggestions
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Writers block? Our integrated Gemini AI generates intriguing,
              tailored questions for your audience to answer.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 backdrop-blur-sm">
            <div className="h-12 w-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mb-4 border border-orange-500/20">
              <MessageSquare className="h-6 w-6 text-cyan-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Control Your Inbox
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Toggle your inbox status on or off instantly. You have total
              command over when you receive messages.
            </p>
          </div>
        </div>
      </main>


      <footer className="w-full border-t border-zinc-900 bg-black py-8 text-center z-10">
        <p className="text-zinc-600 text-sm">
          &copy; {new Date().getFullYear()} MysteryMessage - (Himanshu).
        </p>
      </footer>
    </div>
  );
}
