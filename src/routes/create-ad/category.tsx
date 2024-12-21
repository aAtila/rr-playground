import { Form, redirect, useLoaderData } from "react-router";
import { createAd } from "../../api/create-ad";
import Button from "../../components/ui/button";

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

  return redirect(redirectUrl.toString());
};

export default function CreateAdCategory() {
  const { message } = useLoaderData();
  return (
    <main className="max-w-4xl mx-auto">
      <h1>{message}</h1>
      <Form method="post" className="mt-8 grid gap-2">
        <div className="flex gap-2 justify-center">
          <Button name="category" value="car">
            Car
          </Button>
          <Button name="category" value="motorcycle">
            Motorcycle
          </Button>
          <Button name="category" value="bike">
            Bike
          </Button>
          <Button name="category" value="boat">
            Boat
          </Button>
          <Button name="category" value="truck">
            Truck
          </Button>
        </div>
      </Form>
    </main>
  );
}
