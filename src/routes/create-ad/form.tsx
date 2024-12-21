import { LoaderFunctionArgs, useLoaderData, Form } from "react-router";

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
    <section>
      <h1>Create ad</h1>
      <small>
        Category: {category}, ID: {id}
      </small>
      <Form method="post">
        <input type="text" name="title" placeholder="Title" />
        <textarea name="description" placeholder="Description" />
        <input type="text" name="price" placeholder="Price" />

        <select name="brand" defaultValue="">
          <option value="" disabled>
            Select brand
          </option>
          <option value="toyota">Toyota</option>
          <option value="honda">Honda</option>
          <option value="ford">Ford</option>
        </select>

        <select name="model" defaultValue="">
          <option value="" disabled>
            Select model
          </option>
          <option value="camry">Camry</option>
          <option value="civic">Civic</option>
          <option value="focus">Focus</option>
        </select>

        <input type="text" name="location" placeholder="Location" />

        <fieldset>
          <legend>Transmission</legend>
          <label>
            <input type="radio" name="transmission" value="automatic" />
            Automatic
          </label>
          <label>
            <input type="radio" name="transmission" value="manual" />
            Manual
          </label>
        </fieldset>

        <fieldset>
          <legend>Fuel Type</legend>
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
        </fieldset>

        <fieldset>
          <legend>Condition</legend>
          <label>
            <input type="radio" name="condition" value="new" />
            New
          </label>
          <label>
            <input type="radio" name="condition" value="used" />
            Used
          </label>
        </fieldset>

        <button type="submit">Submit</button>
      </Form>
    </section>
  );
}
