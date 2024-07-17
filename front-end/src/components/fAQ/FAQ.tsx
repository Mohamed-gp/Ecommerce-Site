import FAQElement from "./FAQElement";

const Faq = () => {
  return (
    <section className="relative pt-24 pb-28 bg-blueGray-50 overflow-hidden">
      <img
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        src="flaro-assets/images/faqs/gradient.svg"
        alt=""
      />
      <div className="relative container px-4 mx-auto">
        <div className="md:max-w-4xl mx-auto">
          <h2 className="font-medium text-center text-5xl mb-12">
            Frequently Asked Questions
          </h2>
          <div className="mb-11 flex flex-wrap -m-1">
            <FAQElement
              question="What is SwiftBuy, and does it provide apps for iPhone and Android?"
              answer="SwiftBuy is a cutting-edge ecommerce platform designed to streamline the online shopping experience for both buyers and sellers. Our platform offers a comprehensive suite of features, including product search, order management, communication tools, and secure payment processing. Whether you're looking for the latest products or managing your sales portfolio, SwiftBuy provides a seamless and intuitive experience tailored to your needs. Yes, SwiftBuy is available as a mobile app for both iPhone and Android devices. You can download the SwiftBuy app from the Apple App Store for iOS devices and the Google Play Store for Android devices, allowing you to access our platform anytime, anywhere."
            />
            <FAQElement
              question="Does SwiftBuy offer customer support for users?"
              answer="Yes, SwiftBuy provides dedicated customer support to assist users with any inquiries or issues they may encounter. Our support team is available to answer questions, troubleshoot problems, and provide guidance on using the platform effectively. Whether you need assistance with navigating the app, resolving technical issues, or accessing specific features, our friendly support staff is here to help."
            />
            <FAQElement
              question="How does SwiftBuy ensure the security of online payments?"
              answer="SwiftBuy prioritizes the security of online payments by employing advanced encryption protocols and partnering with trusted payment processors. Our platform ensures that sensitive payment information, such as credit card details or bank account numbers, is securely encrypted and protected from unauthorized access. Additionally, SwiftBuy's secure payment gateway facilitates seamless and reliable transactions, providing peace of mind to all parties involved in the shopping process."
            />
            <FAQElement
              question="What payment methods does SwiftBuy accept for transactions?"
              answer="SwiftBuy offers a variety of payment methods to accommodate the preferences of buyers and sellers. Users can make payments using credit/debit cards, bank transfers, or other popular payment options supported by our platform. With multiple payment methods available, SwiftBuy ensures flexibility and convenience for users when conducting transactions."
            />
            <FAQElement
              question="Is my financial information stored securely on the SwiftBuy platform?"
              answer="Yes, SwiftBuy prioritizes the security and confidentiality of users' financial information. Our platform employs industry-standard encryption protocols and secure data storage practices to safeguard sensitive financial data, such as credit card details or bank account numbers. Additionally, SwiftBuy adheres to strict data protection regulations and privacy policies to ensure that users' financial information is handled with the utmost care and confidentiality, providing peace of mind to all users."
            />
          </div>
          <p className="text-gray-600 text-center font-medium">
            <span>Still have any questions? </span>
            <a
              className="font-semibold text-mainColor hover:text-mainColor/70"
              href="#contactUs"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
export default Faq;
