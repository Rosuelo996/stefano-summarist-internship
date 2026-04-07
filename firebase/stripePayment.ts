import app from "./firebase";
import {
  createCheckoutSession,
  getStripePayments,
} from "@invertase/firestore-stripe-payments";

const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});

export async function getCheckoutUrl(
  priceId: string,
  hasTrial: boolean
): Promise<string> {
  const session = await createCheckoutSession(payments, {
    price: priceId,
    success_url: window.location.origin + "/settings",
    cancel_url: window.location.origin + "/choose-plan",
    ...(hasTrial && { trial_period_days: 7 }),
  });

  return session.url;
}
