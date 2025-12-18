export const siteConfig = {
  name: "Local Premium Elite",
  description: "Premium subscription-based platform with elite features",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com",
    github: "https://github.com",
  },
  creator: "Local Premium Elite Team",
  keywords: [
    "premium",
    "elite",
    "subscription",
    "saas",
    "nextjs",
    "react",
    "typescript",
  ],
}

export type SiteConfig = typeof siteConfig
