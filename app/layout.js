export const metadata = {
  title: "Clube Exclusivo",
  description: "Acesso privado ao grupo"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
