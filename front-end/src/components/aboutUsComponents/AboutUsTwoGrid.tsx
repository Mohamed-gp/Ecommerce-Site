interface AboutUsTwoGridInterface {
  title: string;
  description: string;
  img: string;
  order: number;
}

const AboutUsTwoGrid = ({
  title,
  description,
  img,
  order,
}: AboutUsTwoGridInterface) => {
  return (
    <section className="py-14 lg:py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-9 ">
          <div className={`${order == 1 ? "order-1" : ""} img-box`}>
            <img
              src={img}
              alt="About Us tailwind page"
              className="max-lg:mx-auto rounded-3xl w-[500px]"
            />
          </div>
          <div className="lg:pl-[100px] flex items-center">
            <div className="data w-full ">
              <h2 className="font-manrope font-bold text-3xl lg:text-4xl  mb-9 max-lg:text-center relative">
                {title}{" "}
              </h2>
              <p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutUsTwoGrid;

// <section className="py-14 lg:py-24 relative">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative ">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
//             <div className="img-box">
//               <img
//                 src="https://pagedone.io/asset/uploads/1702034769.png"
//                 alt="About Us tailwind page"
//                 className="max-lg:mx-auto"
//               />
//             </div>
//             <div className="lg:pl-[100px] flex items-center">
//               <div className="data w-full">
//                 <h2 className="font-manrope font-bold text-4xl lg:text-5xl text-black mb-9 max-lg:text-center relative">
//                   About Us{" "}
//                 </h2>
//                 <p className="font-normal text-xl leading-8 text-gray-500 max-lg:text-center max-w-2xl mx-auto">
// We're committed to simplifying the rental experience for
// everyone in Algeria. Pagedone offers a platform tailored to
// the needs of tenants and landlords in the region. Our goal is
// straightforward: to provide an intuitive tool that enables you
// to effortlessly find and manage your perfect rental property
// in Algeria.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
