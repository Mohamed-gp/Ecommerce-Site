import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  return (
    <section className="py-12" id="contactUs">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center">
          <p className="font-medium text-center text-5xl">Contact us</p>
          <p className="mt-3 text-gray-500 dark:text-gray-400 text-center">
            Our friendly team would love to hear from you.
          </p>
        </div>

        <div className="flex gap-12 justify-center mt-12 flex-wrap">
          <div className="flex justify-center items-center flex-col border-mainColor w-[250px] border-2 p-6 rounded-2xl">
            <span className="inline-block text-mainColor rounded-full text-2xl">
              <MdEmail />
            </span>

            <h2 className="mt-4 text-base font-medium text-mainColor">Email</h2>
            <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              Our friendly team is here to help.
            </p>
            <p className="mt-2 text-sm hover:text-mainColor duration-500">
              swift@buy.dz
            </p>
          </div>

          <div className="flex justify-center items-center flex-col border-mainColor border-2 p-6 w-[250px] rounded-2xl">
            <span className="inline-block text-mainColor rounded-full text-2xl">
              <FaLocationDot />
            </span>
            <h2 className="mt-4 text-base font-medium text-mainColor">
              Office
            </h2>
            <p className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
              Come say hello at our office HQ.
            </p>
            <p className="mt-2 text-sm hover:text-mainColor duration-500">
              N75, Algeria
            </p>
          </div>

          <div className="flex justify-center items-center flex-col border-mainColor border-2 p-6 rounded-2xl w-[250px]">
            <span className="inline-block text-mainColor rounded-full text-2xl">
              <FaPhone />
            </span>

            <h2 className="mt-4 text-base font-medium text-mainColor">Phone</h2>
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              24/7 Response
            </p>
            <p className="mt-2 text-sm hover:text-mainColor duration-500">
              +1 (555) 000-0000
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
};

export default ContactUs;
