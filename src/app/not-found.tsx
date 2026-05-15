"use client";

import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function GlitchText({ children }: { children: string }) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset(Math.random() * 4 - 2);
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block">
      <span
        className="absolute top-0 left-0 text-[#00FF9D] opacity-70"
        style={{ transform: `translate(${offset}px, ${-offset}px)` }}
        aria-hidden="true"
      >
        {children}
      </span>
      <span
        className="absolute top-0 left-0 text-[#00A3FF] opacity-70"
        style={{ transform: `translate(${-offset}px, ${offset}px)` }}
        aria-hidden="true"
      >
        {children}
      </span>
      <span className="relative text-white">{children}</span>
    </span>
  );
}

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#0A0C10] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,157,0.05)_0%,transparent_50%)]" />

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <GlitchText>404</GlitchText>
        </motion.div>

        <motion.p
          className="text-xl sm:text-2xl text-gray-400 mt-4 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Page not found
        </motion.p>

        <motion.p
          className="text-sm text-gray-600 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          The page you are looking for does not exist or has been moved.
          Let us get you back on track.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            className="bg-[#00FF9D] text-black hover:bg-[#00FF9D]/80 font-semibold px-8 rounded-xl group"
            onClick={() => (window.location.href = "/")}
          >
            <Home className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
            Back to Home
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 px-8 rounded-xl"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Go Back
          </Button>
        </motion.div>

        <motion.div
          className="mt-16 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="rounded-xl border border-white/10 bg-[#0D1117] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
              <span className="ml-2 text-xs text-gray-500 font-mono">terminal</span>
            </div>
            <div className="p-4 font-mono text-sm text-left">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="text-[#00FF9D]">$</span>{" "}
                <span className="text-gray-400">curl -I this-page</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <span className="text-[#FF6B6B]">HTTP/1.1 404 Not Found</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <span className="text-[#00FF9D]">$</span>{" "}
                <span className="text-gray-400">echo &quot;Let us go home instead&quot;</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
