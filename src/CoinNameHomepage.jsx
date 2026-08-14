import { Link } from "react-router-dom";

export default function CoinNameHomepage({selectedCoin, chartCurrency, change24Hr, newChartData, arrowDirection, color24h, priceSign24h, watchList, setWatchList}) {


   function watchlistToggle() {
       if (watchList.some(coin => coin.id === selectedCoin.id)) {
         setWatchList(prev => prev.filter(coin => coin.id !== selectedCoin.id));
       } else {
          setWatchList(prev => 
          [...prev, {id: selectedCoin.id, coinName: selectedCoin.name, price: selectedCoin.current_price, symbol: selectedCoin.symbol, marketCap: selectedCoin.market_cap, rank: selectedCoin.market_cap_rank, change24H: selectedCoin.price_change_percentage_24h, image: selectedCoin.image}]
        );
      }
   }
   

   return (
         <div className="flex flex-col mt-10 gap-5">
            <div className="flex h-auto w-65 gap-3">
                <img className="w-20 h-20" src={selectedCoin.image} alt={`${selectedCoin.name} logo`} />
              <div className="flex flex-col justify-around">
               <div className="flex gap-5 justify-center items-center">
              <h5 className="font-semibold">{selectedCoin.name}</h5>
              <p className="text-xs font-medium text-gray-400">{selectedCoin.symbol}</p>
              <p className="text-[10px] text-gray-400">Rank #{selectedCoin.market_cap_rank}</p>
              </div>
                <Link to="/watchlist"><button onClick={() => watchlistToggle()} className="flex outline outline-1 outline-gray-300 text-[10px] pl-2 pr-2 font-medium rounded-[2px] hover:bg-green-300 hover:outline-green-300 hover:text-white">✩ Add to Watchlist</button></Link>
             </div>
           </div>

           <div className="flex flex-col outline outline-1 rounded-[2px] bg-white p-3 outline-gray-300">
              <p className="flex text-gray-400 text-xs">{selectedCoin.name} Price ({selectedCoin.symbol})</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                 <p className="font-bold text-xl sm:text-2xl">{chartCurrency.selectCurrency.sign} {selectedCoin.current_price.toLocaleString()}</p>
                 <div className="flex gap-1 justify-center items-center">
                    <p style={{color: color24h}} className="text-[10px]">{arrowDirection}</p>
                    {newChartData.length < 2 ? <p>N/A</p> : <p style={{color: color24h}} className="text-[10px]">{priceSign24h}{change24Hr}%</p>}
                    <p className="text-[10px]">(24h)</p>
                 </div>
              </div>
           </div>
         </div> 
    );
}