import { buildMetadata } from "@/lib/metadata";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "TV Troubleshooting Guide — Black Screen, Lines, Sound, Smart TV Issues",
  description:
    "Fix TV no picture, black screen, lines on screen, sound problems, and smart TV issues. Brand-specific guides for Samsung, LG, Sony, Hisense, Vizio, and TCL. Expert TV repair in Lincoln NE.",
  path: "/troubleshooting/tv",
  keywords: [
    "TV troubleshooting Lincoln NE",
    "TV no picture",
    "TV black screen fix",
    "TV lines on screen",
    "Samsung TV troubleshooting",
    "TV backlight failure",
    "TV won't turn on",
  ],
});

const noPictureItems = [
  {
    question: "No Standby Light — Power Delivery Check",
    answer:
      "If there is no standby light at all, the TV may not be receiving power. Try a different outlet. Check that the power cable is firmly seated. If using a power strip or surge protector, try plugging directly into a wall outlet. If the standby light is on but the TV won't respond, try holding the physical power button on the TV itself (not the remote) for 10 seconds.",
  },
  {
    question: "Black Screen? Verify Active Input Source First",
    answer:
      "Your TV may be on the wrong input. Press the Input or Source button on your remote and cycle through the available inputs (HDMI 1, HDMI 2, etc.). Make sure the TV is set to the HDMI port where your device is connected. This is one of the most common 'no picture' issues.",
  },
  {
    question: "HDMI Signal Failure — Cable and Port Isolation",
    answer:
      "Unplug and re-seat your HDMI cable at both ends. HDMI connections can work loose over time, especially on wall-mounted TVs. Try a different HDMI cable and a different HDMI port on the TV. A bad cable or failed HDMI port can cause a black screen with no error message.",
  },
  {
    question: "The Flashlight Test — Backlight Array Failure Diagnosis",
    answer:
      "The single most useful diagnostic you can do at home. Turn the TV on in a dark room. Shine a flashlight directly against the screen at close distance. If you can see a faint, dim image, your backlight has failed. The TV is producing a picture, but the LEDs that illuminate the screen are no longer working. This is a hardware failure that requires professional repair.",
  },
];

const screenItems = [
  {
    question: "Horizontal or Vertical Lines — T-Con or Panel Ribbon Fault",
    answer:
      "Horizontal lines typically indicate a failing T-Con (timing control) board — a common, cost-effective repair. Vertical lines are often caused by a failing display panel or loose ribbon cable connections between the T-Con board and the panel. If lines appear on all inputs and persist after a power cycle, the issue is hardware-related.",
  },
  {
    question: "Dark Zones — LED Backlight Array Failure",
    answer:
      "Dark spots or shadowy patches are usually caused by individual backlight LEDs that have failed. Modern TVs use strips of LEDs behind the display panel to illuminate the picture. When one or more LEDs fail, that area goes dark. We replace the failed LED strips. Dark spots can also indicate panel damage from impact or pressure.",
  },
  {
    question: "Color Shift or Tint Errors — Panel Calibration and T-Con Check",
    answer:
      "Check your picture settings first. Go to Settings > Picture and try resetting to the default picture mode. Someone may have changed the color temperature, tint, or saturation. If adjusting settings doesn't help, try a factory reset. Persistent color issues after a reset typically indicate a T-Con board or panel problem.",
  },
  {
    question: "Screen Flickering — Backlight Driver or Power Supply Fault",
    answer:
      "Flickering can be caused by a failing backlight driver circuit, a loose internal cable, or a power supply board issue. Try changing the backlight or brightness setting — some TVs flicker at maximum backlight. Check if energy-saving or eco modes are enabled. If flickering persists across all settings, the issue is hardware-related.",
  },
  {
    question: "Cracked Panel — Honest Cost-Benefit Assessment",
    answer:
      "A cracked display panel is almost never worth repairing. The cost of a replacement panel for a 55-inch TV can run $400-$800, while a comparable new TV may cost $300-$500. We provide honest cost-benefit advice — if replacement makes more financial sense, we will tell you.",
  },
];

const soundItems = [
  {
    question: "Complete Audio Loss — Output Routing and Speaker Check",
    answer:
      "Check the obvious: is the TV muted? Check the volume level. Then check the audio output setting — go to Settings > Sound > Sound Output. If it's set to an external device (HDMI ARC, optical, Bluetooth), the internal speakers are disabled. Switch back to 'TV Speakers.' The TV may have automatically switched output when a soundbar was connected.",
  },
  {
    question: "Distortion or Crackling — Speaker Driver and Amp Circuit",
    answer:
      "Distorted, crackling, or buzzing audio usually points to speaker damage or loose internal connections. Try lowering the volume — if distortion goes away at low volume but returns at higher volume, the speaker is likely damaged. A blown speaker is a straightforward repair.",
  },
  {
    question: "AV Sync Drift — Audio Delay and HDMI ARC Latency",
    answer:
      "If audio doesn't match the video, check the audio sync or audio delay setting in your TV's sound menu. If using HDMI ARC for a soundbar, make sure the TV's output is set to 'HDMI ARC.' Verify soundbar firmware is up to date. Audio sync issues are usually settings-related, not hardware failures.",
  },
  {
    question: "Single-Channel Audio Loss — Balance and Speaker Check",
    answer:
      "If audio only comes from one speaker, check the audio balance setting in the sound menu — the slider may have been accidentally moved. Reset it to center. If balance is centered and sound still comes from one side, one of the TV's internal speakers has likely failed.",
  },
];

