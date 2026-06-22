
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
   <h1>Chai/Book/Layout.tsx page</h1>
   {children}
   </>
  );
}
