import { buildPersonJsonLd, buildWebsiteJsonLd } from "../../lib/structured-data";

export default function JsonLdScripts() {
  const person = buildPersonJsonLd();
  const website = buildWebsiteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      {website && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
        />
      )}
    </>
  );
}
