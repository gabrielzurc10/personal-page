"use client";

import Image from "next/image";
import { askWinston } from "@/lib/winston";

const PROMPTS = [
  "What did Gabriel build at Paycom?",
  "Which languages has he used in production?",
  "Summarize his work experience",
  "Is he open to relocating?",
];

/**
 * "Ask Winston" prompt chips. Clicking one opens the chat and sends the
 * question straight away so a visitor sees a live answer within seconds.
 */
export default function WinstonPrompts({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="mb-3 flex items-center justify-center gap-2.5 md:justify-start">
        <Image
          src="/winstonProfile.png"
          alt="Winston"
          width={28}
          height={28}
          className="h-7 w-7 rounded-full"
        />
        <p className="text-sm text-base-content/70">
          <span className="font-semibold text-base-content">Ask Winston</span>, my AI assistant
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => askWinston(prompt)}
            className="btn btn-sm h-9 rounded-full border-base-300 bg-base-100 px-4 font-normal text-base-content/80 shadow-none transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-base-100 hover:text-base-content hover:shadow-md dark:bg-base-200 dark:hover:bg-base-200"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
