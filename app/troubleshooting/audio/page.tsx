import { buildMetadata } from "@/lib/metadata";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Audio Equipment Troubleshooting Guide — Receiver, Speaker, Turntable, Soundbar",
  description:
    "Troubleshoot audio equipment problems: receiver no sound, speaker issues, turntable skipping, amplifier distortion, soundbar not working. Expert audio repair in Lincoln NE since 1947.",
  path: "/troubleshooting/audio",
  keywords: [
    "audio repair Lincoln NE",
    "stereo troubleshooting",
    "speaker problems",
    "receiver no sound",
    "amplifier distortion",
    "turntable skipping",
    "soundbar no audio",
    "vintage audio repair Nebraska",
  ],
});

const receiverItems = [
  {
    question: "Unit Is Dead — Power Rail and Fuse Diagnosis",
    answer:
      "Verify the outlet is working by plugging in another device. Check whether the unit has a fuse on the back panel. Make sure the power button is fully engaged. Many modern receivers have a standby mode — look for a small LED on the front panel. If the LED is on but the unit won't come out of standby, try unplugging for 60 seconds to reset the microprocessor.",
  },
  {
    question: "Powered Up, No Audio — Input, Relay, and Output Stage Check",
    answer:
      "Verify the correct input source is selected. Check that speaker wire connections are secure at both the receiver and speaker terminals. Confirm mute is not engaged and volume is turned up past the first few increments — some receivers have a logarithmic volume curve that produces very little sound at low settings.",
  },
  {
    question: "One Channel Dead — Output Transistor and Relay Fault",
    answer:
      "Check the balance control — it may have been bumped. Inspect the speaker wire on the silent channel at both ends. To determine if the problem is the receiver or speaker, swap left and right speaker wires at the receiver. If the silent channel follows the wire, the speaker or cable is the problem. If it stays on the same terminal, the receiver has an internal issue — likely a failed output transistor, bad relay, or cold solder joint.",
  },
  {
    question: "Distortion at Any Volume — Capacitor and Driver Failure",
    answer:
      "If distortion only occurs at high volumes, you may be overdriving the amplifier or speakers. If distortion is present at all volume levels, the issue is likely internal. In the amplifier, failed electrolytic capacitors are the most common culprit, particularly in vintage gear where capacitors dry out over 20-30 years. This requires component-level diagnosis.",
  },
  {
    question: "Overheating or Protection Shutdown — Impedance and Ventilation",
    answer:
      "Check ventilation — the unit needs at least 4 inches of clearance above and on the sides. Do not stack components on top of a receiver. A speaker impedance mismatch (e.g., 4-ohm speakers on an 8-ohm-minimum amplifier) causes overheating. Dust buildup inside restricts airflow. If the unit is more than a few years old, internal cleaning may be needed.",
  },
];

const speakerItems = [
  {
    question: "Speaker Silent on One or More Channels",
    answer:
      "Check wire connections at both speaker and receiver terminals. Try swapping the silent speaker with a working one to isolate whether the problem is the speaker, wire, or receiver channel. If the speaker is silent on every channel, it has an internal problem — a broken voice coil, failed crossover component, or disconnected internal wire.",
  },
  {
    question: "60Hz Ground Hum or Buzz — Loop and Proximity Check",
    answer:
      "A ground loop creates a 60Hz hum when audio components are on different electrical circuits — try plugging everything into the same power strip. Route audio cables away from power cords and keep speakers away from transformers, dimmers, and fluorescent lights. A damaged speaker cone or torn surround can cause buzzing at certain frequencies.",
  },
  {
    question: "Mechanical Rattle — Driver, Surround, or Cabinet Fault",
    answer:
      "Rattling during bass-heavy passages usually points to a loose driver, damaged surround, or debris inside a ported speaker cabinet. Remove the grille and visually inspect the drivers. Gently press on the center of the cone — it should move smoothly without scraping or catching.",
  },
  {
    question: "Diagnosing a Blown Driver — Cone, Voice Coil, and Surround",
    answer:
      "A blown speaker may produce distortion at any volume, no sound at all, or a scratchy/raspy sound. Look for a torn or punctured cone, detached surround, or burned voice coil (discoloration or burnt smell). If pushing gently on the cone feels scratchy or catches, the voice coil is damaged.",
  },
];

