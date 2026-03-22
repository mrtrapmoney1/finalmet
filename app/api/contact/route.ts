import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, phone, service, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const serviceLabel = service || "General Inquiry";
  const subject = `${serviceLabel} — ${name}`;

  try {
    await resend.emails.send({
      from: "Metro TV & Appliances Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL_TO || "info@metrotv-audiotech.com"],
      replyTo: email,
      subject,
      text: `
${subject}
${"─".repeat(subject.length)}

Name:    ${name}
Email:   ${email}
Phone:   ${phone || "Not provided"}
Service: ${serviceLabel}

Message:
${message}
      `.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
