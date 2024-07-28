import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionFAQ() {

    return (<Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
            <AccordionTrigger>Who are you & why are you doing this?</AccordionTrigger>
            <AccordionContent>
                <p>
                    Hi! We're Dan & Sam. After studying in Sheffield we’ve
                    now made a life here working in website development and
                    marketing. We're not business men, just local guys with
                    a passion for supporting local and building community.
                    We met at The Well Church on Ecclesall Rd over 5 years
                    ago as students and now live in a house with 3 others in
                    Sharrow.
                </p>
                <p>
                    We truly believe Sharrow Vale is unique and has the
                    potential to thrive as <em>the</em> hub for independent shops
                    and eateries in Sheffield. We think that this directory could
                    kick start this process by providing a modern, hassle-free
                    way for people to access and discover more about the Vale.
                </p>
                <p>
                    We don't have thousands of pounds behind us or years of
                    experience but we do know how to build websites that
                    connect with communities and we want to use that skill
                    to help others.
                </p>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
            <AccordionTrigger>Who is the directory for?</AccordionTrigger>
            <AccordionContent>
                <p>
                    The directory is for small shops in and around Sharrow
                    Vale Road. It isn't limited exclusively to Sharrow Vale
                    Road because we recognise that the community of shop
                    owners extends beyond that. To us a small business is
                    one that operates on a small scale and is able to offer
                    a personal localised service to its customers.
                </p>
                <p>
                    Currently the directory is focused on businesses with a
                    public premise but we are considering ways we could
                    utilise it as a community hub, listing local services
                    such as plumbers & photographers.
                </p>
                <p>
                    We also would love to develop the site's ability to
                    promote local events.
                </p>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
            <AccordionTrigger>What do I get for my subscription?</AccordionTrigger>
            <AccordionContent>
                <p>
                    Your subscription grants you a listing on the directory.
                    This includes a personal page where you can show who you
                    are, what you do. We’ll make sure your listing has the
                    correct tags and information to maximise your SEO,
                    updating you every few months (or on request) on the
                    performance and analytics of your page, so you can
                    measure the value your listing brings.
                </p>
                <p>
                    The cost also covers the cost of promoting and running
                    the site through printing flyers, writing articles,
                    posting on Instagram, doing in-person promotion, and
                    site administration.
                </p>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
            <AccordionTrigger>How do Payments work?</AccordionTrigger>
            <AccordionContent>
                <p>
                    The subscription is paid monthly via direct debit. We
                    use a system called GoCardless which makes it easy to
                    view and manage your subscription. There are no fees for
                    signing up, editing your content or cancelling.
                </p>
            </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
            <AccordionTrigger>What support is there?</AccordionTrigger>
            <AccordionContent>
                <p>
                    You'll be able to contact us over email any time should
                    an issue arise and we'll be around locally to assist you
                    with any help you need with your listing.
                </p>
            </AccordionContent>
        </AccordionItem>

    </Accordion>
    )
}