const smartTvItems = [
  {
    question: "WiFi Dropout or No Connection — Module and Network Check",
    answer:
      "Restart both your TV and router. On the TV, go to Settings > Network, forget the WiFi network, and reconnect. Make sure the TV is within range of the router. Try a wired ethernet connection to rule out WiFi-specific problems. If wired works but WiFi does not, the TV's integrated WiFi transceiver module may have failed.",
  },
  {
    question: "App Crashes or Smart Hub Failure — Firmware and Cache",
    answer:
      "Check for a firmware update: Settings > Support > Software Update. Try clearing the cache for the crashing app. Uninstall and reinstall the app if clearing cache doesn't help. As a last resort, perform a factory reset — this erases all settings and apps.",
  },
  {
    question: "Streaming Buffering or Poor Quality",
    answer:
      "Buffering is almost always an internet speed issue, not a TV issue. Most streaming services need at least 5 Mbps for HD and 25 Mbps for 4K. Test your speed using the TV's browser. Try a wired ethernet connection instead of WiFi. Check how many other devices are using your network.",
  },
  {
    question: "Remote Not Working",
    answer:
      "Start with fresh batteries. If your remote uses Bluetooth, you may need to re-pair it with the TV. Try using the physical buttons on the TV to verify the TV is functional. Check your TV brand's pairing instructions.",
  },
];

const samsungItems = [
  {
    question: "Standby Light Blinking — Blink Code Fault Reference",
    answer:
      "Samsung uses blink codes to indicate specific errors: 2 blinks often indicates a power supply issue, 3 blinks a main board communication error, 5 blinks a main board failure, 6 blinks a backlight failure, and rapid blinking a firmware issue. Unplug for a full 60 seconds, then plug back in. If the pattern continues, professional diagnosis is required.",
  },
  {
    question: "Boot Loop on Samsung Logo — Firmware or Main Board",
    answer:
      "If your Samsung TV displays the logo, turns off, and restarts in an endless loop, unplug the TV, hold the power button on the TV (not remote) for 30 seconds while unplugged, release, and plug back in. If the boot loop continues, the TV may need a firmware reflash or main board replacement. As a Samsung Established ASC, we have the tools to reflash firmware directly.",
  },
  {
    question: "Smart Hub Frozen or Not Loading — Cache and Reset Procedure",
    answer:
      "Try a soft reset: press and hold the power button on the remote for 6 seconds. Clear the Smart Hub cache: Settings > Apps > System Apps > Clear Cache. For persistent failures, reset Smart Hub: Settings > Support > Self Diagnosis > Reset Smart Hub (default PIN is 0000). Factory reset is the final step.",
  },
  {
    question: "Samsung TV Won't Respond to Remote",
    answer:
      "Samsung Smart Remotes connect via Bluetooth. To re-pair, point at the TV and press and hold both Return and Play/Pause buttons for 3 seconds. Try fresh batteries. If IR functions work (volume, channel when pointed at TV) but Bluetooth doesn't (voice, navigation), the Bluetooth module may need attention.",
  },
];

const lgItems = [
  {
    question: "LG TV No Picture but Sound Works",
    answer:
      "Press the Input button to ensure you're on the correct source. Perform the flashlight test — shine a flashlight close to the screen and look for a faint image. If you see one, the backlight has failed and needs professional repair.",
  },
  {
    question: "LG TV Stuck on LG Logo",
    answer:
      "Try a power cycle: unplug the TV, press and hold the power button on the TV for 15 seconds, wait 2 minutes, then plug back in. If the issue continues, it may need a firmware update via USB or a main board replacement.",
  },
  {
    question: "LG webOS Apps Not Working",
    answer:
      "First try clearing individual app data: Settings > Apps > [App Name] > Clear Data. Check for software updates: Settings > All Settings > Support > Software Update. Last resort: Settings > General > System Manager > Reset to Initial Settings.",
  },
  {
    question: "LG Magic Remote Not Pairing",
    answer:
      "Point the Magic Remote at the TV and press the Wheel (OK) button for 5 seconds. If that doesn't work, press Home and Back simultaneously for 5 seconds to un-register, then re-pair by pressing the Wheel button. Use fresh alkaline batteries (not rechargeable).",
  },
];

