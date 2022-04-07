import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
const PUBLIC_KEY = `${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`;

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = ({ price, closeModal }) => {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm price={price} closeModal={closeModal} />
    </Elements>
  );
};
export default StripeContainer;
