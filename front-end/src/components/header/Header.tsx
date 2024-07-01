import HeaderCenter from "./HeaderCenter";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";

export default function Header() {
  return (
    <header className={`bg-white sticky z-[9999] left-0 top-0`}  style={{boxShadow: "rgba(0, 0, 0, 0.56) 4px -4px 70px 4px"}}>
      <div className="container flex items-center justify-between gap-2 py-4">
        <HeaderLeft />
        <HeaderCenter />
        <HeaderRight />
      </div>
    </header>
  );
}
