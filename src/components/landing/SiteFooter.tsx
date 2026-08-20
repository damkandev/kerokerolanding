import { site } from "../../lib/site";

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-2 border-b border-kk-border px-6 py-6 text-[10.86px] text-kk-text/70 sm:flex-row sm:items-center sm:justify-between lg:px-[53px] lg:text-xs">
      <p>{site.legalName}</p>
      <div className="flex items-center gap-4">
        <a
          href={site.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-2 hover:text-kk-text hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-kk-focus"
        >
          LinkedIn
        </a>
        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-2 hover:text-kk-text hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-kk-focus"
        >
          Instagram
        </a>
      </div>
    </footer>
  );
}
