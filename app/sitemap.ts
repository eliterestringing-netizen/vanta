import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const pages=["","/domains","/hosting","/ssl","/email","/pricing","/support"]; return pages.map(path=>({url:`https://vanta.example${path}`,lastModified:new Date(),changeFrequency:"weekly",priority:path===""?1:.7})); }
