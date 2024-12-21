import { LoaderFunctionArgs, useLoaderData } from "react-router";

export const loader = ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  return { id: params.id, category };
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  return data;
};

export default function CreateAdForm() {
  const { id, category } = useLoaderData();

  return (
    <div>
      Creating ad with id {id} and category {category}
    </div>
  );
}
