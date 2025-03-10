import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";

export default function ProductsPage({products}) {
  return (
    <>
      <Header />
      <Center>
        <Title>All products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getStaticProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { '_id': -1 } }).lean();
  
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
    revalidate: 10, // Regenerates page every 10 seconds
  };
}
