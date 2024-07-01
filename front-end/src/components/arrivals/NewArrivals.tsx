import Product from "../product/Product";

export default function NewArrivals() {
  return (
    <div className="container pt-6">
        <p className="pl-3 border-l-mainColor border-l-4 font-bold text-2xl" >New Arrivals</p>
        <div className="flex gap-8 flex-wrap my-12 justify-center">
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
            <Product/>
        </div>
    </div>
  );
}
