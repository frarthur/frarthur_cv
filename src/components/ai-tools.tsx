"use client";

import { useState } from "react";
import { ChatGptIcon, ClaudeIcon, CopyIcon } from "./icons";

interface AiToolsProps {
  readonly markdownContent: string;
}

export default function AiTools({ markdownContent }: AiToolsProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  const chatGptUrl = `https://chatgpt.com/?hint=search&q=${encodeURIComponent(markdownContent)}`;
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(markdownContent)}`;

  return (
    <div className="ai-tools-float">
      <button className="ai-tools-btn" onClick={handleCopy}>
        <CopyIcon />
        {copied ? "Copied!" : "Copy as Markdown"}
      </button>
      <a href={chatGptUrl} target="_blank" rel="noreferrer noopener" className="ai-tools-btn">
        <ChatGptIcon />
        Ask ChatGPT
      </a>
      <a href={claudeUrl} target="_blank" rel="noreferrer noopener" className="ai-tools-btn">
        <ClaudeIcon />
        Ask Claude
      </a>
    </div>
  );
}
