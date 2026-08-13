import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "../shared/section-header";
import CertificateCard from "../certificates/certificate-card";
import { certificatesData } from "../../data/certificates";

export default function CertificatesPreview() {
  if (!certificatesData.length) return null;

  return (
    <section
      id="certificates"
      className="py-14 md:py-16 px-6 md:px-8 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <SectionHeader
            eyebrow="Certificates"
            title="Recognitions"
            className="mb-0"
          />
          <Link
            href="/certificates"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors self-start sm:self-end focus-visible:outline-2 focus-visible:outline-primary rounded"
          >
            View Certificates
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certificatesData.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}
