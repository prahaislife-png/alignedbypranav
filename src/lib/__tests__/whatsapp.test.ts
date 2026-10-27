import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, normalizeWhatsAppNumber, serviceEnquiryMessage } from "../whatsapp";

describe("normalizeWhatsAppNumber", () => {
  it.each([
    ["+91 98765 43210", "919876543210"],
    ["0091-98765-43210", "919876543210"],
    ["(+49) 151 2345 6789", "4915123456789"],
    ["919876543210", "919876543210"],
  ])("normalises %s", (input, expected) => {
    expect(normalizeWhatsAppNumber(input)).toBe(expected);
  });

  it.each([null, undefined, "", "   ", "098765", "12345", "+91 98765 abc10", "1234567890123456"])(
    "rejects %s",
    (input) => {
      expect(normalizeWhatsAppNumber(input)).toBeNull();
    },
  );
});

describe("buildWhatsAppUrl", () => {
  it("builds a wa.me link with an encoded message", () => {
    const url = buildWhatsAppUrl("+91 98765 43210", "Hello & welcome? #1 – “quotes”");
    expect(url).toBe(
      "https://wa.me/919876543210?text=Hello%20%26%20welcome%3F%20%231%20%E2%80%93%20%E2%80%9Cquotes%E2%80%9D",
    );
    expect(decodeURIComponent(new URL(url!).searchParams.get("text")!)).toBe("Hello & welcome? #1 – “quotes”");
  });

  it("omits the text parameter when there is no message", () => {
    expect(buildWhatsAppUrl("919876543210")).toBe("https://wa.me/919876543210");
  });

  it("returns null instead of a broken link when the number is missing or invalid", () => {
    expect(buildWhatsAppUrl(null, "Hi")).toBeNull();
    expect(buildWhatsAppUrl("not-a-number", "Hi")).toBeNull();
  });
});

describe("serviceEnquiryMessage", () => {
  it("names the service and asks for the process and starting price", () => {
    const message = serviceEnquiryMessage("Signature & Handwriting Analysis");
    expect(message).toBe(
      "Hello Pranav, I visited Aligned by Pranav and would like to enquire about Signature & Handwriting Analysis. Could you please share the consultation process and starting price?",
    );
  });
});
