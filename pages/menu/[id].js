import { useRouter } from "next/router";

import DetailsPage from "@/components/templates/DetailsPage";

function Detailes({ data }) {
  const router = useRouter();
  if (router.isFallback) {
    return <h2>Loading Page...</h2>;
  }

  return <DetailsPage {...data} />;
}

export default Detailes;

export async function getStaticPaths() {
  const res = await fetch(`https://online-api-love-food1.vercel.app/data`);
  const json = await res.json();
  const data = json.slice(0, 10);

  const paths = data.map((food) => ({ params: { id: food.id.toString() } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const {
    params: { id },
  } = context;
  console.log(id)

  const res = await fetch(`https://online-api-love-food1.vercel.app/data/${id}`);
  const data = await res.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data },
    revalidate: 3600, // seconds
  };
}