const turntableItems = [
  {
    question: "No Signal from Turntable — Phono Stage and Cartridge Check",
    answer:
      "The most common cause is a missing phono preamplifier. Turntables output a very low-level signal that must be amplified by a phono preamp before reaching your receiver. If your receiver lacks a 'Phono' input, you need an external phono preamp. Some turntables have a built-in preamp with a switch on the back. Also verify you're using the correct receiver input and the stylus is properly seated in the cartridge.",
  },
  {
    question: "Stylus Jumping the Groove — Tracking Force and Levelness",
    answer:
      "Ensure the turntable is on a stable, level surface away from speakers and foot traffic. Check the tracking force — the correct force is specified by your cartridge manufacturer (typically 1.5-2.5 grams). Verify anti-skate is set to match tracking force. A worn stylus (over 1,000 hours of play) will skip. Warped records also cause skipping.",
  },
  {
    question: "Turntable Ground Hum — Ground Wire and Cable Routing",
    answer:
      "Most turntables have a separate ground wire that must be connected to the grounding post on your receiver or phono preamp. If this wire is not connected, you get a loud 60Hz hum. If connected and still humming, keep the turntable's RCA cables away from power cords. A faulty or poorly shielded phono preamp can also introduce hum.",
  },
  {
    question: "Platter Speed Error — Belt, Motor, or Speed Control Circuit",
    answer:
      "On belt-drive turntables, a worn or stretched belt is the most common cause of slow playback — belts are inexpensive and straightforward to replace. On direct-drive turntables, speed issues point to motor or speed control circuitry problems. Check if the pitch adjustment has been bumped off-center. Use a strobe disc to verify speed accuracy.",
  },
];

const soundbarItems = [
  {
    question: "No Sound from Soundbar",
    answer:
      "For HDMI ARC: verify the cable is in the ARC-labeled port, enable HDMI-CEC (Samsung 'Anynet+,' LG 'SimpLink,' Sony 'Bravia Sync'), and set TV audio output to 'External Speaker' or 'HDMI ARC.' For optical: ensure the cable clicks in fully and set TV output to 'PCM' or 'Bitstream.' Power cycle both TV and soundbar — unplug both for 30 seconds, plug soundbar in first.",
  },
  {
    question: "Subwoofer Not Working",
    answer:
      "Wireless subwoofers must be paired with the soundbar. If the subwoofer LED is blinking, it has lost its wireless connection — consult your manual for re-pairing. Check the subwoofer's power cable. If your receiver has a subwoofer crossover setting, keep it around 80Hz. Some receivers have a 'subwoofer on/off' setting that may have been accidentally turned off.",
  },
  {
    question: "Surround Sound Not Working",
    answer:
      "Check speaker configuration in your receiver's setup menu — all speakers must be set to 'On' or 'Small/Large' rather than 'None.' Verify the content contains surround sound — stereo music won't produce surround output unless a processing mode is engaged. Run the automatic room calibration. Check surround speaker wire connections.",
  },
  {
    question: "Lip Sync Issues (Audio Out of Sync with Video)",
    answer:
      "Most receivers and soundbars have an audio delay or 'lip sync' setting — adjust in small increments. If using HDMI ARC, enable the TV's 'auto lip sync' feature if available. Streaming content is more prone to lip sync issues than disc-based media. If the problem occurs with only one source, check that device's audio output settings.",
  },
];

