import { buildMetadata } from "@/lib/metadata";
import { FaqAccordion } from "@/components/FaqAccordion";
import { DiagnosticWizard } from "@/components/DiagnosticWizard";
import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "Appliance Troubleshooting Guide — Refrigerator, Washer, Dryer, Dishwasher, Oven",
  description:
    "Diagnose refrigerator not cooling, washer not spinning, dryer not heating, dishwasher not draining, and oven issues. Expert appliance troubleshooting from Metro TV & Appliances, Lincoln NE.",
  path: "/troubleshooting/appliances",
  keywords: [
    "appliance troubleshooting Lincoln NE",
    "refrigerator not cooling",
    "washer not spinning",
    "dryer not heating",
    "dishwasher not draining",
    "oven not heating",
    "appliance error codes",
  ],
});

const refrigeratorItems = [
  {
    question: "Not Cold Enough — Cooling System Fault Diagnosis",
    answer:
      "Check the thermostat sensor probe settings. Someone may have bumped the temperature dial. Most refrigerators should be set to 37\u00B0F for the fresh food compartment and 0\u00B0F for the freezer. Clean the condenser coil heat exchanger on the back or underside of the unit with a brush or vacuum — dust and pet hair reduce cooling efficiency. Check for blocked vents inside the refrigerator and freezer compartments. Inspect the door gasket: close the door on a dollar bill, and if you can pull it out easily, the gasket is not sealing properly.",
  },
  {
    question: "Acoustic Fault Signatures: What That Sound Means",
    answer:
      "Rattling usually means something is loose or the unit is not level. Check that the refrigerator sits flat and nothing is resting against it. A steady buzzing or humming is typically the compressor running normally. Repeated clicking can indicate a relay issue — the compressor is trying to start but cannot engage. If clicking is persistent or the unit stops cooling, call a professional.",
  },
  {
    question: "Water Ingress — Drain Line and Supply Line Checks",
    answer:
      "The most common cause is a clogged defrost drain inside the freezer compartment. Try flushing it with warm water. If the leak comes from behind the unit, check the water supply line to the ice maker for kinks, cracks, or drips at the connection point.",
  },
  {
    question: "Ice Production System Not Cycling",
    answer:
      "Verify the water supply valve behind the refrigerator is fully open. Check or replace the water filter — a clogged filter restricts water flow. The freezer must be at or below 0\u00B0F for the ice maker to function properly.",
  },
  {
    question: "Refrigerator running constantly without cycling off?",
    answer:
      "Dirty condenser coil heat exchanger, poor door gasket seal, overcrowded interior blocking airflow, or a failing thermostat sensor probe are the most common causes. Start with coil cleaning and gasket inspection before calling a technician.",
  },
];

const washerItems = [
  {
    question: "Drive System or Drain System Failure — Not Spinning or Draining",
    answer:
      "An unbalanced load is the most common cause — redistribute clothes evenly and restart. Check the drain discharge hose for kinks. On top-load washers, the lid switch must be engaged for the spin cycle. Front-load washers have an electronic door latch interlock that must fully engage before any cycle begins.",
  },
  {
    question: "Water on the Floor — Source Isolation",
    answer:
      "Check supply hose connections at the back of the machine. On front-load washers, inspect the door boot seal for tears or debris. Overloading can also cause water to overflow during the wash cycle.",
  },
  {
    question: "No Response When You Press Start",
    answer:
      "Confirm the machine is plugged in and the outlet has power. Check that the door or lid is fully closed and latched. If the machine has power and the door is secured but still will not start, the electronic control module (ECM) may have failed, requiring professional diagnosis.",
  },
  {
    question: "Violent Vibration During Spin Cycle",
    answer:
      "All four leveling feet must be in solid contact with the floor. New washing machines come with shipping bolts that secure the drum during transit — if not removed during installation, the machine will vibrate violently.",
  },
];

const dryerItems = [
  {
    question: "Dryer Running Cold — Thermal Circuit Fault",
    answer:
      "Clean the lint trap before every load. Check the exhaust vent for lint buildup — a clogged vent is the most common cause. If the dryer overheated, the thermal cutoff fuse (TCO) may have blown — it does not reset and must be replaced. For gas dryers, confirm the gas supply valve is open.",
  },
  {
    question: "Extended Dry Times — Airflow Restriction",
    answer:
      "Clean the entire vent duct from dryer to exterior wall cap. Avoid overloading — clothes need room to tumble. Wipe the resistive moisture sensor bars inside the drum with rubbing alcohol to remove dryer sheet residue that causes false readings.",
  },
  {
    question: "Mechanical Noise During Operation — Component Wear",
    answer:
      "A thumping or rumbling noise usually indicates worn drum support rollers. Squealing or squeaking can be a worn drive belt. A high-pitched squeak or scraping may be the idler pulley bearing failing.",
  },
];

