import type { Metadata } from "next";
import PageHeader from "../../components/shared/page-header";
import ContactInfo from "../../components/contact/contact-info";
import ContactForm from "../../components/contact/contact-form";
import { createPageMetadata } from "../../lib/site";
import { personalData } from "../../data/personal";

export const metadata: Metadata = createPageMetadata({
  title: `Contact | ${personalData.name}`,
  description: `Contact ${personalData.name} — projects, opportunities, and questions welcome.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Contact"
        title="Get in Touch"
        description="Open to internships, collaborations, and learning opportunities."
      />

      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
