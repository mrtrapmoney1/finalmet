import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  service: z.string().max(100).optional(),
  message: z.string().min(10).max(2000),
});

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  let data: z.infer<typeof contactSchema>;
  try {
    data = contactSchema.parse(await request.json());
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const serviceLabel = data.service || "General Inquiry";
  const subject = `${serviceLabel} — ${data.name}`;

  try {
    await resend.emails.send({
      from: "Metro TV & Appliances Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL_TO || "info@metrotv-audiotech.com"],
      replyTo: data.email,
      subject,
      text: `
${subject}
${"─".repeat(subject.length)}

Name:    ${data.name}
Email:   ${data.email}
Phone:   ${data.phone || "Not provided"}
Service: ${serviceLabel}

Message:
${data.message}
      `.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
