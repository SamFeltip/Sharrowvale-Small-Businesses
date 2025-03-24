import { SITE_DESCRIPTION, SITE_TITLE } from "@/consts";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
    const articles = await getCollection("articles");
    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: context.site,
        items: articles.map((article) => ({
            title: article.data.name,
            pubDate: article.data.publishDate,
            description: article.data.description,
            link: `/articles/${article.id}/`,
        })),
    });
}
