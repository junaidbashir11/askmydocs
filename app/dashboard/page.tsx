"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import LegalComponent from "@/lib/legalcomponent";
import LegalComponent2 from "@/lib/legalcomponent2";
import LegalPoints from "@/lib/legalpoints";
import LegalDive from "@/lib/legaldeepdive";
import MedicalDive from "@/lib/medicaldeepdive";
import MedicalComponent from "@/lib/medicalcomponent";
import MedicalComponent2 from "@/lib/medicalcomponent2";
import MedicalPoints from "@/lib/medicalpoints";
import ResearchComponent from "@/lib/researchcomponent";
import ResearchComponent2 from "@/lib/researchcomponentlt";
import ResearchDive from "@/lib/researchdeepdive";
import ResearchPoints from "@/lib/researchpoints";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { FileText, Stethoscope, FlaskConical, FileSignature,TwitterIcon} from "lucide-react";
import dynamic from 'next/dynamic';
import Image from "next/image";



const WalletButton = dynamic(
  () => import('@/lib/solanawalletbutton').then(mod => mod.SolanaWalletButton),
  { 
    ssr: false,
    loading: () => <div className="p-2 text-sm text-gray-400">Loading wallet...</div>,
  }
);

export default function DashboardPage() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("Legal");

  useEffect(() => {
    if (!connected && !publicKey) {
      router.push("/");
    }
  }, [connected, router, publicKey]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black font-sans">
      {/* Subtle gradient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl"></div>

      {/* Floating Nav */}
      <nav className="fixed top-2 right-6 z-50">
        <div className="flex items-center gap-7 px-6 py-3  text-white shadow-lg border border-white/10">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold hover:text-purple-400 transition-colors"
          >
            <TwitterIcon/>
          </a>
          <a
            href={process.env.NEXT_PUBLIC_PUMP_ENDPOINT}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold hover:text-purple-400 transition-colors"
          >
            <Image
              src="/pump-logomark.svg"
              alt=";"
              width={35}
              height={35}
            />
          </a>
          <WalletButton />
        </div>
      </nav>

      {/* Fixed Left Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-neutral-900/80 backdrop-blur-sm border-r border-white/10 shadow-xl z-40 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400 text-sm">Document Intelligence</p>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={() => setActiveCategory("Legal")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${
              activeCategory === "Legal"
                ? "bg-blue-500 text-white shadow-lg"
                : "text-gray-400 hover:bg-neutral-800/50"
            }`}
          >
            <FileText className="w-5 h-5" />
            Legal
          </button>

          <button
            onClick={() => setActiveCategory("Medical")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${
              activeCategory === "Medical"
                ? "bg-emerald-500 text-white shadow-lg"
                : "text-gray-400 hover:bg-neutral-800/50"
            }`}
          >
            <Stethoscope className="w-5 h-5" />
            Medical
          </button>

          <button
            onClick={() => setActiveCategory("Research")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${
              activeCategory === "Research"
                ? "bg-purple-500 text-white shadow-lg"
                : "text-gray-400 hover:bg-neutral-800/50"
            }`}
          >
            <FlaskConical className="w-5 h-5" />
            Research
          </button>

          <button
            onClick={() => setActiveCategory("Contract")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${
              activeCategory === "Contract"
                ? "bg-orange-500 text-white shadow-lg"
                : "text-gray-400 hover:bg-neutral-800/50"
            }`}
          >
            <FileSignature className="w-5 h-5" />
            Contract
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* LEGAL */}
          {activeCategory === "Legal" && (
            <Tabs defaultValue="upload">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white">Legal Documents</h2>
                  <p className="text-gray-400 text-sm mt-1">Document Intelligence</p>
                </div>

                <TabsList className="bg-neutral-900/80 backdrop-blur-sm border border-white/10 rounded-xl p-1">
                  <TabsTrigger 
                    value="upload" 
                    className="text-gray-400 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  >
                    Upload
                  </TabsTrigger>
                  <TabsTrigger 
                    value="Q8A" 
                    className="text-gray-400 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  >
                    Rapid Comprehension
                  </TabsTrigger>
                  <TabsTrigger 
                    value="Keypoints" 
                    className="text-gray-400 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  >
                    Risk Identification
                  </TabsTrigger>
                  <TabsTrigger 
                    value="Answers before you even think"
                    className="text-gray-400 data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  >
                    Q&A Generation
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="upload"><LegalComponent /></TabsContent>
              <TabsContent value="Q8A"><LegalComponent2 /></TabsContent>
              <TabsContent value="Keypoints"><LegalPoints /></TabsContent>
              <TabsContent value="Answers before you even think"><LegalDive /></TabsContent>
            </Tabs>
          )}

          {/* MEDICAL */}
          {activeCategory === "Medical" && (
            <Tabs defaultValue="upload">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white">Medical Documents</h2>
                  <p className="text-gray-400 text-sm mt-1">Document Intelligence</p>
                </div>
                <TabsList className="bg-neutral-900/80 backdrop-blur-sm border border-white/10 rounded-xl p-1">
                  <TabsTrigger 
                    value="upload" 
                    className="text-gray-400 data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  >
                    Upload
                  </TabsTrigger>
                  <TabsTrigger 
                    value="Q&A" 
                    className="text-gray-400 data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  >
                    Rapid Comprehension
                  </TabsTrigger>
                  <TabsTrigger 
                    value="Keypoints" 
                    className="text-gray-400 data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  >
                    Risk Identification
                  </TabsTrigger>
                  <TabsTrigger 
                    value="Answers before you even think"
                    className="text-gray-400 data-[state=active]:bg-emerald-500 data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  >
                    Q&A Generation
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="upload"><MedicalComponent /></TabsContent>
              <TabsContent value="Q&A"><MedicalComponent2 /></TabsContent>
              <TabsContent value="Keypoints"><MedicalPoints /></TabsContent>
              <TabsContent value="Answers before you even think"><MedicalDive /></TabsContent>
            </Tabs>
          )}

          {/* RESEARCH */}
          {activeCategory === "Research" && (
            <Tabs defaultValue="upload">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white">Research Papers</h2>
                  <p className="text-gray-400 text-sm mt-1">Document Intelligence</p>
                </div>
                <TabsList className="bg-neutral-900/80 backdrop-blur-sm border border-white/10 rounded-xl p-1">
                  <TabsTrigger 
                    value="upload"
                    className="text-gray-400 data-[state=active]:bg-purple-500 data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  >
                    Upload
                  </TabsTrigger>
                  <TabsTrigger 
                    value="Q&A" 
                    className="text-gray-400 data-[state=active]:bg-purple-500 data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  >
                    Rapid Comprehension
                  </TabsTrigger>
                  <TabsTrigger 
                    value="Keypoints" 
                    className="text-gray-400 data-[state=active]:bg-purple-500 data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  >
                    Risk Identification
                  </TabsTrigger>
                  <TabsTrigger 
                    value="Answers before you even think" 
                    className="text-gray-400 data-[state=active]:bg-purple-500 data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  >
                    Q&A Generation
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="upload"><ResearchComponent /></TabsContent>
              <TabsContent value="Q&A"><ResearchComponent2 /></TabsContent>
              <TabsContent value="Keypoints"><ResearchPoints /></TabsContent>
              <TabsContent value="Answers before you even think"><ResearchDive /></TabsContent>
            </Tabs>
          )}

          {/* CONTRACT */}
          {activeCategory === "Contract" && (
            <Tabs defaultValue="Q8A">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white">Contract Documents</h2>
                  <p className="text-gray-400 text-sm mt-1">Review and analyze business contracts</p>
                </div>
                <TabsList className="bg-neutral-900/80 backdrop-blur-sm border border-white/10 rounded-xl p-1">
                  <TabsTrigger 
                    value="upload" 
                    className="text-gray-400 data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  >
                    Upload
                  </TabsTrigger>
                  <TabsTrigger 
                    value="Q8A" 
                    className="text-gray-400 data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  >
                    Rapid Comrehension
                  </TabsTrigger>
                  <TabsTrigger 
                    value="Keypoints" 
                    className="text-gray-400 data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  >
                    Risk Identification
                  </TabsTrigger>
                  <TabsTrigger 
                    value="Answers before you even think" 
                    className="text-gray-400 data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg px-4 py-2 text-sm font-medium transition-all"
                  >
                    Q&A Generation
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="upload">
                <div className="p-8 border border-white/10 rounded-2xl bg-neutral-900/50 backdrop-blur-sm shadow-xl">
                  <h3 className="text-xl font-semibold text-white mb-2">Contract Upload</h3>
                  <p className="text-gray-400 text-sm">......coming soon</p>
                </div>
              </TabsContent>

              <TabsContent value="Q8A">
                <div className="p-8 border border-white/10 rounded-2xl bg-neutral-900/50 backdrop-blur-sm shadow-xl">
                  <h3 className="text-xl font-semibold text-white mb-2">Contract Q&A</h3>
                  <p className="text-gray-400 text-sm">......coming soon</p>
                </div>
              </TabsContent>

              <TabsContent value="Keypoints">
                <div className="p-8 border border-white/10 rounded-2xl bg-neutral-900/50 backdrop-blur-sm shadow-xl">
                  <h3 className="text-xl font-semibold text-white mb-2">Contract Key Points</h3>
                  <p className="text-gray-400 text-sm">......coming soon</p>
                </div>
              </TabsContent>

              <TabsContent value="Answers before you even think">
                <div className="p-8 border border-white/10 rounded-2xl bg-neutral-900/50 backdrop-blur-sm shadow-xl">
                  <h3 className="text-xl font-semibold text-white mb-2">Contract Q&A generation</h3>
                  <p className="text-gray-400 text-sm">......coming soon</p>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
}