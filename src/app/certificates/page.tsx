import type { Metadata } from "next";
import PageHeader from "../../components/shared/page-header";
import CertificateCard from "../../components/certificates/certificate-card";
import { certificatesData } from "../../data/certificates";
import { createPageMetadata } from "../../lib/site";
import { personalData } from "../../data/personal";

export const metadata: Metadata = createPageMetadata({
  title: `Certificates | ${personalData.name}`,
  description: `Certifications earned by ${personalData.name}.`,
  path: "/certificates",
});

export default function CertificatesPage() {
  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Certificates"
        title="Certificates"
        description="Verified certifications from academic and professional learning."
      />

      <div className="mx-auto max-w-3xl px-6 md:px-8">
        <ul className="flex flex-col gap-4" aria-label="Certificate list">
          {certificatesData.map((cert) => (
            <li key={cert.id}>
              <CertificateCard certificate={cert} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
