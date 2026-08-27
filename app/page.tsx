import VitalizeExperience from './vitalize-experience';

const whatsapp = 'https://bit.ly/AtendimentoExclusivoVitalize';

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: 'Vitalize Estética Avançada',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rua Cel. Pedro Benedet, 505, sala 503',
      addressLocality: 'Criciúma',
      addressRegion: 'SC',
      postalCode: '88801-250',
      addressCountry: 'BR',
    },
    sameAs: ['https://www.instagram.com/esteticavitalize/'],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <VitalizeExperience whatsapp={whatsapp} />
    </>
  );
}
