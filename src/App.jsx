import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import CoinDetails from "./CoinDetails"
import News from "./News";
import Watchlist from "./Watchlist";
import Portfolio from "./Portfolio";
import NavBar from "./NavBar";
import { useEffect, useState, useMemo, createContext } from "react";

export const currencyContext = createContext();

export const languageContext = createContext();


export default function App() {

  const [coinsArrOne, setCoinsArrOne] = useState([]);

  const [coinsArrTwo, setCoinsArrTwo] = useState([]);

  const [coinsArrThree, setCoinsArrThree] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

   const newError = {
        networkError: "Unable to connect to the cryptocurrency services. Please try again.",
        coinGeckoError: "Unable to load cryptocurrency market data.",
        cryptoCompareError: "Unable to load market statistics.",
        currentApiError: "Unable to load the latest crypto news.",
        coinGeckoRateLimit: "CoinGecko request limit reached. Please try again later.",
        cryptoCompareRateLimit: "CryptoCompare request limit reached. Please try again later.",
        currentApiRateLimit: "News request limit reached. Please try again later.",
        serverError: "The server is currently unavailable."
   }


  const [searchInput, setSearchInput] = useState("");
  
  const [selectCurrency, setSelectCurrency] = useState({
         code: "USD",
         sign: "$"
  });
  
  const [selectLanguage, setSelectLanguage] = useState("en");

  const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem("watchList")) || []);

  useEffect(() => {
     localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);


 useEffect(() => {
  async function fetchCoins() {
    try {
      
      setError(null);
      setIsLoading(true);

      const [resOne, resTwo, resThree] = await Promise.all([
       fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selectCurrency.code.toLowerCase()}&order=market_cap_desc&per_page=100&page=1`),
        fetch(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=${selectCurrency.code.toUpperCase()}&apiKey=06bb5a879b7ab7b35b98a8062843795245eb1c945461a66c2c00a742a602336b`),
        fetch(`https://api.currentsapi.services/v1/search?keywords=crypto&language=${selectLanguage}&page_size=20&apiKey=Qe318OIln8ixHQA0x7WYMHO3enXCUvF7ojW7zWffnEZ2Sx4b`)
      ])


      // coingecko error
      if (resOne.status === 400 || resOne.status === 404) {
        setError(newError.coinGeckoError);
        return;
      }

      if (resOne.status === 429) {
        setError(newError.coinGeckoRateLimit);
        return;
      }

      if(resOne.status === 500 ||  resOne.status === 502 || resOne.status === 503 || resOne.status === 504) {
        setError(newError.serverError);
        return;
      }

      // cryto compare error
      if (resTwo.status === 400 || resTwo.status === 404) {
        setError(newError.cryptoCompareError);
        return;
      }

      if (resTwo.status === 429) {
        setError(newError.cryptoCompareRateLimit);
        return;
      }

      if(resTwo.status === 500 ||  resTwo.status === 502 || resTwo.status === 503 || resTwo.status === 504) {
        setError(newError.serverError);
        return;
      }

      // newsApi error
      if (resThree.status === 400 || resThree.status === 404) {
        setError(newError.currentApisError);
        return;
      }

      if (resThree.status === 429) {
        setError(newError.currentApiRateLimit);
        return;
      }

      if(resThree.status === 500 ||  resThree.status === 502 || resThree.status === 503 || resThree.status === 504) {
        setError(newError.serverError);
        return;
      }


      const dataOne = await resOne.json();
      const dataTwo = await resTwo.json();
      const dataThree = await resThree.json();

   
      if (dataOne.length > 0) {
         setCoinsArrOne(dataOne);
      } else {
         setError(newError.coinGeckoError);
         return;
      }


      if (dataTwo.hasOwnProperty("Data") && (dataTwo.Data.length > 0)) {
         setCoinsArrTwo(dataTwo.Data);
      } else {
         setError(newError.cryptoCompareError);
         return;
      }


      if (dataThree.hasOwnProperty("news") && (dataThree.news.length > 0)) {
         setCoinsArrThree(dataThree.news);
      } else {
         setError(newError.currentApiError);
         return;
      }
      
      
       setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      setError(newError.networkError);

    } finally {
      setIsLoading(false);
    }
  }

  fetchCoins();

 }, [selectCurrency, selectLanguage]);



 // merged array 
  const trueCoinsArr = useMemo(() => {
     return coinsArrOne.map((coin) => {
        const extraData = coinsArrTwo.find((item) => 
            item.CoinInfo.Name.toLowerCase() === coin.symbol.toLowerCase()
      );

       if (extraData) {
          return {
            ...coin, 
            ...extraData
          }
       } else {
        return {...coin}
       }
    });
  }, [coinsArrOne, coinsArrTwo]);



// search coins
  const searchCoin = useMemo(() => {
     return trueCoinsArr.filter(coin => 
      coin.name.toLowerCase().includes(searchInput.toLowerCase())
     );
 }, [trueCoinsArr, searchInput]);


 // context providers 
 let currency = {
  selectCurrency,
  setSelectCurrency
}

 let language = {
   selectLanguage,
   setSelectLanguage
 }




