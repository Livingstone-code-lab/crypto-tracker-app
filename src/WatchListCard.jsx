import { useNavigate } from "react-router-dom";

export default function WatchListCard({id, coinName, rank, price, symbol, marketCap, change24H, image, currencyWatchList, removeWatchlist}) {

  const Navigate = useNavigate();

  let formatted;
  let alpha;

  if (marketCap >= 1_000_000_000_000) {
     formatted = (marketCap / 1000000000000).toFixed(2);
     alpha = "T";
  } else if (marketCap >= 1_000_000_000) {
     formatted = (marketCap / 1000000000).toFixed(2);
     alpha = "B";
  } else if (marketCap >= 1_000_000) {
     formatted = (marketCap / 1000000).toFixed(2);
     alpha = "M";
  } else {
     formatted = (marketCap / 1000).toFixed(2);
     alpha = "K";
  }


    return (
         <div className="w-full bg-white border border-gray-200 rounded-xl p-4 sm:p-5 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

  <div className="flex items-center gap-4">
    <img className="w-12 h-12 rounded-full bg-gray-100 shrink-0" src={image} alt={`${coinName} logo`} />

    <div>
      <h6 className="text-base sm:text-lg font-semibold text-gray-800">{coinName}</h6>

      <p className="text-sm text-gray-500 uppercase">{symbol}</p>

      <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Rank #{rank}</span>
    </div>
  </div>


  <div className="flex flex-col gap-4 sm:flex-row sm:gap-10 lg:items-center">

    <div className="text-left sm:text-right">
      <p className="text-xs sm:text-sm text-gray-500">Current Price:</p>

      <p className="font-semibold text-gray-800">{currencyWatchList.selectCurrency.sign}{price.toLocaleString()}</p>
    </div>


    <div className="text-left sm:text-right">
      <p className="text-xs sm:text-sm text-gray-500">24h Change:</p>

      <p className={`font-semibold ${change24H >= 0 ? "text-green-600" : "text-red-600"}`}>{change24H.toFixed(2)}%</p>
    </div>


    <div className="text-left sm:text-right">
      <p className="text-xs sm:text-sm text-gray-500">Market Cap:</p>

      <p className="font-semibold text-gray-800">{currencyWatchList.selectCurrency.sign}{formatted}{alpha}</p>
    </div>

  </div>


  <div className="flex gap-3 w-full lg:w-auto">
    <button onClick={() => Navigate(-1)} className="flex-1 lg:flex-none px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition text-sm">View</button>

    <button onClick={() => removeWatchlist(id)} className="flex-1 lg:flex-none px-4 py-2 rounded-md border border-red-500 text-red-600 hover:bg-red-50 transition text-sm">Remove</button>
  </div>

</div>
    );
}