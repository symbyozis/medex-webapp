import { GetServerSideProps } from "next";

// TODO: обновить когда будет подключён продакшн-домен
const SITE_URL = "https://medex-22115.web.app";

const pages = [
  { url: "/", priority: "1.0", changefreq: "weekly" },
  { url: "/about", priority: "0.8", changefreq: "monthly" },
  { url: "/services", priority: "0.9", changefreq: "monthly" },
  { url: "/doctors", priority: "0.8", changefreq: "monthly" },
  { url: "/call-doctor", priority: "0.9", changefreq: "monthly" },
  { url: "/contacts", priority: "0.7", changefreq: "monthly" },
];

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    ({ url, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${url}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default function Sitemap() {
  return null;
}
