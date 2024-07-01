import Hero from "../../components/Hero/Hero";
import NewArrivals from "../../components/arrivals/NewArrivals";
import Daily from "../../components/daily/Daily";
import Phones from "../../components/phones/Phones";

export default function Home() {
  return (
    <>
      {/* disabled */}
      <Hero />
      <div className="bg-bgColorWhite">
        <NewArrivals />
        <Phones />
        <Daily />
      </div>
    </>
  );
}
