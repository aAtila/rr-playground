import { Form, redirect, useLoaderData } from "react-router";
import { createAd } from "../../api/create-ad";

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
    <main>
      <h1>{message}</h1>
      <Form method="post">
        <button name="category" value="car">
          Car
        </button>
        <button name="category" value="motorcycle">
          Motorcycle
        </button>
        <button name="category" value="bike">
          Bike
        </button>
        <button name="category" value="boat">
          Boat
        </button>
        <button name="category" value="truck">
          Truck
        </button>
      </Form>
    </main>
  );
}
