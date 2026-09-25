import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const pages=["","/domains","/pricing","/support"]; return pages.map(path=>({url:`https://luckydomains.com.au${path}`,lastModified:new Date(),changeFrequency:"weekly",priority:path===""?1:.7})); }
