import { useContext } from "react";
import { currencyContext } from "./App";
import { Link } from "react-router-dom";

export default function HomePage({id, name, image, symbol, price}) {
    const currencyType = useContext(currencyContext);

    return (
      <Link to={`/coin/${id}`} className="block">
        <div className="flex items-center border-2 rounded-sm mt-5 bg-white hover:bg-gray-200 p-2 gap-3 cursor-pointer transition">
          <img src={image} alt={`${name} logo`} className="w-12 h-12 sm:w-15 sm:h-15 shrink-0" />

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <p className="text-base sm:text-xl font-bold">{name}</p>

              <p className="text-xs sm:text-sm text-gray-500">{symbol}</p>
            </div>

            <p className="text-sm sm:text-xl">Price: {currencyType.selectCurrency.sign}{price.toLocaleString()}</p>
          </div>

        <span className="ml-auto text-xs text-blue-600 whitespace-nowrap">View →</span>
      </div>
    </Link>
    );
}