const otherBrandsItems = [
  {
    question: "Sony TV — Won't Turn On or Apps Issues",
    answer:
      "If the standby light blinks, count the blinks — this is Sony's diagnostic code system. Try Sony's power reset: unplug, hold power button for 30 seconds, release, plug in, press power once. For app issues: Settings > Apps > See all apps > [App] > Clear data. For system slowness: Settings > Device Preferences > Reset.",
  },
  {
    question: "Hisense TV — Common Issues",
    answer:
      "Blinking red light: unplug for 60 seconds, press power button while unplugged for 15 seconds. Hisense TVs are sensitive to power surges — always use a surge protector. For VIDAA issues, try Settings > Network > Reset Network. For Roku-based Hisense: Settings > System > Advanced system settings > Factory reset.",
  },
  {
    question: "Vizio TV — Black Screen or SmartCast Issues",
    answer:
      "Hold the power button on the back of the TV for 10-15 seconds for a soft power cycle. Vizio TVs have a known backlight issue on certain models. For SmartCast: press and hold input + volume-down simultaneously for 10 seconds. For factory reset: hold the input button for 10 seconds while powering on.",
  },
  {
    question: "TCL TV — Loading Issues and Screen Problems",
    answer:
      "TCL Roku TV stuck on loading: unplug for 30 seconds. For persistent issues, use the physical reset button (pinhole on back/side) — insert a paperclip and hold for 15 seconds. Dark spots near edges are typically backlight failure. Horizontal bands or vertical lines indicate T-Con board or panel connection issues.",
  },
];

const additionalItems = [
  {
    question: "Why does my TV keep restarting or turning off by itself?",
    answer:
      "Check HDMI-CEC settings, sleep timer, and eco-mode first. If the TV restarts randomly with no pattern, it typically points to power supply board instability or main board failure, which requires professional diagnosis.",
  },
  {
    question: "My TV has picture but the screen is dim — is that the backlight?",
    answer:
      "Very likely. Use the flashlight test: hold a flashlight close to the screen in a dark room. If you can see a faint image, the LED backlight array has partially failed. This is a component-level repair that requires a technician.",
  },
  {
    question: "Is it worth repairing a TV with a cracked screen?",
    answer:
      "In most cases, no. A replacement panel for a 55-inch TV can cost $400-$800, while a comparable new TV may cost $300-$500. We provide honest cost-benefit advice — if replacement makes more financial sense, we will tell you.",
  },
];

export default function TvTroubleshooting() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
          Troubleshooting Guide
        </p>
        <h1 className="text-display-lg font-headline font-bold text-on-surface mb-4">
          TV Troubleshooting Guide
        </h1>
        <p className="text-body-lg text-on-surface-variant mb-12" data-speakable="">
          Diagnose common TV problems including black screen, no picture, lines
          on screen, sound issues, and smart TV connectivity failures. Expert
          troubleshooting from Metro TV &amp; Appliances, Lincoln NE — serving
          the region since 1947.
        </p>

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          No Picture / Black Screen
        </h2>
        <FaqAccordion items={noPictureItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Screen Issues (Lines, Spots, Color, Flickering)
        </h2>
        <FaqAccordion items={screenItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Sound Problems
        </h2>
        <FaqAccordion items={soundItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Smart TV &amp; Connectivity Issues
        </h2>
        <FaqAccordion items={smartTvItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Samsung TV Troubleshooting
        </h2>
        <p className="text-on-surface-variant text-sm mb-4">
          Metro TV &amp; Appliances is a Samsung Established Authorized Service
          Center (ASC) with access to Samsung&apos;s restricted diagnostic systems.
        </p>
        <FaqAccordion items={samsungItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          LG TV Troubleshooting
        </h2>
        <FaqAccordion items={lgItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Other Brands We Service
        </h2>
        <FaqAccordion items={otherBrandsItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Additional Questions
        </h2>
        <FaqAccordion items={additionalItems} />

        {/* CTA */}
        <div className="mt-16 bg-secondary-container rounded-2xl p-8 md:p-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold font-headline text-on-surface mb-3">
            Need professional TV repair?
          </h2>
          <p className="text-on-surface-variant text-sm mb-6 max-w-lg mx-auto">
            Factory-authorized service for Samsung, LG, Sony, and all major
            brands. Drop off your TV at our Lincoln service center for expert
            diagnosis with manufacturer tools and genuine OEM parts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/schedule" variant="primary">
              Schedule Service
            </Button>
            <Button href={`tel:${BUSINESS.phone}`} variant="ghost">
              <span className="material-symbols-outlined text-base">call</span>
              {BUSINESS.phone}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
