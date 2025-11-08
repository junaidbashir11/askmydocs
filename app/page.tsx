"use client";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import dynamic from 'next/dynamic';
import { FileText, Zap, MessageSquare, BookOpen } from 'lucide-react';

const WalletButton = dynamic(
  () => import('@/lib/solanawalletbutton').then(mod => mod.SolanaWalletButton),
  { 
    ssr: false,
    loading: () => <div className="p-2 text-sm text-gray-400">Loading wallet...</div>,
  }
);

const data = [
  {
    name: "Rapid Comprehension",
    description: "Instantly understand complex documents with AI-powered analysis",
    icon: <Zap className="w-8 h-8 text-purple-400" />
  },
  {
    name: "Risk Identification",
    description: "Automatically detect potential risks and concerns in your documents",
    icon: <FileText className="w-8 h-8 text-pink-400" />
  },
  {
    name: "Q&A Generation",
    description: "Generate intelligent questions and answers from any document",
    icon: <MessageSquare className="w-8 h-8 text-blue-400" />
  },
  
];

function CarouselV() {
  return (
    <Carousel opts={{ align: "start" }} className="w-full max-w-5xl mx-auto">
      <CarouselContent>
        {data.map((item, index) => (
          <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3 p-4">
            <Card className="h-full bg-neutral-900/80 backdrop-blur-sm rounded-2xl border border-white/10 shadow-lg hover:shadow-2xl hover:border-purple-500/40 transition-all duration-300">
              <CardHeader>
                <div className="mb-3">{item.icon}</div>
                <CardTitle className="text-xl font-semibold text-white">{item.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black font-sans text-white">
      
      {/* Subtle gradient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl"></div>
      
      {/* Navbar */}
      <nav className="sticky top-4 z-50 w-[92%] max-w-6xl mx-auto bg-neutral-900/80 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-lg border border-white/10 flex items-center justify-between">
        <span className="font-semibold text-sm md:text-base text-white">
          <span className="hidden md:inline">Askmydoc CA: </span>
          <span className="font-mono text-xs md:text-sm text-gray-400">{process.env.NEXT_PUBLIC_CA}</span>
        </span>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col flex-1 items-center justify-center text-center px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 w-full max-w-6xl">
          
          {/* MAIN CARD */}
          <Card className="flex-1 bg-neutral-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 p-8 hover:shadow-2xl hover:border-purple-500/30 transition-all duration-300">
            <CardContent className="flex flex-col items-center justify-center space-y-6">
              {/* Logo SVG */}
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 64 64" aria-labelledby="title desc" role="img">
                  <title id="title">InteliDoc logo</title>
                  <desc id="desc">Minimal document icon with three connected nodes representing AI intelligence.</desc>

                  <rect x="6" y="6" width="40" height="52" rx="3" ry="3" fill="#1f1f1f" stroke="#a855f7" strokeWidth="2"/>
                  <path d="M46 6v12h12" fill="#1f1f1f" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M46 6 L58 6 L46 18 Z" fill="#2d2d2d" stroke="#a855f7" strokeWidth="1.2" strokeLinejoin="round"/>

                  <g transform="translate(16,18)">
                    <line x1="10" y1="6" x2="30" y2="6" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="20" y1="6" x2="20" y2="22" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round"/>
                    
                    <circle cx="10" cy="6" r="3.3" fill="#a855f7"/>
                    <circle cx="30" cy="6" r="3.3" fill="#ec4899"/>
                    <circle cx="20" cy="22" r="3.3" fill="#8b5cf6"/>
                  </g>
                </svg>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  InteliDoc
                </span>
              </h1>

              <p className="text-lg text-gray-400 max-w-md">
                Your intelligent document analysis companion powered by AI
              </p>
            </CardContent>
          </Card>

          {/* WALLET CARD */}
          <Card className="w-full md:w-80 bg-neutral-900/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 p-8 hover:shadow-2xl hover:border-purple-500/30 transition-all duration-300 flex flex-col items-center justify-center">
            <CardContent className="flex flex-col items-center space-y-6 w-full">
              <h4 className="text-xl font-semibold text-white text-center">
                Your Document Intelligence Pal
              </h4>
              <WalletButton />
              <div className="text-sm text-gray-400 text-center">
                Connect to unlock premium features
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Core Features */}
      <section
        id="features"
        className="flex flex-col items-center justify-center text-center px-6 py-16 space-y-8 border-t border-white/10"
      >
        <div className="space-y-3">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">Core Features</h2>
          <p className="text-lg text-gray-400 max-w-2xl">
            Powerful AI-driven tools to transform how you work with documents
          </p>
        </div>
        
        <CarouselV />
        
        <div className="pt-6">
          <p className="text-base text-gray-300">
            Hold <span className="font-semibold text-purple-400">50k $ID tokens</span> to unlock premium features
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10 bg-neutral-900/60">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>© 2025 InteliDoc • Powered by Solana</p>
        </div>
      </footer>
    </main>
  );
}