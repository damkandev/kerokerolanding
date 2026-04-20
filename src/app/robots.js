export default function robots() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://keroke.ro";

    return {
        host: baseUrl,
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/"],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
