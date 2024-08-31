import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export function SignupForm({ url }: { url: string }) {
    return (
        <form action="https://api.web3forms.com/submit" method="POST">
            {/* Replace with your Access Key */}
            <Input
                type="hidden"
                name="access_key"
                className="border-slate-300 rounded"
                value="3a1a61c3-7ce8-4b30-830e-958c73c75598"
            />

            <div>
                <Label className="text-coral" htmlFor="business-name">
                    Business Name
                </Label>
                <Input
                    id="business-name"
                    type="text"
                    name="Business Name"
                    className="border-slate-300 rounded"
                    required
                />
            </div>

            <div>
                <Label className="text-coral" htmlFor="contact-name">
                    Contact Name
                </Label>
                <Input
                    id="contact-name"
                    type="text"
                    name="Contact Name"
                    required
                    className="border-slate-300 rounded"
                />
            </div>

            <div>
                <Label className="text-coral" htmlFor="contact-email">
                    Contact Email
                </Label>
                <Input
                    id="contact-email"
                    type="email"
                    name="Contact Email"
                    className="border-slate-300 rounded"
                    required
                />
            </div>

            <div>
                <Label className="text-coral " htmlFor="comments">
                    Comments
                </Label>
                <Input
                    id="comments"
                    type="text"
                    name="Comments"
                    className="text-coral border-slate-300 rounded"
                />
            </div>

            {/* Honeypot Spam Protection */}
            <Input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: "none" }}
            />

            {/* TODO: Redirect to correct page */}
            <input type="hidden" name="redirect" value={`${url}/about`} />

            <Button
                className="font-merriweather my-4 rounded-full px-12 py-6 bg-coral hover:bg-black text-white"
                type="submit"
            >
                Submit
            </Button>
        </form>
    );
}
