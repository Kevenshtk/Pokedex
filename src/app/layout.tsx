import type { Metadata } from 'next';
import { PokemonContextProvider } from './context/pokemon';
import './globals.css';

export const metadata: Metadata = {
  title: "Pokédex | Lista de Pokémon",
  description: "Veja todos os Pokémon, tipos, stats e habilidades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <PokemonContextProvider>{children}</PokemonContextProvider>
      </body>
    </html>
  );
}
