import { db } from "@/lib/db";
import { redirect } from "next/navigation";

type Props = {
  params: {
    subaccountId: string;
  };
};

const Pipelines = async ({ params }: Props) => {
  const pipelineExists = await db.pipeline.findFirst({
    where: { subAccountId: params.subaccountId },
  });

  if (pipelineExists) {
    return redirect(
      `/subaccount/${params.subaccountId}/pipelines/${pipelineExists.id}`
    );
  }
};

export default Pipelines;
