import { Star } from "lucide-react";
import CoinWatchlist from "./coinWatchlist";
import WatchListCard from "./WatchListCard";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { currencyContext } from "./App";

export default function Watchlist({watchList, setWatchList}) {
    
   const currencyWatchList = useContext(currencyContext);

   function removeWatchlist(id) {
      setWatchList(prev => prev.filter(coin => coin.id !== id));
   }

    return (
         <div className="w-full flex flex-col gap-6 sm:gap-8">
            <CoinWatchlist />
           
            {watchList.length === 0 ? (
  <div className="w-full flex flex-col justify-center items-center text-center outline outline-1 rounded-[2px] bg-white outline-gray-300 py-10 px-4 sm:py-16 sm:px-6 gap-2">

    <Star className="w-12 h-12 sm:w-14 sm:h-14 fill-yellow-400 text-yellow-400" />

    <p className="text-lg sm:text-xl font-medium text-black">Your watchlist is empty</p>

    <p className="text-xs sm:text-sm text-gray-500 max-w-md leading-relaxed">Start tracking cryptocurrencies by clicking any coin</p>

    <Link to="/">
      <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition mt-3 text-sm">Browse Cryptocurrencies</button>
    </Link>

  </div>
) : (
  <div className="flex flex-col gap-4">
    {watchList.map(coin => (
      <WatchListCard
        key={coin.id}
        id={coin.id}
        coinName={coin.coinName}
        rank={coin.rank}
        price={coin.price}
        symbol={coin.symbol}
        marketCap={coin.marketCap}
        change24H={coin.change24H}
        image={coin.image}
        currencyWatchList={currencyWatchList}
        removeWatchlist={removeWatchlist}
      />
    ))}
  </div>
)}
         </div>
    );
}