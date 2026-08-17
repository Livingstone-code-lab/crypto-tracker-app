export default function CoinSummaryHomepage({selectedCoin, chartCurrency}) {

    let priceSign1h;
    let color1h;

    const changehour = selectedCoin.RAW?.[chartCurrency.selectCurrency.code]?.CHANGEHOUR;

     if (changehour !== null && changehour > 0) {
        priceSign1h = "+";
     }

     if (changehour !== null && changehour > 0) {
        color1h = "green";
     } else {
        color1h = "red";
     }


    return (
         <div className="flex flex-col sm:flex-row sm:justify-between gap-5">
            <div className="flex flex-col outline outline-1 outline-gray-300 rounded-[2px] w-full sm:w-115 p-3 bg-white">
                <h6 className="flex font-medium text-xs mb-3">Market Stats</h6>
                <div className="flex justify-between">
                    <p className="text-[10px] text-gray-400">Market Rank</p>
                    <p className="text-[10px] font-bold">#{selectedCoin.market_cap_rank}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-[10px] text-gray-400">1h Change</p>
                    {changehour == null ? <p className="text-[10px]">N/A</p> : <p className="text-[10px] font-bold" style={{color: color1h}}>{priceSign1h}{changehour.toFixed(2)}%</p>}
                </div>
                <div className="flex justify-between">
                    <p className="text-[10px] text-gray-400">24h High</p>
                    <p className="text-[10px] font-bold">{chartCurrency.selectCurrency.sign}{selectedCoin.high_24h.toLocaleString()}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-[10px] text-gray-400">24h Low</p>
                    <p className="text-[10px] font-bold">{chartCurrency.selectCurrency.sign}{selectedCoin.low_24h.toLocaleString()}</p>
                </div>  
            </div>


            <div className="flex flex-col outline outline-1 outline-gray-300 rounded-[2px] w-full sm:w-115 p-3 bg-white">
                <h6 className="flex font-medium text-xs mb-3">Supply Information</h6>
                <div className="flex justify-between">
                    <p className="text-[10px] text-gray-400">Circulating Supply</p>
                    <p className="text-[10px] font-bold">{selectedCoin.circulating_supply.toLocaleString()}</p> 
                </div>
                <div className="flex justify-between">
                    <p className="text-[10px] text-gray-400">Total Supply</p>
                    <p className="text-[10px] font-bold">{selectedCoin.total_supply.toLocaleString()}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-[10px] text-gray-400">Max Supply</p>
                    {!selectedCoin.max_supply ? <p className="text-[10px]">N/A</p> : <p className="text-[10px] font-bold">{selectedCoin.max_supply.toLocaleString()}</p>}
                </div>
            </div>
         </div>
    );
}