return (
    <languageContext.Provider value={language}>
      <currencyContext.Provider value={currency}>
        <div className="w-full min-h-screen bg-gray-100 pt-15 pb-10 px-3 overflow-x-hidden">
           <NavBar searchInput={searchInput} setSearchInput={setSearchInput} selectCurrency={selectCurrency} setSelectCurrency={setSelectCurrency} selectLanguage={selectLanguage} setSelectLanguage={setSelectLanguage} />
          <Routes>
             <Route path="/" element={
                 <div>
                    {isLoading ? (
                      <div>
                         <p>Loading coins...</p>
                      </div>
                    ) : (
                       <div>
                          {error ? (
                            <div>{error}</div>
                          ) : (
                            <div>
                               {searchCoin.map(coin => (
                           <HomePage
                            key={coin.id}
                            id={coin.id}
                            name={coin.name}
                            symbol={coin.symbol}
                            image={coin.image}
                            price={coin.current_price}
                            marketCap={coin.market_cap}
                            volume={coin.LASTVOLUME}
                            rank={coin.market_cap_rank}
                            high24h={coin.high_24h}
                            low24h={coin.low_24h}
                            priceChange24h={coin.price_change_24h}
                            priceChangePercentage24h={coin.price_change_percentage_24h}
                            ath={coin.ath}
                            athDate={coin.ath_date}
                            atl={coin.atl}
                            atlDate={coin.atl_date}
                            circulatingSupply={coin.circulating_supply}
                            totalSupply={coin.total_supply}
                            maxSupply={coin.max_supply}
                            algorithm={coin.Algorithm}
                            blockTime={coin.BlockTime}
                            proofType={coin.proofType}
                            launchDate={coin.AssetLaunchDate}
                            url={coin.Url}
                            change24Hour={coin.CHANGE24HOUR}
                            changeDay={coin.CHANGEDAY}
                            changeHour={coin.CHANGEHOUR}
                            changePct24Hour={coin.CHANGEPCT24HOUR}
                            changePctDay={coin.CHANGEPCTDAY}
                            changePctHour={coin.CHANGEPCTHOUR}
                            highDay={coin.HIGHDAY}
                            lowDay={coin.LOWDAY}
                            open24Hour={coin.OPEN24HOUR}
                            openDay={coin.OPENDAY}
                            openHour={coin.OPENHOUR}
                            highHour={coin.HIGHHOUR}
                            lowHour={coin.LOWHOUR}
                            volume24Hour={coin.VOLUME24HOUR}
                            volume24HourTo={coin.VOLUME24HOURTO}
                            volumeDay={coin.VOLUMEDAY}
                            volumeDayTo={coin.VOLUMEDAYTO}
                            volumeHour={coin.VOLUMEHOUR}
                            volumeHourTo={coin.VOLUMEHOURTO}
                            totalVolume24h={coin.TOTALVOLUME24H}
                            totalVolume24hTo={coin.TOTALVOLUME24HTO}
                            topTierVolume24Hour={coin.TOPTIERVOLUME24HOUR}
                            topTierVolume24HourTo={coin.TOPTIERVOLUME24HOURTO}
                            market={coin.MARKET}
                            lastMarket={coin.LASTMARKET}
                            lastUpdated={coin.last_updated}
                            median={coin.MEDIAN}
                            openPrice={coin.openPrice}
                            supply={coin.SUPPLY}
                            circulatingSupplyMarketCap={coin.CIRCULATINGSUPPLTMKTCAP}
                            weissRating={coin.weissRating}
                            technologyAdoptionRating={coin.TechnologyAdoptionRating}
                            marketPerformanceRating={coin.MarketPerformanceRating}
                            netHashesPerSecond={coin.NetHashesPerSecond}
                           />
                         ))}
                            </div>
                          )}
                       </div>
                    )}
                 </div>
             } />

             <Route path="/coin/:id" element={
                           <div>
                              {error ? (
                                <div>{error}</div>
                            ) : (
                              <div>
                                <CoinDetails trueCoinsArr={trueCoinsArr} watchList={watchList} setWatchList={setWatchList} />
                              </div>
                            )}
                           </div>
              } />

             <Route path="/news" element={
                     <div>
                        {isLoading ? (
                            <div>Loading crypto news...</div>
                        ) : (
                          error ? (
                             <div>{error}</div>
                          ) : (
                             <div>
                        {coinsArrThree.map(coins => (
                          <News
                          key={coins.key}
                          id={coins.id}
                          author={coins.author}
                          description={coins.description}
                          published={coins.published}
                          source_category={coins.source_category}
                          title={coins.title}
                          url={coins.url}
                          image={coins.image}
                          />
                        ))}
                         </div>
                          )
                        )}
                     </div>
             } />

             <Route path="/watchlist" element={
                  <div>
                     {isLoading ? (
                        <div>Loading watchlist...</div>
                     ) : (
                       error ? (
                         <div>{error}</div>
                       ) : (
                         <div>
                           <Watchlist watchList={watchList} setWatchList={setWatchList} />
                         </div>
                         ))}
                  </div>
             } />

             <Route path="/portfolio" element={
                      <div>
                         {isLoading ? (
                           <div>Loading Portfolio...</div>
                         ) : (
                           error ? (
                             <div>{error}</div>
                          ) : (
                             <div>
                               <Portfolio trueCoinsArr={trueCoinsArr} />
                             </div>
                           ))}
                      </div>
             } />
          </Routes>
        </div>
      </currencyContext.Provider>
    </languageContext.Provider>
  );
}


