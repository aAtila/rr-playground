import { Form, redirect, useLoaderData } from "react-router";
import { createAd } from "../../api/create-ad";
import Button from "../../components/ui/button";
import { AD_CATEGORIES_MAP } from "../../models/ad.model";

export const loader = () => {
  return { message: "Pick a category" };
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const category = formData.get("category")?.toString();
  if (!category) {
    return { error: "Category is required" };
  }
  const ad = await createAd(category);
  const redirectUrl = new URL(`/create-ad/${ad.id}`, request.url);
  redirectUrl.searchParams.set("category", category);

  return redirect(redirectUrl.href);
};

export default function CreateAdCategory() {
  const { message } = useLoaderData();

  return (
    <main className="max-w-4xl mx-auto">
      <h1>{message}</h1>
      <Form method="post" className="mt-8 grid gap-2">
        <div className="flex gap-2 justify-center">
          {Array.from(AD_CATEGORIES_MAP.entries()).map(([value, label]) => (
            <Button name="category" value={value}>
              {label}
            </Button>
          ))}
        </div>
      </Form>
    </main>
  );
}
