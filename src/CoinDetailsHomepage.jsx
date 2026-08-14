export default function CoinDetailsHomepage({selectedCoin, chartCurrency, change7Days, newChartData, color7d, priceSign7d, coinInfo, isLoadingAbout, aboutCoinError}) {

   const volume24hour = selectedCoin.RAW?.[chartCurrency.selectCurrency.code]?.VOLUME24HOUR;
  
   let format;
  let alphabet;

  if (selectedCoin.market_cap >= 1_000_000_000_000) {
     format = (selectedCoin.market_cap / 1000000000000).toFixed(2);
     alphabet = "T";
  } else if (selectedCoin.market_cap >= 1_000_000_000) {
     format = (selectedCoin.market_cap / 1000000000).toFixed(2);
     alphabet = "B";
  } else if (selectedCoin.market_cap >= 1_000_000) {
     format = (selectedCoin.market_cap / 1000000).toFixed(2);
     alphabet = "M";
  } else {
   format = (selectedCoin.market_cap / 1000).toFixed(2);
   alphabet = "K";
  }



   return (
        <div className="flex flex-col gap-10">
           <div className="flex flex-col sm:flex-row sm:justify-between gap-3 w-full">
              <div className="outline outline-1 outline-gray-300 rounded-[2px] w-full sm:w-50 p-2 bg-white">
                <p className="flex text-[10px] text-gray-400">Market Cap</p>
                <p className="flex text-sm font-medium">{chartCurrency.selectCurrency.sign}{format}{alphabet}</p>
              </div>

              <div className="outline outline-1 outline-gray-300 rounded-[2px] w-full sm:w-50 p-2 bg-white">
                <p className="flex text-[10px] text-gray-400">24h Volume</p>
                {volume24hour == null || Number.isNaN(volume24hour) ? <p className="flex text-[10px]">N/A</p> : <div className="flex text-sm font-medium">{chartCurrency.selectCurrency.sign}{volume24hour.toLocaleString()}</div>}
              </div>
                  
              <div className="outline outline-1 outline-gray-300 rounded-[2px] w-full sm:w-50 p-2 bg-white">
                <p className="flex text-[10px] text-gray-400">Circulating Supply</p>
                <p className="flex text-sm font-medium">{selectedCoin.circulating_supply.toLocaleString()}{selectedCoin.symbol}</p>
              </div>

              <div className="outline outline-1 outline-gray-300 rounded-[2px] w-full sm:w-50 p-2 bg-white">
                <p className="flex text-[10px] text-gray-400">7d Change</p>
                   {newChartData.length < 7 ? <p className="text-[10px]">N/A</p> : <p className="flex text-sm font-medium" style={{color: color7d}}>{priceSign7d}{change7Days}%</p>}
              </div>
           </div> 

           <div className="flex flex-col outline outline-1 outline-gray-300 rounded-[2px] bg-white gap-5 p-3">
              <h6 className="flex font-medium text-base">About {selectedCoin.name}</h6>
              <div className="text-gray-400 text-xs leading-relaxed break-words">
                 {isLoadingAbout ? (
                               <div>Loadng coin info...</div>
                           ) : (
                               aboutCoinError ?  (
                            <div>{aboutCoinError}</div>
                           ) : (
                               <div>{coinInfo}</div>
                         ))}
                </div>
           </div>
        </div>
   );
}


