import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const ContactUs = () => {
  return (
    <section className=" " id="contactUs">
      <div className="container px-6 py-12 mx-auto">
        <div className="flex flex-col items-center">
          <p className="font-medium text-center text-5xl">Contact us</p>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Our friendly team would love to hear from you.
          </p>
        </div>

        <div className="flex gap-12 justify-center mt-12">
          <div className="flex justify-center items-center flex-col border-buttonColor w-[250px] border-2 p-6 rounded-2xl">
            <span className="inline-block text-buttonColor rounded-full text-2xl">
              <MdEmail />
            </span>

            <h2 className="mt-4 text-base font-medium text-buttonColor">
              Email
            </h2>
            <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              Our friendly team is here to help.
            </p>
            <p className="mt-2 text-sm hover:text-buttonColor duraiton-500 ">
              krelli@estin.dz
            </p>
          </div>

          <div className="flex justify-center items-center flex-col border-buttonColor border-2 p-6 w-[250px] rounded-2xl">
            <span className="inline-block text-buttonColor rounded-full text-2xl">
              <FaLocationDot />
            </span>
            <h2 className="mt-4 text-base font-medium text-buttonColor">
              Office
            </h2>
            <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              Come say hello at our office HQ.
            </p>
            <p className="mt-2 text-sm hover:text-buttonColor duraiton-500 ">
              N75, Amizour
            </p>
          </div>

          <div className="flex justify-center items-center flex-col border-buttonColor border-2 p-6 rounded-2xl w-[250px]">
            <span className="inline-block text-buttonColor rounded-full text-2xl">
              <FaPhone />
            </span>

            <h2 className="mt-4 text-base font-medium text-buttonColor">
              Phone
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              24/7 Response
            </p>
            <p className="mt-2 text-sm hover:text-buttonColor duraiton-500 ">
              +1 (555) 000-0000
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactUs;
