import type { Metadata } from "next";
import "./globals.css";
import Cursor from "@/components/custom/Cursor";

export const metadata: Metadata = {
  title: "Oryn",
  description: "Oryn Application",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
<html lang="en">
      <body>
        {children}
        <Cursor />
      </body>
    </html>
  );
}