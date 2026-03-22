import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const scheduleSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone number required"),
  zip: z.string().length(5, "5-digit zip required"),
  serviceType: z.enum([
    "appliance-inhome",
    "tv-dropoff",
    "audio-dropoff",
    "commercial-dropoff",
    "not-sure",
  ]),
  applianceType: z.string().optional(),
  brand: z.string().optional(),
  issue: z.string().min(10, "Please describe the issue"),
});

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const body = await req.json();
    const data = scheduleSchema.parse(body);

    await resend.emails.send({
      from: "Metro TV Service Request <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL_TO || "service@metrotv-audiotech.com"],
      replyTo: data.email,
      subject: `Service Request: ${data.serviceType} — ${data.name}`,
      html: `
        <h2>New Service Request</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td><strong>Name:</strong></td><td>${data.name}</td></tr>
          <tr><td><strong>Email:</strong></td><td>${data.email}</td></tr>
          <tr><td><strong>Phone:</strong></td><td>${data.phone}</td></tr>
          <tr><td><strong>Zip:</strong></td><td>${data.zip}</td></tr>
          <tr><td><strong>Service:</strong></td><td>${data.serviceType}</td></tr>
          ${data.applianceType ? `<tr><td><strong>Appliance:</strong></td><td>${data.applianceType}</td></tr>` : ""}
          ${data.brand ? `<tr><td><strong>Brand:</strong></td><td>${data.brand}</td></tr>` : ""}
          <tr><td><strong>Issue:</strong></td><td>${data.issue}</td></tr>
        </table>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0].message },
        { status: 400 },
      );
    }
    console.error("Resend error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send request. Please call us directly." },
      { status: 500 },
    );
  }
}
