import { pageMeta } from "@/lib/seo";
import { Placeholder } from "@/components/ui/Placeholder";

export const metadata = pageMeta({
  title: "Paying Out of Pocket",
  description:
    "Not covered by a warranty? Metro TV & Appliances repairs appliances, TVs, audio gear and commercial microwaves with original manufacturer parts — written estimate before any work.",
  path: "/cod",
});

export default function CodPage() {
  return (
    <Placeholder
      eyebrow="Paying out of pocket"
      title="No coverage? We'll still get it fixed."
      body="A fuller breakdown of out-of-pocket repair is on the way. In the meantime: you always get a written estimate before any work begins, repairs are done with original manufacturer parts, and the diagnostic fee applies toward the repair when you proceed. Call and we'll walk you through it."
    />
  );
}