const vintageItems = [
  {
    question: "Common Failure Modes in Vintage Equipment",
    answer:
      "Failed electrolytic capacitors are the number one failure point — they have a 15-25 year lifespan and degrade whether used or not. Symptoms include distortion, reduced bass, hum, and channel failure. Contaminated potentiometers cause scratchy, intermittent sound when adjusted. Corroded contacts on input selectors and terminals create intermittent connections and noise.",
  },
  {
    question: "Why Vintage Equipment Demands Component-Level Expertise",
    answer:
      "Many vintage components are no longer available from the original manufacturer. Proper replacement parts must be carefully selected — a cheap capacitor that technically fits will not perform like a quality Nichicon or Panasonic capacitor matched to original specifications. Vintage equipment uses through-hole components requiring careful hand soldering to avoid lifting traces.",
  },
  {
    question: "Does Metro TV & Appliances repair vintage audio equipment?",
    answer:
      "Yes. We specialize in vintage and high-end audio repair. We service receivers, amplifiers, turntables, and other equipment from the 1960s through today. Our philosophy is preservation first — we replace failed components with parts that meet or exceed original specifications while preserving the original circuit design and sonic character.",
  },
];

const additionalItems = [
  {
    question: "My receiver goes into protection mode immediately — what does that mean?",
    answer:
      "Protection mode activates when the receiver detects a fault condition: DC offset at the output stage, speaker impedance below the rated minimum, a shorted output transistor, or a failed output channel. Do not attempt to bypass protection mode. This requires professional diagnosis.",
  },
  {
    question: "There's a hiss or static from my speakers at low volume — is that normal?",
    answer:
      "A very low-level hiss at high amplifier gain settings is normal (thermal noise floor). Noticeable hiss, static, or crackling that changes with the volume control points to a contaminated potentiometer. Static that doesn't change with volume is upstream of the volume control — likely a source device or cable issue.",
  },
  {
    question: "When should I call a professional for audio equipment repair?",
    answer:
      "Call a professional when you notice any internal component damage, smell burning from the equipment, experience electrical shock, have vintage or high-value equipment that needs service, or when problems persist after checking all cables and settings. Metro TV & Appliances has been servicing audio equipment in Lincoln, NE since 1947.",
  },
];

export default function AudioTroubleshooting() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
          Troubleshooting Guide
        </p>
        <h1 className="text-display-lg font-headline font-bold text-on-surface mb-4">
          Audio Equipment Troubleshooting Guide
        </h1>
        <p className="text-body-lg text-on-surface-variant mb-12" data-speakable="">
          Diagnose common problems with receivers, amplifiers, speakers,
          turntables, soundbars, and vintage audio equipment. Expert
          troubleshooting from Metro TV &amp; Appliances in Lincoln, NE —
          servicing audio gear since 1947.
        </p>

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Receiver &amp; Amplifier Troubleshooting
        </h2>
        <FaqAccordion items={receiverItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Speaker Troubleshooting
        </h2>
        <FaqAccordion items={speakerItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Turntable Troubleshooting
        </h2>
        <FaqAccordion items={turntableItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Soundbar &amp; Home Theater Troubleshooting
        </h2>
        <FaqAccordion items={soundbarItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Vintage &amp; High-End Audio Equipment
        </h2>
        <FaqAccordion items={vintageItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Additional Questions
        </h2>
        <FaqAccordion items={additionalItems} />

        {/* CTA */}
        <div className="mt-16 bg-secondary-container rounded-2xl p-8 md:p-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold font-headline text-on-surface mb-3">
            Need professional audio repair?
          </h2>
          <p className="text-on-surface-variant text-sm mb-6 max-w-lg mx-auto">
            From vintage receivers to modern home theater systems, we diagnose
            and repair at the component level using genuine parts. Drop off your
            equipment at our Lincoln service center.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/schedule" variant="primary">
              Schedule Service
            </Button>
            <Button href={`tel:${BUSINESS.phone}`} variant="ghost">
              <span className="material-symbols-outlined text-base" aria-hidden="true">call</span>
              {BUSINESS.phone}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
