import { buildMetadata } from "@/lib/metadata";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Commercial Microwave Troubleshooting Guide — Not Heating, Sparking, Error Codes",
  description:
    "Troubleshoot commercial microwave problems: not heating, sparking, uneven heating, error codes, door issues. Safe external checks and when to call a factory-authorized technician. Commercial microwave repair Lincoln NE.",
  path: "/troubleshooting/commercial",
  keywords: [
    "commercial microwave repair Lincoln NE",
    "commercial microwave not heating",
    "Amana commercial microwave troubleshooting",
    "Menumaster microwave troubleshooting",
    "commercial microwave sparking",
    "commercial microwave error codes",
    "restaurant microwave repair Nebraska",
  ],
});

const notHeatingItems = [
  {
    question: "Power Supply Verification — Voltage and Breaker Check",
    answer:
      "Confirm the microwave is plugged in securely. Check the circuit breaker or fuse panel — a tripped breaker is one of the most common causes of a \"dead\" microwave in a busy commercial kitchen. Most commercial microwaves require 208-240V power (not standard 120V household outlets). If the unit was recently moved or installed, verify that the outlet supplies the correct voltage. An undersupplied microwave may appear to run but will not heat food properly.",
  },
  {
    question: "Door Interlock System — Latch and Switch Engagement",
    answer:
      "Commercial microwaves have multiple door interlock switches that must fully engage before the magnetron will activate. Open and close the door firmly — listen for a solid click. Inspect the door for physical damage, warping, or debris along the seal and latch area. Even a small piece of food buildup on the door latch can prevent the interlock switches from engaging, which means the microwave will run (lights, fan, display) but will not produce heat.",
  },
  {
    question: "Verify Settings — Power Level and Program Check",
    answer:
      "Check that the power level is set correctly — some commercial microwaves default to a low power level after a power interruption. Verify the timer is set and the correct cooking program is selected. On programmable models (common in fast food restaurants), confirm the programmed settings have not been reset or corrupted.",
  },
  {
    question: "Magnetron Failure Signs — Run Mode, No RF Output",
    answer:
      "If the microwave runs normally — lights are on, fan is spinning, display is working, timer counts down — but food comes out completely cold, the magnetron has likely failed. The magnetron generates microwave energy and has a finite lifespan (typically 1,500 to 3,000 operating hours for commercial units). An underperforming magnetron may still produce RF energy below its rated output, causing food to take longer than programmed cook times. This is a high-voltage repair requiring factory-authorized service.",
  },
];

const unevenHeatingItems = [
  {
    question: "Mode Stirrer Motor — Energy Distribution System Failure",
    answer:
      "Most commercial microwaves use a mode stirrer motor that rotates an antenna to distribute microwave energy evenly throughout the cavity. If the mode stirrer motor fails or the antenna becomes stuck, microwave energy concentrates in one area, causing hot and cold spots. You may hear an unusual noise or no noise at all from the top of the cavity where the stirrer is located. The mode stirrer motor is an internal component — do not attempt to access it.",
  },
  {
    question: "Load Placement and Container Compatibility",
    answer:
      "Place food in the center of the cavity for the most even heating. Avoid stacking items or overcrowding. Use microwave-safe containers — metal containers, foil-lined packaging, and certain plastics can interfere with heating. For large or dense items, pause and stir or rotate food halfway through the heating cycle. If your microwave has a turntable, make sure it is properly seated and rotating.",
  },
  {
    question: "Magnetron Output Degradation — RF Power Below Rated Spec",
    answer:
      "Over time, a magnetron weakens and produces less microwave energy than its rated wattage. A commercial microwave rated at 1800W may only output 1200W after years of heavy use. This reduced output causes uneven heating, longer cook times, and inconsistent food quality. Magnetron degradation is gradual — you may not notice it until food quality complaints increase. A technician can measure actual magnetron output and compare it to the manufacturer specification.",
  },
];

const sparkingItems = [
  {
    question: "Metal Contamination in the RF Cavity",
    answer:
      "The most common cause of sparking is metal inside the microwave cavity. Check for aluminum foil, foil-lined packaging, metal twist ties, metal containers, metal utensils, or damaged metal racks. Even a small piece of crumpled foil left behind can cause arcing. Remove all metal objects and test the microwave with a microwave-safe container of water.",
  },
  {
    question: "Waveguide Cover Damage — Mica Panel Inspection",
    answer:
      "The waveguide cover is a small panel (usually mica or plastic) inside the microwave cavity, typically on the top or side wall. It protects the magnetron opening from food splatter. Over time, food buildup can burn onto the cover, causing it to arc. Inspect for burns, holes, discoloration, or heavy food splatter. A damaged waveguide cover must be replaced — do not operate the microwave with a burned or holed cover.",
  },
  {
    question: "Interior Cavity Coating Failure — Arcing Risk",
    answer:
      "The interior of a commercial microwave is coated with a special paint that prevents arcing. In high-use commercial environments, this paint can chip, peel, or wear away — especially around the bottom and edges of the cavity. Exposed bare metal inside the cavity will arc when the microwave operates. Inspect the interior for chips, rust spots, or areas where the paint has worn through to bare metal.",
  },
];

