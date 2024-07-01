import HeroAboutSection from "../../components/aboutUsComponents/HeroAboutSection.tsx";
import AboutUsTwoGrid from "../../components/aboutUsComponents/AboutUsTwoGrid.tsx";
import SubscribeToUs from "../../components/aboutUsComponents/SubscribeToUs.tsx";
import Faq from "../../components/fAQ/FAQ.tsx";
import ContactUs from "../../components/contactUs/ContactUs.tsx";

const AboutUs = () => {
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
        img="https://files.oaiusercontent.com/file-0DtjtXkgl0NxOOzev1DoOdGK?se=2024-07-01T17%3A22%3A45Z&sp=r&sv=2023-11-03&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D8f597c34-c3f1-420e-9a89-85a9c349cdb1.webp&sig=/vDO%2BuF%2BAnYtbhcOj%2B8W%2BkGu3qD%2Byk3Sa2g7E25fcZc%3D"
        order={1}
      />
      <AboutUsTwoGrid
        title="Why Choose SwiftBuy?"
        description="SwiftBuy stands as a beacon of innovation and efficiency in the realm of online shopping. We've engineered a solution that streamlines every aspect of the shopping experience, ensuring seamless interactions for both buyers and sellers. SwiftBuy embodies our commitment to revolutionizing the way ecommerce is conducted, empowering users with intuitive tools and comprehensive features. So, why choose SwiftBuy? Because we redefine convenience and effectiveness in online shopping, making it the ultimate solution for your ecommerce needs."
        img="https://files.oaiusercontent.com/file-cd5tQEe4qscmXGzBIMSoROgL?se=2024-07-01T17%3A25%3A34Z&sp=r&sv=2023-11-03&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D2604b4e3-e834-4619-9eb0-4f1791e6e645.webp&sig=N7kSkIz//BmHMF2UfsIQuowlB13YmSLeaP790a/CsdE%3D"
        order={0}
      />
      <Faq />
      <ContactUs />
      <SubscribeToUs />
    </>
  );
};
export default AboutUs;
