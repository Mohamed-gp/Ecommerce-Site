import HeroAboutSection from "../../components/aboutUsComponents/HeroAboutSection.tsx";
import AboutUsTwoGrid from "../../components/aboutUsComponents/AboutUsTwoGrid.tsx";
import SubscribeToUs from "../../components/aboutUsComponents/SubscribeToUs.tsx";
import Faq from "../../components/fAQ/FAQ.tsx";
import ContactUs from "../../components/contactUs/ContactUs.tsx";
import { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);
  return (
    <>
      <HeroAboutSection
        title="Transform Your Shopping Experience with Our"
        subTitle="Ecommerce Platform"
        desc="Effortlessly browse, purchase, and manage your favorite products with ease. Enhance your shopping experience, make informed decisions, and enjoy a seamless, efficient journey from browsing to checkout."
      />
      <AboutUsTwoGrid
        title="About Us"
        description="We're dedicated to revolutionizing the shopping experience for everyone. Our ecommerce platform is designed to meet the unique needs of customers and sellers alike. Our mission is simple: to provide an intuitive and seamless tool that allows you to effortlessly discover, purchase, and manage your favorite products."
        // img="aboutus.webp"
        img="/2741840.svg"
        order={1}
      />
      <AboutUsTwoGrid
        title="Why Choose SwiftBuy?"
        description="SwiftBuy stands as a beacon of innovation and efficiency in the realm of online shopping. We've engineered a solution that streamlines every aspect of the shopping experience, ensuring seamless interactions for both buyers and sellers. SwiftBuy embodies our commitment to revolutionizing the way ecommerce is conducted, empowering users with intuitive tools and comprehensive features. So, why choose SwiftBuy? Because we redefine convenience and effectiveness in online shopping, making it the ultimate solution for your ecommerce needs."
        img="/Ecommerce web page-pana.svg"
        order={0}
      />
      <Faq />
      <ContactUs />
      <SubscribeToUs />
    </>
  );
};
export default AboutUs;
