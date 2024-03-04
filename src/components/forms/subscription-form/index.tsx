"use client";

import { Plan } from "@prisma/client";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Button } from "../../ui/button";
import { toast } from "../../ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  selectedPriceId: string | Plan;
};

const SubscriptionForm = ({ selectedPriceId }: Props) => {
  const router = useRouter();
  const elements = useElements();
  const stripeHook = useStripe();
  const [priceError, setPriceError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!selectedPriceId) {
      setPriceError("You need to select a plan to subscribe.");
      return;
    }

    setPriceError("");
    event.preventDefault();

    if (!elements || !stripeHook) return;

    try {
      const { error } = await stripeHook.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_URL}/agency`,
        },
      });
      if (error) {
        throw new Error();
      }
      toast({
        title: "Payment successful",
        description: "Your payment has been successfully processed. ",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Payment failed",
        description:
          "We couldn't process your payment. Please try a different card",
      });
    }
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <small className="text-destructive">{priceError}</small>
      <PaymentElement />
      <Button disabled={!stripeHook} className="mt-4 w-full">
        Submit
      </Button>
    </form>
  );
};

export default SubscriptionForm;
