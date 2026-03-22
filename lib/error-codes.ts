export type ApplianceType = "washer" | "dryer" | "refrigerator" | "dishwasher" | "range";

export interface ErrorCode {
  code: string;
  aliases?: string[];
  brand: "samsung" | "lg";
  displayName: string;
  appliances: ApplianceType[];
  severity: "low" | "medium" | "high";
  description: string;
  causes: string[];
  components: string[];
  safetyNote?: string;
}

export const SAMSUNG_CODES: ErrorCode[] = [
  {
    code: "5E",
    aliases: ["SE"],
    brand: "samsung",
    displayName: "Drain Error",
    appliances: ["washer"],
    severity: "medium",
    description:
      "The washer cannot drain water. The control board detected the water level has not dropped after the drain pump activated.",
    causes: [
      "Clogged debris filter (most common — check the filter access panel at the front bottom)",
      "Drain hose kinked or obstructed",
      "Drain pump failure (motor winding open or seized impeller)",
      "Pressure switch or air dome tube blocked",
    ],
    components: ["drain pump", "debris filter", "pressure switch", "drain hose"],
  },
  {
    code: "8E",
    brand: "samsung",
    displayName: "Motor Error",
    appliances: ["washer"],
    severity: "high",
    description:
      "The drive motor or its hall sensor is not responding. The control board cannot verify motor rotation.",
    causes: [
      "Hall sensor failure (most common on direct-drive models)",
      "Motor winding open circuit or shorted turns",
      "Wire harness disconnect between motor and main PCB",
      "Main control board relay failure",
    ],
    components: ["hall sensor", "drive motor", "motor wire harness", "main PCB"],
    safetyNote:
      "Unplug the washer before inspecting motor connections. The motor operates on high current.",
  },
  {
    code: "14E",
    brand: "samsung",
    displayName: "Communication Error",
    appliances: ["washer"],
    severity: "high",
    description:
      "The main control board and display board cannot communicate. The washer will not respond to button presses.",
    causes: [
      "Wire harness disconnect between main PCB and display PCB",
      "Corroded connector pins",
      "Main control board failure",
      "Display board failure",
    ],
    components: ["main PCB", "display board", "communication harness"],
  },
  {
    code: "1E",
    brand: "samsung",
    displayName: "Water Level Sensor Error",
    appliances: ["washer"],
    severity: "medium",
    description:
      "The pressure switch cannot detect the water level. The washer does not know if the tub is full or empty.",
    causes: [
      "Air dome tube disconnected or cracked",
      "Pressure switch failure",
      "Main control board input circuit fault",
    ],
    components: ["pressure switch", "air dome tube", "main PCB"],
  },
  {
    code: "4E",
    brand: "samsung",
    displayName: "Water Supply Error",
    appliances: ["washer", "dishwasher"],
    severity: "medium",
    description:
      "The washer is not receiving water. The expected fill time has been exceeded.",
    causes: [
      "Water supply valves turned off",
      "Inlet valve solenoid failure (coil open circuit)",
      "Inlet screens clogged with sediment",
      "Low household water pressure",
    ],
    components: ["water inlet valve", "inlet screen", "fill hose"],
  },
  {
    code: "dE",
    brand: "samsung",
    displayName: "Door Lock Error",
    appliances: ["washer"],
    severity: "medium",
    description:
      "The door latch interlock cannot engage or verify the locked position. The washer will not start a cycle.",
    causes: [
      "Door latch mechanism worn or broken",
      "Door lock actuator failure",
      "Door switch open circuit",
      "Foreign object preventing door closure",
    ],
    components: ["door lock assembly", "door latch", "door switch"],
  },
  {
    code: "HE",
    brand: "samsung",
    displayName: "Heater Error",
    appliances: ["washer", "dryer"],
    severity: "high",
    description:
      "The heating element is not reaching target temperature. On washers, hot wash cycles will fail. On dryers, clothes will not dry.",
    causes: [
      "Heating element open circuit (burnout)",
      "Thermistor (temperature sensor) failure",
      "Thermal cutoff fuse blown",
      "Control board relay failure",
    ],
    components: [
      "heating element",
      "thermistor",
      "thermal cutoff fuse",
      "control board",
    ],
    safetyNote:
      "Heating elements operate at mains voltage. Unplug the appliance and discharge any capacitors before testing.",
  },
  {
    code: "OE",
    brand: "samsung",
    displayName: "Overflow Error",
    appliances: ["washer"],
    severity: "high",
    description:
      "The water level has exceeded the maximum safe threshold. The washer will attempt to drain immediately.",
    causes: [
      "Water inlet valve stuck open",
      "Pressure switch stuck in low-water position",
      "Control board output driving inlet valve continuously",
    ],
    components: ["water inlet valve", "pressure switch", "main PCB"],
    safetyNote:
      "If water is overflowing, turn off water supply valves immediately before troubleshooting.",
  },
];

