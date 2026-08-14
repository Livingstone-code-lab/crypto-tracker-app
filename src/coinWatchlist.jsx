import { Star } from "lucide-react";

export default function CoinWatchlist({}) {
     
    return (
         <div className="flex flex-col items-start">
  <div className="flex items-center gap-2 sm:gap-3 mb-2">
    <Star className="w-6 h-6 sm:w-7 sm:h-7 fill-yellow-400 text-yellow-400 shrink-0" />

    <h6 className="text-xl sm:text-2xl font-medium text-black">
      Your Watchlist
    </h6>
  </div>

  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
    Track your favourite cryptocurrencies and monitor their performance in real-time.
  </p>
</div>
    );
}