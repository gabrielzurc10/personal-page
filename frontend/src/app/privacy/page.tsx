import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Gabriel Cruz",
  description: "How this website handles your data.",
};

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="June 10, 2026">
      <p>
        This Privacy Policy explains how this personal portfolio website (the &ldquo;Site&rdquo;)
        handles information when you visit it. The Site is operated by Gabriel Cruz for the purpose
        of showcasing professional work and providing a way to get in touch.
      </p>

      <h2>Information We Collect</h2>
      <p>
        The Site is a static website and does not require you to create an account. We collect
        information only in the following cases:
      </p>
      <ul>
        <li>
          <strong>Chat messages: </strong> If you use the &ldquo;Chat with Winston&rdquo; assistant,
          the messages you send are processed to generate a response. Conversations are associated
          with a randomly generated session identifier so the assistant can maintain context during
          your visit.
        </li>
        <li>
          <strong>Contact requests: </strong> If you email or message Gabriel using the links on the
          Site, the contents of that message and your contact details are received directly by
          Gabriel.
        </li>
      </ul>

      <h2>How We Use Information</h2>
      <p>
        Chat messages are used solely to operate the assistant and respond to your questions about
        Gabriel&apos;s background. Contact information you choose to share is used only to respond to
        your inquiry. We do not sell your information or use it for advertising.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        The assistant feature sends your messages to a third-party AI provider (OpenAI) to generate
        responses. Their handling of that data is governed by their own privacy policy. The Site is
        hosted on Amazon Web Services (AWS), which may process standard technical data such as your
        IP address as part of delivering the content to your browser.
      </p>

      <h2>Cookies and Tracking</h2>
      <p>
        The Site does not use advertising or third-party tracking cookies. A theme preference
        (light or dark mode) and your chat session identifier may be stored locally in your browser
        to improve your experience. You can clear this at any time through your browser settings.
      </p>

      <h2>Data Retention</h2>
      <p>
        Chat session data is retained only as long as needed to operate and improve the assistant.
        You may request deletion of any data associated with your session by contacting Gabriel.
      </p>

      <h2>Your Choices</h2>
      <p>
        You are not required to use the chat assistant or to share any personal information to
        browse the Site. If you have questions about your data or wish to have it removed, please
        reach out using the contact details below.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        This policy may be updated from time to time. Any changes will be reflected on this page
        along with a revised &ldquo;Last updated&rdquo; date.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this Privacy Policy can be sent to{" "}
        <a href="mailto:gabriel.cruz.development@gmail.com">gabriel.cruz.development@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
