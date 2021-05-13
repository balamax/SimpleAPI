const stripe = require('stripe')('rk_test_51IbK3NSE0kylik7P8xZUi9NxNtJDA4hOHeS2vaKM5OxiYxumhGlemYYVgllXnrGcRAezS9lzArQJMsI8Wph1SwxT00jLYLdq9G');
 
const createUser = async () => {
try {
  const customer = await stripe.customers.create({
    email: 'balacrz@gmail.com',
  });
  console.log(customer);
  return customer;
} catch (error) {
  console.error(error);
}
};

const addCreditCard = async (user, card) => {
try {
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card,
  });
  console.log(paymentMethod);
  const attached = await stripe.paymentMethods.attach(paymentMethod.id, {
    customer: user.id,
  });
  console.log(attached);
  return paymentMethod;
} catch (error) {
  console.error(error);
}
};

const processPayment = async (user, card) => {
try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1250,
    customer: user.id,
    currency: 'usd',
    payment_method: card.id,
  });
  console.log(paymentIntent);
} catch (error) {
  console.error(error);
}
};

(async () => {
 try {
   console.log('Stripe demo');
   // TODO: create user
   const user = await createUser();
   // TODO: add credit card to user
   const creditCard = await addCreditCard(user, {
  	number: '4242424242424242',
  	exp_month: 9,
  	exp_year: 2021,
  	cvc: '314',
   });
   // TODO: create payment intent for user
   await processPayment(user, creditCard);
 } catch (e) {
   console.error(e);
 }
})();
