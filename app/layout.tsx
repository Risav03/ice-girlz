import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/utils/providers";
import { Slide, ToastContainer } from "react-toastify";


const geistSans = localFont({
  src: "./fonts/roboto.ttf",
  weight: "100 900",
});
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });


export const metadata: Metadata = {
  title: "Ice dApps",
  description: "Presenting the Ice dApps, your one-stop dApp to earn and use $FROST!",
  openGraph: {
    title: "Ice dApps",
    description: "Presenting the Ice dApps, your one-stop dApp to earn and use $FROST!",
    url: 'https://ice-girlz.vercel.app/',
    siteName: 'Ice dApps',
    images: [
      {
        url: 'https://ice-girlz.vercel.app/og.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://ice-girlz.vercel.app/og.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
      },
    ]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} antialiased`}
      >
        <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover
              theme="light"
              transition={Slide}
            />
        <Providers>

          {children}
        </Providers>
      </body>
    </html>
  );
}
