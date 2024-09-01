// ---
// import { type CollectionEntry, getCollection } from "astro:content";

// let businessTypes = [
//     {
//         Slug: "bakery",
//         Name: "Bakery"
//     },
//     {
//         Slug: "bar",
//         Name: "Bar"
//     }
//     ] ;

// const businesses: CollectionEntry<"businesses">[] = await getCollection("businesses");

// ---
import useEffect from "react";
import pagefind from "/pagefind/pagefind.js";

export default function SearchField() {
    console.log("loading search component");

    useEffect(async () => {
        const search = await pagefind.search("static");
        console.log(search);
    }, []);

    return (
        <div id="search" class="w-full">
            <div class="pagefind-ui pagefind-ui--reset">
                <form
                    class="pagefind-ui__form flex flex-col items-center gap-5"
                    role="search"
                    aria-label="Search this site"
                    action="javascript:void(0);"
                >
                    <input
                        class="pagefind-ui__search-input max-w-[60%] mx-auto border-b border-solid border-black text-black py-4 pr-[2px] text-[1.75rem] font-light bg-transparent leading-[100%]"
                        type="text"
                        placeholder="Search"
                        autocapitalize="none"
                        enterkeyhint="search"
                    />
                    <button class="pagefind-ui__search-clear hidden">
                        Clear
                    </button>
                    <div class="pagefind-ui__drawer flex-1">
                        <fieldset class="pagefind-ui__filter-panel">
                            <legend class="pagefind-ui__filter-panel-label hidden">
                                Filters
                            </legend>
                            <details class="pagefind-ui__filter-block" open="">
                                <summary class="pagefind-ui__filter-name hidden">
                                    Type
                                </summary>
                                <fieldset class="pagefind-ui__filter-group flex flex-wrap flex-row gap-2 justify-center max-w-[60%] mx-auto">
                                    <legend class="hidden">type</legend>
                                    {businessTypes.map((type) => (
                                        <div class="pagefind-ui__filter-value transition-transform duration-200 ease transform hover:scale-[1.08]">
                                            <input
                                                class="pagefind-ui__filter-checkbox hidden"
                                                type="checkbox"
                                                id={`type-${type.Slug}`}
                                                name="type"
                                                value={type.Slug}
                                            />
                                            <label
                                                class="pagefind-ui__filter-label font-serif border border-black cursor-pointer rounded-full px-2 py-1"
                                                for={`type-${type.Slug}`}
                                            >
                                                {type.Name}
                                            </label>
                                        </div>
                                    ))}
                                </fieldset>
                            </details>
                        </fieldset>
                        <div class="pagefind-ui__results-area flex flex-col items-center gap-5 py-10">
                            <p class="pagefind-ui__message">results for ___</p>
                            <ol class="pagefind-ui__results max-w-[1400px] grid grid-cols-2 lg:grid-cols-3 grid-rows-[1fr_auto_auto] gap-x-6">
                                {businesses.map((business) => (
                                    <li class="pagefind-ui__result grid grid-rows-[subgrid] row-span-3 transition-all duration-200 ease-in-out">
                                        <div class="pagefind-ui__result-thumb">
                                            <img
                                                class="pagefind-ui__result-image object-cover rounded-lg min-w-0 aspect-[3/2]"
                                                src={business.data.heroImage}
                                                alt="hero image"
                                            />
                                        </div>
                                        <div class="pagefind-ui__result-inner grid grid-rows-[subgrid] row-span-2">
                                            <h3 class="pagefind-ui__result-title pt-4 pb-2">
                                                <a
                                                    class="pagefind-ui__result-link"
                                                    href={`/businesses/${business.slug}/`}
                                                >
                                                    {business.data.title}
                                                </a>
                                            </h3>
                                            <p class="pagefind-ui__result-excerpt pb-5">
                                                {business.data.preview}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
