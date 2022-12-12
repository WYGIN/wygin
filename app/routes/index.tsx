// app/routes/index.tsx
import { SliceZone } from "@prismicio/react";
import type { PrismicDocument } from "@prismicio/types";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Hero from "slices/Hero";
import { getPrismicClient } from "~/utils/prismicio";

export const loader: LoaderFunction = async () => {
	const client = getPrismicClient();
  const customType = "page";
  const uid = "home";

  try {
    const doc = await client.getByUID(customType, uid);
    return json(doc.data);
  } catch (error) {
    throw new Response("Not found", {
      status: 404,
    });
  }
};

export default function Index() {
  const data = useLoaderData<PrismicDocument["data"]>();

  return (
    <div>
      <h1>Welcome to Remix</h1>
      <SliceZone
        slices={data.slices}
        components={{ hero: Hero }}
      />
    </div>
  );
}