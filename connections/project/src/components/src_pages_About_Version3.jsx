import React from "react";
import ReactMarkdown from "react-markdown";
import lore from "../content/MultiVinVerse-VinLore.md?raw"; // Using Vite/webpack raw import

export default function About() {
  return (
    <div className="about-page">
      <ReactMarkdown>{lore}</ReactMarkdown>
    </div>
  );
}