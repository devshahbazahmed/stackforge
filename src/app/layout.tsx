import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../context/theme";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const space_grotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StackForge",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${inter.variable} ${space_grotesk.variable} bg-dark-100 text-light-900 h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
