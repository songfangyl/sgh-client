import Header from "@/components/Header";
import Featured from "@/components/Featured";
import {Product} from "@/models/Product";
import {mongooseConnect} from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import Footer from "@/components/Footer";

export default function HomePage({featuredProduct,newProducts}) {
  return (
    <>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const featuredProductId = '67aecbc4fb9d784cff61a35e';
  await mongooseConnect();

  const featuredProduct = await Product.findById(featuredProductId).lean();
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 }).lean();

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
    revalidate: 10, // Regenerate the page every 10 seconds
  };
}