import { useState } from "react";
import { motion } from "framer-motion";

interface FAQElementInterface {
  question: string;
  answer: string;
}

const FAQElement = ({ question, answer }: FAQElementInterface) => {
  const [open, setopen] = useState(false);
  return (
    <div className="w-full p-1">
      <div onClick={() => setopen((prev) => !prev)} className="py-7 cursor-pointer px-8 bg-white bg-opacity-60 border-2 hover:border-indigo-600 duration-500 rounded-2xl shadow-10xl">
        <div className="flex flex-wrap justify-between -m-5">
          <div className="flex-1 p-2"  >
            <h3 className="text-lg font-semibold leading-normal">{question}</h3>
            {open && (
              <motion.p

                initial={{ opacity: 0 ,height : 0}} 
                animate={{ opacity: .7,height : "auto"}}
                transition={{ duration: .1 }}
                className={`text-gray-600 mt-2   `}
              >
                {answer}
              </motion.p>
            )}
          </div>
          <div className="w-auto p-2">
            <svg
              className={` relative top-1 cursor-pointer ${
                open ? "rotate-0" : "rotate-180"
              } duration-500`}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.16732 12.5L10.0007 6.66667L15.834 12.5"
                stroke="#4F46E5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FAQElement;
