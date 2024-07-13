import Product from "../../components/product/Product";

const Store = () => {
  return (
    <div className="container pt-6 mt-6">
      <p className="pl-3 border-l-mainColor border-l-4 font-bold text-2xl">
        Store
      </p>
      <div className="flex gap-8 flex-wrap my-12 justify-center">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </div>
  );
};
export default Store;