export const LG_CODES: ErrorCode[] = [
  {
    code: "OE",
    brand: "lg",
    displayName: "Drain Error",
    appliances: ["washer", "dishwasher"],
    severity: "medium",
    description:
      "The washer or dishwasher cannot drain. Water remains in the tub after the drain cycle.",
    causes: [
      "Drain filter clogged (check the access panel at the front bottom)",
      "Drain hose kinked or blocked",
      "Drain pump motor failure",
      "Control board not sending drain signal",
    ],
    components: ["drain pump", "drain filter", "drain hose"],
  },
  {
    code: "LE",
    brand: "lg",
    displayName: "Motor Error",
    appliances: ["washer"],
    severity: "high",
    description:
      "The drive motor is locked or the hall sensor is not detecting rotation. The drum will not spin.",
    causes: [
      "Overloaded drum (too many clothes)",
      "Hall sensor failure",
      "Rotor position sensor fault",
      "Motor stator winding failure",
    ],
    components: ["hall sensor", "stator", "rotor", "motor wire harness"],
    safetyNote: "Unplug the washer before inspecting the motor assembly.",
  },
  {
    code: "FE",
    brand: "lg",
    displayName: "Overflow Error",
    appliances: ["washer"],
    severity: "high",
    description:
      "Water level has exceeded the overflow threshold. The machine will attempt emergency drain.",
    causes: [
      "Water inlet valve stuck in the open position",
      "Pressure switch malfunction",
      "Main control board fault",
    ],
    components: ["water inlet valve", "pressure switch", "main PCB"],
    safetyNote:
      "Turn off water supply valves immediately if water is actively overflowing.",
  },
  {
    code: "dE",
    brand: "lg",
    displayName: "Door Error",
    appliances: ["washer"],
    severity: "medium",
    description:
      "The door is not fully closed or the door lock mechanism cannot engage.",
    causes: [
      "Door not fully latched",
      "Door lock actuator failure",
      "Door switch failure",
      "Door hinge misalignment",
    ],
    components: ["door lock assembly", "door switch", "door hinge"],
  },
  {
    code: "IE",
    brand: "lg",
    displayName: "Water Inlet Error",
    appliances: ["washer", "dishwasher"],
    severity: "medium",
    description:
      "The machine is not filling with water within the expected time.",
    causes: [
      "Water supply turned off at the tap",
      "Inlet valve failure",
      "Inlet hose kinked",
      "Inlet screen clogged with debris",
    ],
    components: ["water inlet valve", "inlet screen", "fill hose"],
  },
];

export const ALL_CODES = [...SAMSUNG_CODES, ...LG_CODES];

export function findCode(
  brand: "samsung" | "lg",
  code: string,
): ErrorCode | undefined {
  const codes = brand === "samsung" ? SAMSUNG_CODES : LG_CODES;
  return codes.find(
    (c) =>
      c.code.toLowerCase() === code.toLowerCase() ||
      c.aliases?.some((a) => a.toLowerCase() === code.toLowerCase()),
  );
}
