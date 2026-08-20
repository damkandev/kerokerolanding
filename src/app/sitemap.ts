import type { MetadataRoute } from "next";
import { site } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/sobre-nosotros`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${site.url}/blog`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/blog/afuera-no-adentro`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${site.url}/case-studies/segui`,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${site.url}/case-studies/rodar`,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
