import { FaMagnifyingGlass } from "react-icons/fa6";

export default function HeaderCenter() {
  return (
    <div className="flex items-center rounded-2xl border-2 border-solid border-[#dddddd] text-base md:text-lg">
      <div className="flex items-center justify-center rounded-l-xl p-2">
        <FaMagnifyingGlass />
      </div>
      <input
        type="text"
        className="w-[50px] pl-1 placeholder:text-[0px] focus:outline-none sm:w-[200px] sm:placeholder:text-sm md:w-[300px]"
        placeholder="Search for products"
      />
      <button className="bg-mainColor h-full rounded-r-xl px-3 py-2 text-sm text-[white] hover:opacity-90 duration-300">
        Search
      </button>
    </div>
  );
}
