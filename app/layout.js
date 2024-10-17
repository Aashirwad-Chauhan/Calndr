import { Inter } from 'next/font/google';
import "./globals.css";
import Header from '@/components/header';
import { ClerkProvider } from '@clerk/nextjs';
import CreateEventDrawer from '@/components/create-event';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const metadata = {
  title: "Calndr",
  description: "Meeting Scheduling App.",
}

export const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />

          <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {children}
          </main>

          <footer className="bg-green-100 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <div className="flex justify-center space-x-6 mb-4">
                <a href="https://github.com/aashirwad-chauhan" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">
                  <FaGithub size={24} />
                </a>
                <a href="https://linkedin.com/in/aashirwad-chauhan" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">
                  <FaLinkedin size={24} />
                </a>
                <a href="https://twitter.com/aashirwad_25" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-gray-600">
                  <FaTwitter size={24} />
                </a>
              </div>
              <p>Made with ❤️ by Aashirwad Chauhan</p>
              <p className="mt-2 text-sm">&copy; {new Date().getFullYear()} Calndr. All rights reserved.</p>
            </div>
          </footer>

          <CreateEventDrawer />
        </body>
      </html>
    </ClerkProvider>
  );
}
