import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "../../components/shared/page-header";
import { createPageMetadata } from "../../lib/site";
import { personalData } from "../../data/personal";

export const metadata: Metadata = createPageMetadata({
  title: `Privacy Policy | ${personalData.name}`,
  description: `Privacy policy for ${personalData.name}'s portfolio website.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  const lastUpdated = "August 2026";

  return (
    <div className="pb-20">
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description={`How this portfolio handles information. Last updated: ${lastUpdated}.`}
      />

      <div className="mx-auto max-w-3xl px-6 md:px-8 prose prose-neutral dark:prose-invert prose-sm sm:prose-base max-w-none">
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-foreground/85 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-8 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
          <section>
            <h2>Overview</h2>
            <p>
              This website is the personal portfolio of {personalData.name}. It
              is hosted on Vercel and is intended to share professional
              information, projects, and a way to get in touch. This policy
              describes what data may be processed when you use the site.
            </p>
          </section>

          <section>
            <h2>Information you provide</h2>
            <p>
              If you use the contact form, you may submit your name, email
              address, subject, and message. This information is used only to
              deliver your message by email. The portfolio does{" "}
              <strong>not</strong> store contact form submissions in a database.
            </p>
          </section>

          <section>
            <h2>Email delivery (Resend)</h2>
            <p>
              Contact form messages are sent through{" "}
              <a
                href="https://resend.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Resend
              </a>
              , a third-party email service. Resend processes the message on
              behalf of this site so it can be delivered to{" "}
              {personalData.email}. Resend&apos;s own privacy practices apply to
              their processing.
            </p>
          </section>

          <section>
            <h2>Spam protection (Cloudflare Turnstile)</h2>
            <p>
              The contact form may use{" "}
              <a
                href="https://www.cloudflare.com/products/turnstile/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Cloudflare Turnstile
              </a>{" "}
              to help prevent automated abuse. Turnstile may collect technical
              signals (such as browser and interaction data) to distinguish
              legitimate users from bots. Cloudflare&apos;s privacy policy
              applies to that processing.
            </p>
          </section>

          <section>
            <h2>Analytics</h2>
            <p>
              This site may use{" "}
              <a
                href="https://vercel.com/docs/analytics"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Vercel Analytics
              </a>{" "}
              to understand aggregate page views and performance. Vercel
              Analytics is designed to be privacy-friendly and does not use
              cookies for tracking in the same way as many ad networks. No
              invasive third-party advertising trackers are intentionally added
              by this portfolio.
            </p>
          </section>

          <section>
            <h2>Third-party content and links</h2>
            <p>
              The site links to external profiles and services (for example
              GitHub, LinkedIn, and LeetCode) and may display public data from
              GitHub and LeetCode APIs. Those services have their own privacy
              policies. Live GitHub and LeetCode statistics are fetched
              server-side and cached for approximately one hour.
            </p>
          </section>

          <section>
            <h2>Technical information</h2>
            <p>
              Like most websites, the hosting provider (Vercel) and any
              connected services may automatically process standard technical
              information such as IP address, request timestamps, and browser
              type in server logs for security and reliability.
            </p>
          </section>

          <section>
            <h2>Data retention</h2>
            <p>
              Contact form content is not persisted by this application after
              email delivery. Email copies may exist in the recipient mailbox
              according to normal email retention practices.
            </p>
          </section>

          <section>
            <h2>Your choices</h2>
            <p>
              You can contact {personalData.name} directly by email at{" "}
              <a
                href={`mailto:${personalData.email}`}
                className="text-primary hover:underline"
              >
                {personalData.email}
              </a>{" "}
              instead of using the contact form.
            </p>
          </section>

          <section>
            <h2>Changes</h2>
            <p>
              This policy may be updated if the site&apos;s features change.
              Material updates will be reflected on this page.
            </p>
          </section>

          <p className="text-muted-foreground text-sm pt-4 border-t border-border">
            <Link href="/contact" className="text-primary hover:underline">
              Contact
            </Link>
            {" · "}
            <Link href="/" className="text-primary hover:underline">
              Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
