import {
  LoaderFunctionArgs,
  useLoaderData,
  Form,
  redirect,
  ActionFunctionArgs,
} from "react-router";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Select from "../../components/ui/select";
import { createAd } from "../../api/create-ad";

export const loader = ({ request, params }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  return { id: params.id, category };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const url = new URL(request.url);
  const category = url.searchParams.get("category");

  if (data.intent === "create" && category) {
    const ad = await createAd(category);
    const redirectUrl = new URL(`/create-ad/${ad.id}`, url.origin);
    redirectUrl.searchParams.set("category", category);

    return redirect(redirectUrl.href);
  }

  if (data.intent === "submit") {
    console.log(`data from submit action:`, { adId: params.id, data });
  }

  return data;
};

export default function CreateAdForm() {
  const { id, category } = useLoaderData();

  return (
    <main className="max-w-md mx-auto">
      <h1>Create ad</h1>
      <small>
        Category: {category}, ID: {id}
      </small>
      <Form method="post" className="mt-8 grid gap-4">
        <Input type="text" name="title" placeholder="Title" />
        <Input type="text" name="price" placeholder="Price" />

        <Select name="brand" defaultValue="">
          <option value="" disabled>
            Select brand
          </option>
          <option value="toyota">Toyota</option>
          <option value="honda">Honda</option>
          <option value="ford">Ford</option>
        </Select>

        <Select name="model" defaultValue="">
          <option value="" disabled>
            Select model
          </option>
          <option value="camry">Camry</option>
          <option value="civic">Civic</option>
          <option value="focus">Focus</option>
        </Select>

        <Input type="text" name="location" placeholder="Location" />

        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="px-4">Transmission</legend>
          <div className="flex gap-4 justify-center">
            <label>
              <input type="radio" name="transmission" value="automatic" />
              Automatic
            </label>
            <label>
              <input type="radio" name="transmission" value="manual" />
              Manual
            </label>
          </div>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="px-4">Fuel Type</legend>
          <div className="flex gap-4 justify-center">
            <label>
              <input type="radio" name="fuelType" value="petrol" />
              Petrol
            </label>
            <label>
              <input type="radio" name="fuelType" value="diesel" />
              Diesel
            </label>
            <label>
              <input type="radio" name="fuelType" value="electric" />
              Electric
            </label>
            <label>
              <input type="radio" name="fuelType" value="hybrid" />
              Hybrid
            </label>
          </div>
        </fieldset>

        <fieldset className="border border-gray-300 rounded-md p-4">
          <legend className="px-4">Condition</legend>
          <div className="flex gap-4 justify-center">
            <label>
              <input type="radio" name="condition" value="new" />
              New
            </label>
            <label>
              <input type="radio" name="condition" value="used" />
              Used
            </label>
          </div>
        </fieldset>

        <div className="flex gap-2 justify-center">
          <Button name="intent" value="submit" type="submit">
            Submit
          </Button>
          <Button name="intent" value="create" type="submit">
            Create new ad
          </Button>
        </div>
      </Form>
    </main>
  );
}
