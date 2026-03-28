import { Router } from "express";

export const chatRouter = Router();

const cannedReplies: Record<string, string> = {
  billing: "For billing inquiries, head to Settings > Billing. You can view invoices, update payment methods, and change your plan there. Need more specific help?",
  password: "To reset your password, click 'Forgot Password' on the login page. You'll receive a reset link via email within a few minutes.",
  integration: "CloudDesk integrates with Slack, Zapier, and more! Check Settings > Integrations to connect your favorite tools.",
  api: "Our API documentation is available at docs.clouddesk.io/api. You'll need an API key from Settings > API > Keys to get started.",
  sso: "SSO configuration is available for Enterprise plans. Go to Settings > Security > SSO to set up SAML 2.0 with your identity provider.",
  default: "Thanks for reaching out! I can help with billing, password resets, integrations, API questions, and more. What would you like to know?",
};

// POST /api/chat
chatRouter.post("/", (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Message is required" });
  }

  const lowerMessage = message.toLowerCase();
  let reply = cannedReplies.default;

  for (const [keyword, response] of Object.entries(cannedReplies)) {
    if (keyword !== "default" && lowerMessage.includes(keyword)) {
      reply = response;
      break;
    }
  }

  // Simulate slight latency
  setTimeout(() => {
    res.json({ reply, timestamp: new Date().toISOString() });
  }, 500);
});
