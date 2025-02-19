import Activity from "@/components/activity/activity";

type ParamsType = {
  params: Promise<{
    slug: string;
  }>;
};

const page = async ({ params }: ParamsType) => {
  const { slug } = await params;
  return <Activity slug={slug} />;
};

export default page;
