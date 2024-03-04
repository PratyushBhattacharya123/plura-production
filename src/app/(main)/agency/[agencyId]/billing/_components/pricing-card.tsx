"use client";
// import SubscriptionFormWrapper from '@/components/forms/subscription-form/subscription-form-wrapper'
import CustomModal from "@/components/global/custom-modal";
import SubscriptionFormWrapper from "@/components/forms/subscription-form/subscription-form-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PricesList } from "@/lib/types";
import { useModal } from "@/providers/modal-provider";
import { Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  features: string[];
  buttonCta: string;
  title: string;
  description: string;
  amt: string;
  duration: string;
  highlightTitle: string;
  highlightDescription: string;
  customerId: string;
  prices: PricesList["data"];
  planExists: boolean;
};

const PricingCard = ({
  amt,
  buttonCta,
  customerId,
  description,
  duration,
  features,
  highlightDescription,
  highlightTitle,
  planExists,
  prices,
  title,
}: Props) => {
  const { setOpen } = useModal();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  const handleManagePlan = async () => {
    setOpen(
      <CustomModal
        title={"Manage Your Plan"}
        subheading="You can change your plan at any time from the billings settings"
      >
        <SubscriptionFormWrapper
          customerId={customerId}
          planExists={planExists}
        />
      </CustomModal>,
      async () => ({
        plans: {
          defaultPriceId: plan ? plan : "",
          plans: prices,
        },
      })
    );
  };

  return (
    <Card className="flex flex-col justify-between lg:w-1/2">
      <div>
        <CardHeader className="flex flex-col md:!flex-row justify-between">
          <div className="flex-1">
            <CardTitle>{title}</CardTitle>
            <CardDescription className="mb-2 md:mb-0 mt-2">
              {description}
            </CardDescription>
          </div>
          <p className="text-5xl md:text-4xl font-bold">
            {amt === "$0" ? "Free" : amt}
            {amt !== "$0" && (
              <small className="text-xs font-light text-muted-foreground">
                {duration}
              </small>
            )}
          </p>
        </CardHeader>
        <CardContent>
          {features.map((feature) => (
            <div
              key={feature}
              className="list-disc ml-4 text-muted-foreground flex gap-2"
            >
              <Check size={20} className="mt-[2px]" />
              {feature}
            </div>
          ))}
        </CardContent>
      </div>
      <CardFooter>
        <Card className="w-full">
          <div className="flex flex-col md:!flex-row items-center justify-between rounded-lg border gap-4 p-4">
            <div>
              <p>{highlightTitle}</p>
              <p className="text-sm text-muted-foreground">
                {highlightDescription}
              </p>
            </div>

            <Button className="md:w-fit w-full" onClick={handleManagePlan}>
              {buttonCta}
            </Button>
          </div>
        </Card>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
