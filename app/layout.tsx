import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const sans = Manrope({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://luqbruno.github.io/vitalize-estetica-avancada/'),
  title: 'Vitalize Estética Avançada | Criciúma',
  description: 'Atendimento estético facial e corporal personalizado, com naturalidade, individualidade e propósito em Criciúma.',
  openGraph: {
    title: 'Vitalize Estética Avançada',
    description: 'Beleza que ainda parece sua. Atendimento personalizado em Criciúma.',
    type: 'website',
    locale: 'pt_BR',
    images: [{ url: 'https://luqbruno.github.io/vitalize-estetica-avancada/images/vitalize-social-card.png', width: 1732, height: 909, alt: 'Vitalize — Beleza que ainda parece sua.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vitalize Estética Avançada',
    description: 'Beleza que ainda parece sua.',
    images: ['https://luqbruno.github.io/vitalize-estetica-avancada/images/vitalize-social-card.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
