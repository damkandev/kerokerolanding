import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const validPayload = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  message: "Queremos anticipar la demanda con mejores señales.",
  website: "",
};

describe("POST /api/contact", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("sends a plain-text email through Resend", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    const resendFetch = vi.fn().mockResolvedValue(
      Response.json({ id: "email-id" }, { status: 200 }),
    );
    vi.stubGlobal("fetch", resendFetch);

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validPayload),
      }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(resendFetch).toHaveBeenCalledOnce();
    const [url, options] = resendFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect(options.headers).toMatchObject({
      Authorization: "Bearer re_test",
      "User-Agent": "kerokero-landing/1.0",
    });
    expect(JSON.parse(String(options.body))).toMatchObject({
      from: "KeroKero <contacto@mail.kerokero.cl>",
      to: ["damkancontacto@gmail.com"],
      reply_to: "ada@example.com",
    });
  });

  it("allows overriding the verified sender", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("RESEND_FROM_EMAIL", "Kerokero <hola@mail.kerokero.cl>");
    const resendFetch = vi.fn().mockResolvedValue(
      Response.json({ id: "email-id" }, { status: 200 }),
    );
    vi.stubGlobal("fetch", resendFetch);

    await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validPayload),
      }),
    );

    const [, options] = resendFetch.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(String(options.body))).toMatchObject({
      from: "Kerokero <hola@mail.kerokero.cl>",
    });
  });

  it("rejects incomplete submissions before contacting Resend", async () => {
    const resendFetch = vi.fn();
    vi.stubGlobal("fetch", resendFetch);

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validPayload, message: "Muy corto" }),
      }),
    );

    expect(response.status).toBe(400);
    expect(resendFetch).not.toHaveBeenCalled();
  });

  it("reports missing server configuration", async () => {
    vi.stubEnv("RESEND_API_KEY", "");

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validPayload),
      }),
    );

    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({
      error: "El formulario no está configurado",
    });
  });

  it("does not expose errors returned by Resend", async () => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        Response.json({ message: "Invalid API key" }, { status: 401 }),
      ),
    );

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validPayload),
      }),
    );

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({
      error: "No fue posible enviar el mensaje",
    });
  });
});
