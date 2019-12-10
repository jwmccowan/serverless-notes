import stripePkg from 'stripe';
import { calculateCost } from '../libs/billing-lib';
import { success, failure } from '../libs/response-lib';

export const main = async event => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = 'Scratch charge';

  const stripe = stripePkg(process.env.STRIPE_SECRET_KEY);

  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: 'usd',
    });
    return success({ status: true });
  } catch ({ message}) {
    return failure({ message });
  }
};
