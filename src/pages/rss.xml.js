import { SITE_DESCRIPTION, SITE_TITLE } from "@/consts";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
    const articles = await getCollection("articles");

    const sortedArticles = articles.sort(
        (a, b) =>
            new Date(b.data.publishDate).getTime() -
            new Date(a.data.publishDate).getTime()
    );
    return rss({
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        site: context.site,
        items: sortedArticles.map((article) => ({
            title: article.data.name,
            pubDate: article.data.publishDate,
            description: article.data.description,
            link: `/articles/${article.id}/`,
        })),
    });
}
