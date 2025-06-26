import React from "react";
import "../styles/colors.css";

export default function MultiVinVerseThemeProvider({ children }) {
  return (
    <div style={{
      background: "var(--background-main)",
      minHeight: "100vh",
      color: "var(--primary-text)"
    }}>
      {children}
    </div>
  );
}