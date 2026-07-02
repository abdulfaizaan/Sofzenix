import { ContactCtaStage, type ContactCtaStageProps } from "./ContactCtaStage";

const DEFAULT_PROPS: ContactCtaStageProps = {
  headline: ["Start", "a project."],
  accentIndex: 1,
  subline:
    "Tell us what you're building. We'll come back inside one business day with a senior team and a sharp first question.",
  primaryCtaLabel: "Start a project",
  primaryCtaHref: "/contact",
  secondaryCtaLabel: "Email us",
  secondaryCtaHref: "mailto:hello@sofzenix.com",
};

/**
 * Public Contact CTA widget.
 * Defaults match the home-page call to action; callers may override any field.
 */
export function ContactCta(props: Partial<ContactCtaStageProps> = {}): JSX.Element {
  return <ContactCtaStage {...DEFAULT_PROPS} {...props} />;
}