import {
  LoaderFunctionArgs,
  useLoaderData,
  Form,
  ActionFunctionArgs,
  useSearchParams,
  useNavigate,
} from "react-router";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Select from "../../components/ui/select";
import { createAd } from "../../api/create-ad";
import { AD_BRANDS_MAP, AD_CATEGORIES_MAP } from "../../models/ad.model";
import { getModels } from "../../api/get-models";
import { useState } from "react";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  console.log(`loader called`);

  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  return { id: params.id, category };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  console.log(`data from submit action:`, { adId: params.id, data });

  return data;
};

export default function CreateAdForm() {
  const { id } = useLoaderData();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category") || undefined;
  const [models, setModels] = useState<string[] | undefined>();
  const [selectedModel, setSelectedModel] = useState<string>("");

  const handleCategoryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCategory = e.target.value;
    const ad = await createAd(newCategory);
    navigate(`/create-ad/${ad.id}?category=${ad.category}`);
  };

  const handleBrandChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBrand = e.target.value;
    const models = await getModels(newBrand);
    setModels(models);
    setSelectedModel("");
  };

  return (
    <main className="max-w-md mx-auto">
      <h1>Create ad</h1>
      <small className="flex gap-2 items-center justify-center mt-2">
        ID: {id}
        <Select
          name="category"
          defaultValue={category}
          className="p-1"
          onChange={handleCategoryChange}
        >
          {Array.from(AD_CATEGORIES_MAP.entries()).map(([value, label]) => (
            <option value={value}>{label}</option>
          ))}
        </Select>
      </small>
      <Form method="post" className="mt-8 grid gap-4">
        <Input type="text" name="title" placeholder="Title" />
        <Input type="text" name="price" placeholder="Price" />

        <Select
          name="brand"
          defaultValue=""
          onChange={handleBrandChange}
          className="disabled:opacity-50"
        >
          <option value="" disabled>
            Select brand
          </option>
          {Array.from(AD_BRANDS_MAP.entries()).map(([value, label]) => (
            <option value={value}>{label}</option>
          ))}
        </Select>

        <Select
          name="model"
          disabled={!models}
          className="disabled:opacity-50"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          <option value="" disabled>
            {models ? "Select model" : null}
          </option>
          {models?.map((model) => (
            <option value={model}>{model}</option>
          ))}
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
        </div>
      </Form>
    </main>
  );
}
