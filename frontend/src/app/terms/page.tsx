import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use — Gabriel Cruz",
  description: "The terms that govern your use of this website.",
};

export default function TermsOfUse() {
  return (
    <LegalPage title="Terms of Use" lastUpdated="June 10, 2026">
      <p>
        Welcome to the personal portfolio website of Gabriel Cruz (the &ldquo;Site&rdquo;). By
        accessing or using the Site, you agree to these Terms of Use. If you do not agree, please
        do not use the Site.
      </p>

      <h2>Use of the Site</h2>
      <p>
        The Site is provided for informational purposes to present Gabriel&apos;s professional
        background, skills, and experience. You may view and interact with the content for personal,
        non-commercial purposes. You agree not to misuse the Site, attempt to disrupt its operation,
        or access it in any way that violates applicable law.
      </p>

      <h2>The Chat Assistant</h2>
      <p>
        The &ldquo;Chat with Winston&rdquo; assistant generates responses automatically and is
        intended to answer general questions about Gabriel. Its responses may not always be accurate
        or complete and should not be relied upon as professional advice. Please do not submit
        sensitive personal information through the assistant.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        Unless otherwise noted, the content, design, and code of the Site are the property of
        Gabriel Cruz and are protected by applicable intellectual property laws. You may not
        reproduce or redistribute substantial portions of the Site without permission.
      </p>

      <h2>External Links</h2>
      <p>
        The Site may link to third-party websites, such as LinkedIn or GitHub. These sites are not
        controlled by Gabriel, and we are not responsible for their content or practices. Accessing
        them is at your own discretion.
      </p>

      <h2>Disclaimer</h2>
      <p>
        The Site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties
        of any kind, whether express or implied. We do not guarantee that the Site will be
        uninterrupted, error-free, or free of harmful components.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, Gabriel Cruz shall not be liable for any indirect,
        incidental, or consequential damages arising from your use of, or inability to use, the
        Site.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        These Terms may be updated from time to time. Continued use of the Site after changes are
        posted constitutes acceptance of the revised Terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms can be sent to{" "}
        <a href="mailto:gabriel.cruz.development@gmail.com">gabriel.cruz.development@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
