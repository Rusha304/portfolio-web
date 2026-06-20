import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rushamistry.dev"),
  title: "Rusha Bhavesh Mistry — Software Engineer",
  description:
    "Software engineer with 1+ year of production experience building Python backends, REST APIs, and AI-powered applications. M.S. Computer Science at CSULB (GPA 3.7).",
  keywords: [
    "Rusha Mistry",
    "Software Engineer",
    "Python",
    "LLM",
    "RAG",
    "FastAPI",
    "CSULB",
    "Portfolio",
  ],
  authors: [{ name: "Rusha Bhavesh Mistry" }],
  openGraph: {
    title: "Rusha Bhavesh Mistry — Software Engineer",
    description:
      "Software engineer building Python backends, REST APIs, and AI-powered applications. Pursuing M.S. Computer Science at CSULB.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
