import Product from "../product/Product";

export default function Phones() {
  return (
    <div className="container py-6">
    <p className="pl-3 border-l-mainColor border-l-4 font-bold text-2xl">Phones</p>
    <div className="flex gap-8 flex-wrap my-12 justify-center" >
        <Product/>
        <Product/>
        <Product/>
        <Product/>
    </div>
</div>
  )
}