const dishwasherItems = [
  {
    question: "Poor Wash Performance — Spray and Thermal Checks",
    answer:
      "Inspect spray arms for clogs — food particles can block the small holes. Run hot water at the faucet before starting so the first fill begins with hot water (at least 120\u00B0F). Use the correct amount of detergent for your water hardness. Avoid overcrowding the racks.",
  },
  {
    question: "Standing Water in the Tub — Drain System Check",
    answer:
      "Clean the removable filter at the bottom of the tub. Check the drain discharge hose for kinks. If your dishwasher connects to a garbage disposal, make sure the knockout plug inside the disposal inlet was removed during installation — a very common cause of drainage problems.",
  },
  {
    question: "Dishwasher Leaking",
    answer:
      "Inspect the door gasket for cracks, tears, or food buildup. A cracked or loose spray arm can direct water toward the door seal. If water pools under the dishwasher when not running, the water inlet solenoid valve may be failing — this requires professional replacement.",
  },
];

const rangeItems = [
  {
    question: "Burner Clicks But Won't Light — Igniter Circuit",
    answer:
      "Remove and reseat the burner cap — a misaligned cap is one of the most common reasons a gas burner won't light. Clean around the igniter with a small brush. Confirm the gas supply valve is fully open. If you smell gas without a flame, turn off the gas immediately and call a professional.",
  },
  {
    question: "Oven Won't Reach Temperature — Heating Element or Igniter",
    answer:
      "For electric ovens, check if the bake or broil element glows red evenly — visible blisters, breaks, or burn marks mean it has failed. For gas ovens, the igniter must get hot enough to open the gas valve; if it glows but won't light, it may be too weak (a common counterintuitive failure). Do not attempt gas valve repairs yourself.",
  },
  {
    question: "Temperature Offset — Thermistor and Calibration Check",
    answer:
      "Most ovens allow temperature calibration through the settings menu. The RTD temperature probe (thin metal rod inside the oven cavity) should read around 1,080-1,100 ohms at room temperature. If the probe tests good and calibration doesn't help, the ECM may need professional diagnosis.",
  },
];

const inductionItems = [
  {
    question: "Induction Zone Not Activating — Cookware and Coil Check",
    answer:
      "Induction only works with ferromagnetic cookware (cast iron, most stainless steel). Test with a magnet. The cookware must cover at least 60-70% of the cooking zone. Ensure the pot sits flat — warped pans may not be detected. Induction cooktops require a dedicated 240V circuit.",
  },
  {
    question: "Error Codes on the Display — Fault Register Lookup",
    answer:
      "E/F codes with numbers typically indicate sensor or electrical faults. H codes usually indicate overheating — let the cooktop cool 15-20 minutes and try again. A flashing pan icon means incompatible or incorrectly placed cookware. Write down the exact code before resetting.",
  },
  {
    question: "Buzzing or Humming Noises",
    answer:
      "Some noise is normal with induction cooking. A low hum comes from the magnetic field vibrating the cookware — heavier, flat-bottomed pans are quieter. Fan noise is the internal cooling fan, which may continue after cooking stops.",
  },
];

