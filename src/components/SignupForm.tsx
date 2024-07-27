import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"

export function SignupForm({ url }: { url: string }) {

    return (
        <form action="https://api.web3forms.com/submit" method="POST">
            {/* Replace with your Access Key */}
            <Input type="hidden" name="access_key" value="3a1a61c3-7ce8-4b30-830e-958c73c75598" />

            <div>
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" type="text" name="Business Name" required />
            </div>

            <div>
                <Label htmlFor="contact-name">Contact Name</Label>
                <Input id="contact-name" type="text" name="Contact Name" required />
            </div>

            <div>
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" name="Contact Email" required />
            </div>

            <div>
                <Label htmlFor="comments">Comments</Label>
                <Input id="comments" type="text" name="Comments" />
            </div>

            {/* Honeypot Spam Protection */}
            <Input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

            {/* TODO: Redirect to correct page */}
            <input type="hidden" name="redirect" value={`${url}/about`} />

            <Button variant="outline" type="submit">
                Submit Form
            </Button>
        </form>
    );
}
