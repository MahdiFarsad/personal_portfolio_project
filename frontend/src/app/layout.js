import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata = {
  metadataBase: new URL("https://mahdifarsad.com"), 
  title: {
    default: "Your Name - ML & Full-Stack Portfolio",
    template: "%s | Your Name",
  },
  description:
    "Machine learning, deep learning, data science, and full-stack projects.",
  openGraph: {
    title: "Your Name - ML & Full-Stack Portfolio",
    description:
      "Machine learning, deep learning, data science, and full-stack projects.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name - ML & Full-Stack Portfolio",
    description:
      "Machine learning, deep learning, data science, and full-stack projects.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} bg-ink text-[#EDEFF2] font-body antialiased`}
      >
        <Nav />
        {children}
      </body>
    </html>
  );
}
