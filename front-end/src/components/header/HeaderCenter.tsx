import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import customAxios from "../../utils/axios/customAxios";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/dbInterfaces";

export default function HeaderCenter() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const searchHandler = () => {
    try {
      navigate(`/store?search=${search.split(" ").join("+")}`);
      setSearch("");
    } catch (error) {
      console.log(error);
    }
  };
  const [changeHandlerProducts, setChangeHandlerProduct] = useState<Product[]>(
    []
  );
  const onChangeHandler = async () => {
    try {
      const { data } = await customAxios.get(`/products?search=${search}`);
      setChangeHandlerProduct(data.data.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (search != "") {
      onChangeHandler();
    }
  }, [search]);

  return (
    <div className="flex items-center rounded-2xl border-2 border-solid border-[#dddddd] text-base md:text-lg">
      <div className="flex items-center justify-center rounded-l-xl p-2">
        <FaMagnifyingGlass />
      </div>
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[50px] pl-1 relative placeholder:text-[0px] focus:outline-none sm:w-[200px] sm:placeholder:text-sm md:w-[300px]"
          placeholder="Search for products"
        />
        <div
          className="absolute left-0 top-12 flex-col w-full"
          onClick={() => setSearch("")}
        >
          {search != "" && (
            <>
              {changeHandlerProducts.map((product) => (
                <div className="relative">
                  <Link
                    to={`/product/${product?._id}`}
                    className="py-2 flex items-center overflow-hidden z-10 bg-white gap-2 px-4 cursor-pointer hover:bg-mainColor/90 duration-500 "
                  >
                    <div className="img w-12 h-12 flex">
                      <img
                        src={product?.images[0]}
                        alt={product?._id}
                        className=""
                      />
                    </div>
                    <p className="">{product?.name}</p>
                  </Link>
                  <div
                    className="absolute w-screen h-screen left-0 top-0 -z-[1]"
                    onClick={() => setSearch("")}
                  ></div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <button
        onClick={() => searchHandler()}
        disabled={search == ""}
        className="bg-mainColor disabled:opacity-50 h-full rounded-r-xl px-3 py-2 text-sm text-[white] hover:opacity-90 duration-300"
      >
        Search
      </button>
    </div>
  );
}
