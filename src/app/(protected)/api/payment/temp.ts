import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import DodoPayments from "dodopayments";

export const dodopayments = new DodoPayments({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY, // This is the default and can be omitted if env is named as DODO_PAYMENTS_API_KEY
  environment: "test_mode", // defaults to 'live_mode'
});

export async function GET() {
  const user = await currentUser();

  if (!user) return NextResponse.json({ status: 404 });

  const priceId = process.env.DODOPAYMENTS_SUBSCRIPTION_ID;

  // create subsciption seesion
  const session = await dodopayments.subscriptions.create({
    billing: { city: 'city', country: 'AF', state: 'state', street: 'street', zipcode: 'zipcode' },
    customer: { customer_id: 'customer_id' },
    product_id: 'product_id',
    quantity: 1,
  })
}
