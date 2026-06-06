import Stripe from "stripe";

// Lazy-initialize so the build doesn't crash when STRIPE_SECRET_KEY is absent.
// The instance is only created on the first actual API call (at request time).
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not configured.");
    _stripe = new Stripe(key, {
      apiVersion: "2024-09-30.acacia",
      typescript: true,
    });
  }
  return _stripe;
}

// Keep a named export for backwards-compat with existing imports
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as any)[prop];
  },
});
