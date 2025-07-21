import { FaTruck, FaCreditCard, FaHeadset } from "react-icons/fa";

const Features = () => {
  return (
    <section className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center justify-center gap-4 group hover:text-mainColor transition-colors duration-300">
            <FaTruck className="text-3xl text-mainColor group-hover:scale-110 transition-transform duration-300" />
            <div>
              <h3 className="font-semibold text-lg">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over $100</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 group hover:text-mainColor transition-colors duration-300">
            <FaCreditCard className="text-3xl text-mainColor group-hover:scale-110 transition-transform duration-300" />
            <div>
              <h3 className="font-semibold text-lg">Secure Payment</h3>
              <p className="text-sm text-gray-600">100% secure payment</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 group hover:text-mainColor transition-colors duration-300">
            <FaHeadset className="text-3xl text-mainColor group-hover:scale-110 transition-transform duration-300" />
            <div>
              <h3 className="font-semibold text-lg">24/7 Support</h3>
              <p className="text-sm text-gray-600">Dedicated support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
