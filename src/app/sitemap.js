export default function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://keroke.ro";

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/servicios`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/sobre-nosotros`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contacto`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];
}
