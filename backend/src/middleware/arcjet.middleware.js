import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);

    // BLOCK REQUEST
    if (decision.isDenied()) {
      if (decision.reason?.isRateLimit?.()) {
        return res.status(429).json({
          message: "Too many requests. Please try again later.",
        });
      }

      if (decision.reason?.isBot?.()) {
        return res.status(403).json({
          message: "Bot access denied.",
        });
      }

      return res.status(403).json({
        message: "Request blocked by security policy.",
      });
    }

    // DETECT SPOOFED BOTS
    if (decision.results?.some(isSpoofedBot)) {
      return res.status(403).json({
        message: "Spoofed bot detected. Access denied.",
      });
    }

    next();
  } catch (error) {
    console.error("Arcjet Protection Error:", error);

    // DO NOT BLOCK USER if Arcjet fails
    next();
  }
};
