import RealizacjeClient from "./RealizacjeClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: 'korekta-lakieru' },
    { slug: 'powloki-ceramiczne' },
    { slug: 'serwis-premium' },
    { slug: 'detailing-wnetrza' },
    { slug: 'folie-ochronne' },
  ];
}

export default async function Realizacje({ params }: PageProps) {
  const resolvedParams = await params;
  return <RealizacjeClient slug={resolvedParams.slug} />;
}