const displayItems = [
  {
    question: "No Display Output — Control Power Supply Check",
    answer:
      "If the display is completely blank (no lights, no text, no indicators), the issue is usually a power supply problem. Check the power cord, outlet, circuit breaker, and fuse. If other equipment on the same circuit is working, the issue may be the microwave's internal fuse or control board. A blank display on a unit with confirmed power supply is a control board issue that requires professional repair.",
  },
  {
    question: "Error Codes — Amana, Sharp, Panasonic, Menumaster",
    answer:
      "Commercial microwaves display error codes when the control board detects a component failure. Common codes may indicate magnetron overheating, door switch faults, control board communication errors, or high-voltage component failures. Write down the exact error code before calling for service — the code tells our technician exactly which component to test and which parts to bring. Do not attempt to clear error codes by unplugging and replugging the unit, as this may mask an underlying safety issue.",
  },
  {
    question: "Membrane Switch Pad Failure — Tactile Contact Wear",
    answer:
      "If the display is on but buttons do not respond (or respond intermittently), the membrane switch touchpad overlay is likely worn. This is common in high-use commercial environments where employees press the same buttons hundreds of times per day. Moisture from steam in a commercial kitchen can also damage the touchpad. Membrane touchpad and control board replacement are professional repairs.",
  },
];

const doorItems = [
  {
    question: "Door Alignment Failure — Hinge Wear and Debris Check",
    answer:
      "If the door does not close flush or does not latch securely, check for food debris or buildup on the latch and hinge areas. Clean the door seal and latch with a damp cloth. On heavily used commercial microwaves, door hinges wear over time, causing the door to sag and not align properly with the latch. You may notice the door requires more force to close, or it springs open after closing. Do not force the door closed — this can damage the interlock switches.",
  },
  {
    question: "Door Interlock Switch Failure — Safety Circuit Fault",
    answer:
      "If the microwave will not start even when the door appears fully closed, one or more door interlock switches may have failed. Commercial microwaves have three interlock switches (primary, secondary, and monitor) that must all engage for the microwave to operate. Door switches fail due to repeated use — commercial microwaves are opened and closed hundreds of times per day. A failed door switch is actually a safety feature working correctly: it prevents the microwave from operating when it cannot confirm the door is properly sealed.",
  },
  {
    question: "Door Gasket Integrity — Radiation Containment Check",
    answer:
      "The door seal (gasket) creates a barrier that prevents microwave radiation from leaking around the door. Inspect the seal for tears, cracks, compression damage, or food buildup. A damaged seal compromises radiation containment and may cause the microwave to fail a radiation leakage test. Door seals should be inspected weekly in high-volume commercial environments.",
  },
];

const maintenanceItems = [
  {
    question: "How often should commercial microwaves be professionally serviced?",
    answer:
      "Commercial microwaves in high-volume environments (restaurants, fast food chains) should receive professional preventive maintenance every 6 to 12 months. This includes testing magnetron output, inspecting door switches and seals, checking the high-voltage circuit, verifying cooling fan operation, and cleaning internal components. Regular maintenance extends the lifespan of commercial microwaves and reduces unexpected breakdowns.",
  },
  {
    question: "How do I verify my commercial microwave is outputting correct wattage?",
    answer:
      "Boil test: fill a 1-liter container with room-temperature water (approximately 68\u00B0F) and heat at full power for 60 seconds. For a properly functioning 1,800W unit, water temperature should rise approximately 46\u201350\u00B0F. Significantly less rise indicates reduced magnetron output. Consult your unit's service manual for model-specific test parameters. If output appears degraded, call a technician to measure magnetron performance directly.",
  },
  {
    question: "Our microwave heats slower than it used to — is that a sign of failure?",
    answer:
      "Yes. Gradual slowdown is the most common early sign of magnetron output degradation. As the magnetron cathode ages, it produces progressively less RF energy. Programmed cook times will start producing undercooked food. A technician can test magnetron output directly and advise on repair vs. replacement.",
  },
];

export default function CommercialTroubleshooting() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
          Troubleshooting Guide
        </p>
        <h1 className="text-display-lg font-headline font-bold text-on-surface mb-4">
          Commercial Microwave Troubleshooting Guide
        </h1>
        <p className="text-body-lg text-on-surface-variant mb-6" data-speakable>
          Safe external checks you can perform, common problems and their
          causes, and when to call a factory-authorized technician for
          commercial microwave repair. Metro TV &amp; Appliances is
          factory-authorized for Amana, Sharp, Panasonic, and Menumaster.
        </p>

        <div className="mb-12 rounded-2xl border-l-4 border-error bg-error-container/20 p-6">
          <p className="text-sm font-semibold text-error mb-2">
            IMPORTANT SAFETY WARNING
          </p>
          <p className="text-sm text-on-surface-variant">
            Commercial microwaves contain high-voltage capacitors that can hold
            a lethal charge even when unplugged. <strong>NEVER</strong> attempt
            to open the cabinet or repair internal components yourself. The
            troubleshooting tips below cover external checks only. For any
            internal issue, call a professional technician at{" "}
            <a href={`tel:${BUSINESS.phone}`} className="text-primary font-medium hover:underline">
              {BUSINESS.phone}
            </a>.
          </p>
        </div>

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Not Heating
        </h2>
        <FaqAccordion items={notHeatingItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Uneven Heating
        </h2>
        <FaqAccordion items={unevenHeatingItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Sparking or Arcing Inside the Cavity
        </h2>
        <FaqAccordion items={sparkingItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Display &amp; Control Issues
        </h2>
        <FaqAccordion items={displayItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Door Issues
        </h2>
        <FaqAccordion items={doorItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Maintenance &amp; Additional Questions
        </h2>
        <FaqAccordion items={maintenanceItems} />

        {/* CTA */}
        <div className="mt-16 bg-secondary-container rounded-2xl p-8 md:p-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold font-headline text-on-surface mb-3">
            Need commercial microwave repair?
          </h2>
          <p className="text-on-surface-variant text-sm mb-6 max-w-lg mx-auto">
            Metro TV &amp; Appliances is factory-authorized for Amana, Sharp,
            Panasonic, and Menumaster commercial microwaves. We provide
            drop-off repair at our Lincoln service center with fast turnaround
            to minimize your equipment downtime.
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