const errorCodeItems = [
  {
    question: "Samsung Washer Error Codes",
    answer:
      "4E/4C: Water not filling — open supply valves, check for kinked hoses. 5E/5C: Not draining — check drain hose, clean debris filter. UE/DC: Unbalanced load — redistribute laundry. dE/dC: Door not locked — remove items caught in seal. SUd: Excessive suds — use HE detergent only. 1E/LE: Water level/leak sensor. 9C1/PF: Voltage/power issue — use dedicated outlet.",
  },
  {
    question: "Samsung Refrigerator Error Codes",
    answer:
      "OF OF: Cooling Off (Demo Mode) — hold Energy Saver + Power Freeze for 8 seconds. PC ER: Communication error — unplug for 2 minutes. 5E: Fridge sensor error — do not unplug, call for service. 8E: Ice maker sensor error — call for service. 22E/22C: Fridge fan error. Important: Do not unplug a Samsung refrigerator showing an error code — it may erase diagnostic data the technician needs.",
  },
  {
    question: "LG Washer Error Codes",
    answer:
      "OE: Drain error — clean pump filter, check drain hose. IE: Water supply error — open taps, clean inlet filters. UE: Unbalanced load. DE: Door lock error. LE: Motor overloaded — wait 30 minutes to cool. FE: Overfilling. tCL: Tub clean cycle due (not an error). CL: Child lock active — press and hold child lock button for 3 seconds.",
  },
  {
    question: "GE / Maytag / KitchenAid Common Error Codes",
    answer:
      "Washer: F0 E1 — long fill (check water supply). F0 E2 — excessive suds. F5 E2 — door lock error. F9 E1 — long drain. Range/Oven: F2 E0 — oven too hot (turn off, call for service). F1 E1 — control board error. Dishwasher: E1 F5 — door switch error.",
  },
  {
    question: "Electrolux / Frigidaire Error Codes",
    answer:
      "Washer: E11 — fill time too long. E13 — water leak detected. E21 — drain time too long. E35 — overfill. E40/E41 — door lock error. Refrigerator: 5H — high temperature alert. SY — system error. Dryer: E11 — communication error. Range/Oven: F10 — oven overheated (turn off immediately). F30/F31 — temperature sensor open/shorted.",
  },
  {
    question: "My appliance shows an error code — should I unplug it to reset?",
    answer:
      "Do not unplug a Samsung refrigerator showing an error code — it may erase diagnostic data the technician needs. For other appliances, note the exact code first, then call us at (402) 466-9090. Many codes indicate specific component failures that require professional diagnosis, not a reset.",
  },
];

const generalItems = [
  {
    question: "When should I call a professional instead of troubleshooting myself?",
    answer:
      "Always call a professional for anything involving gas lines. Call for electrical components behind access panels, sealed refrigeration systems (compressor, refrigerant lines), error codes you cannot identify, problems that persist after basic troubleshooting, and any repair you are not comfortable performing. Metro TV & Appliances has been providing factory-authorized appliance repair in Lincoln, NE since 1947.",
  },
  {
    question: "How long should my appliance last?",
    answer:
      "General lifespans: Refrigerators 15-20 years. Washing machines 10-15 years. Dryers 13-15 years. Dishwashers 10-13 years. Ranges and ovens 15+ years. Actual lifespan depends on usage frequency, brand quality, and maintenance history.",
  },
];

export default function ApplianceTroubleshooting() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase mb-4">
          Troubleshooting Guide
        </p>
        <h1 className="text-display-lg font-headline font-bold text-on-surface mb-4">
          Appliance Troubleshooting Guide
        </h1>
        <p className="text-body-lg text-on-surface-variant mb-12" data-speakable="">
          Diagnose common refrigerator, washer, dryer, dishwasher, range, and
          induction cooktop problems before calling for professional repair.
          Work through these expert checks from Metro TV &amp; Appliances in
          Lincoln, NE — many issues have simple fixes you can handle at home.
        </p>

        {/* Diagnostic Wizard */}
        <div className="mb-12">
          <h2 className="text-display-sm font-headline font-bold mb-4 text-center">
            What Error Code Are You Seeing?
          </h2>
          <p className="text-body-md text-on-surface-variant text-center mb-8">
            Select your brand and error code for a diagnosis from our Virtual Tech.
          </p>
          <DiagnosticWizard />
        </div>

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Refrigerator Troubleshooting
        </h2>
        <FaqAccordion items={refrigeratorItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Washing Machine Troubleshooting
        </h2>
        <FaqAccordion items={washerItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Dryer Troubleshooting
        </h2>
        <FaqAccordion items={dryerItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Dishwasher Troubleshooting
        </h2>
        <FaqAccordion items={dishwasherItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Range &amp; Oven Troubleshooting
        </h2>
        <FaqAccordion items={rangeItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Induction Range &amp; Cooktop Troubleshooting
        </h2>
        <FaqAccordion items={inductionItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          Error Code Quick Reference
        </h2>
        <FaqAccordion items={errorCodeItems} />

        <h2 className="text-display-md font-headline font-bold text-on-surface mt-12 mb-6">
          General Questions
        </h2>
        <FaqAccordion items={generalItems} />

        {/* CTA */}
        <div className="mt-16 bg-secondary-container rounded-2xl p-8 md:p-10 text-center">
          <h2 className="text-xl md:text-2xl font-bold font-headline text-on-surface mb-3">
            Need professional appliance repair?
          </h2>
          <p className="text-on-surface-variant text-sm mb-6 max-w-lg mx-auto">
            Factory-authorized service for Samsung, LG, GE, Electrolux,
            Frigidaire, Maytag, KitchenAid, and more. Serving Lincoln, Omaha,
            and surrounding areas since 1947.
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
