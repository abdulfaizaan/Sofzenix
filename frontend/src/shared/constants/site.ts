/**
 * Site-wide configuration.
 * Single source of truth for metadata, social, contact.
 */
export const SITE = {
  name: "SOFZENIX IT Solutions LLP",
  shortName: "SOFZENIX",
  description:
    "SOFZENIX engineers premium digital products — web, mobile, and cloud — for ambitious companies worldwide.",
  url: "https://sofzenix.com",
  ogImage: "/og.png",
  locale: "en-US",
  email: "hello@sofzenix.com",
  phone: "+91 98765 43210",
  address: {
    city: "Andhra Pradesh",
    country: "India",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/sofzenix",
    twitter: "https://twitter.com/sofzenix",
    github: "https://github.com/sofzenix",
    instagram: "https://instagram.com/sofzenix",
  },
} as const;

export type SiteConfig = typeof SITE;