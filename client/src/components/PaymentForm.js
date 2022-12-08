import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import axios from "axios";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const PaymentForm = ({ closeModal, price }) => {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (price) => {
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: "Elon Musk",
        address: {
          city: "Tbilisi",
          country: "IN",
          line1: "212134",
          line2: "124234",
          postal_code: "575 014",
          state: null,
        },
      },
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("https://fresh-server.vercel.app/payment", {
          amount: price * 100,
          id,
        });
        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
        console.log(response);
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };
  if (success) {
    closeModal(false);
  }
  return (
    <>
      {!success ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(price);
          }}
        >
          <div className="w-screen h-101  flex justify-center items-center">
            <div className="w-1/2 rounded bg-white shadow-xl">
              <div>
                <h1 className="text-2xl font-bold p-2">Stripe Checkout</h1>
              </div>
              <div>
                <fieldset className="text-center">
                  <div className="FormGroup">
                    <div className="FormRow ">
                      <CardElement options={CARD_OPTIONS} />
                    </div>
                  </div>
                  <div className="flex justify-around pb-7">
                    <button
                      onClick={() => closeModal(false)}
                      className="bg-red-500  text-white px-6  py-05 font-medium rounded-md hover:bg-red-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-primary text-white px-8  py-05 font-medium rounded-md hover:bg-green-900"
                    >
                      Pay
                    </button>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div>
          <div className="w-screen h-101  text-center flex justify-center items-center">
            <div>
              <h1 className="text-2xl font-bold p-2">Payment Successful !</h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default PaymentForm;
