import "@/styles/themes.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body className="bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
