import Product from "../product/Product";

export default function Daily() {
  return (
    <div className="container py-6">
      <p className="border-l-4 border-l-mainColor pl-3 text-2xl font-bold">
        Daily
      </p>
      <div className="my-12 flex flex-wrap justify-center gap-8">
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
}
