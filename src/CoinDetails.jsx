import CoinNameHomepage from "./CoinNameHomepage";
import PriceChartHomepage from "./PriceChartHomepage";
import CoinDetailsHomepage from "./CoinDetailsHomepage";
import CoinSummaryHomepage from "./CoinSummaryHomepage";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { currencyContext, languageContext } from "./App";

export default function CoinDetails({trueCoinsArr, watchList, setWatchList}) {

   const [priceChart, setPriceChart] = useState([]);

   const [aboutCoin, setAboutCoin] = useState([]);

   const [timeFrame, setTimeframe] = useState(1);

   const [isLoadingChart, setIsLoadingChart] = useState(false);

   const [isLoadingAbout, setIsLoadingAbout] = useState(false);

   const coinId = useParams();

   const selectedCoin = trueCoinsArr.find(coin => coin.id === coinId.id);

   const chartCurrency = useContext(currencyContext);

   const chartLanguage = useContext(languageContext);
  

   // price chart error 
   const [priceChartError, setPriceChartError] = useState(null);

   const newPriceChartError = {
      priceNetworkError: "Something went wrong. Unable to load chart.",
      chartUnavailable: "Price chart is unavailable.",
      historicalDataUnavailable: "Historical price data is unavailable.",
      priceServerError: "Unable to load price chart.",
      rateLimit: "Too many requests. Please try again later.",
   };


   // about coin error
   const [aboutCoinError, setAboutCoinError] = useState(null);

   const newAboutCoinError = {
      aboutNetworkError: "Something went wrong. Unable to load coin details.",
      coinNotFound: "This cryptocurrency could not be found.",
      coinDetailsUnavailable: "Coin information is unavailable.",
      aboutServerError: "Unable to load coin details.",
      aboutRateLimit: "Too many requests. Please try again later."
   };

   
   // price chart fetch
    useEffect(() => {
       async function priceChart() {

         if (!selectedCoin) return;

          try {
            
            setPriceChartError(null);
            setIsLoadingChart(true);

             const data = await fetch(`https://api.coingecko.com/api/v3/coins/${selectedCoin.id}/market_chart?vs_currency=${chartCurrency.selectCurrency.code.toLowerCase()}&days=${timeFrame}`);

            if (data.status === 500 || data.status === 502 || data.status === 503 || data.status === 504) {
               setPriceChartError(newPriceChartError.priceServerError);
               return;
            }

            if (data.status === 404) {
               setPriceChartError(newPriceChartError.chartUnavailable);
               return; 
            }

            if (data.status === 204) {
               setPriceChartError(newPriceChartError.historicalDataUnavailable);
               return; 
            }

            if (data.status === 429) {
               setPriceChartError(newPriceChartError.rateLimit);
               return;
            }

             const dataRes = await data.json();

             if (dataRes.hasOwnProperty("prices") && (dataRes.prices.length > 0)) {
                setPriceChart(dataRes.prices);
             } else {
                setPriceChartError(newPriceChartError.chartUnavailable);
               return;
             }
             

             setIsLoadingChart(false);
          } catch (error) {
            setIsLoadingChart(false);

            setPriceChartError(newPriceChartError.priceNetworkError);
          } finally {
            setIsLoadingChart(false);
          }
       }

       priceChart();

    }, [selectedCoin, chartCurrency.selectCurrency, timeFrame]);



  //  about coins fetch 
    useEffect(() => {
       async function fetchInfo() {

         if (!selectedCoin) return;

          try {
            
            setAboutCoinError(null);
            setIsLoadingAbout(true);

            const info = await fetch(`https://api.coingecko.com/api/v3/coins/${selectedCoin.id}`);

            if (info.status === 500 || info.status === 502 || info.status === 504 || info.status === 504) {
               setAboutCoinError(newAboutCoinError.aboutServerError);
               return;
            }

            if (info.status === 429) {
               setAboutCoinError(newAboutCoinError.aboutRateLimit);
               return;
            }

            if (info.status === 404) {
               setAboutCoinError(newAboutCoinError.coinNotFound);
               return;
            }

            if (info.status === 204) {
               setAboutCoinError(newAboutCoinError.coinDetailsUnavailable);
               return;
            }

            const infoRes = await info.json();

            if (infoRes.hasOwnProperty("description") && Object.keys(infoRes.description).length > 0) {
               setAboutCoin(infoRes.description);
            } else {
               setAboutCoinError(newAboutCoinError.coinNotFound);
               return;
            }

            setIsLoadingAbout(false);
          } catch (error) {
            setIsLoadingAbout(false);
            setAboutCoinError(newAboutCoinError.aboutNetworkError);
          } finally {
            setIsLoadingAbout(false);
          }
       }

       fetchInfo();

    }, [selectedCoin]);


     const navigate = useNavigate();



     let coinInfo;

      if (aboutCoin[chartLanguage.selectLanguage]) {
         coinInfo = aboutCoin[chartLanguage.selectLanguage];
      } else {
         coinInfo = aboutCoin[0];
      }



     const newChartData = priceChart.map(item => ({
         date: timeFrame === 1 ? new Date(item[0]).toLocaleTimeString() : new Date(item[0]).toLocaleDateString(),
         price: item[1]
    }));
    


    if (priceChart.length === 0) {
         return null;
     }


     let change24Hr;
     let change7Days;

     let arrowDirection;

     let priceSign24h;
     let priceSign7d;

     let color24h;
     let color7d;

      // 24 hours
      if (change24Hr > 0) {
         arrowDirection = "↑";
      } else {
         arrowDirection = "↓";
      }

      if (change24Hr > 0) {
         color24h = "green";
      } else {
         color24h = "red";
      }

      if (change24Hr > 0) {
         priceSign24h = "+";
      }

      
      // 7 days 
      if (change7Days > 0) {
         color7d = "green";
      } else {
         color7d = "red";
      }
       
      if (change7Days > 0) {
         priceSign7d = "+";
      }
      

      let changeTwentyFourHour;

       if (newChartData.length >= 2) {
         changeTwentyFourHour = ((newChartData[newChartData.length - 1].price - newChartData[newChartData.length - 2].price) / newChartData[newChartData.length - 2].price) * 100;
      }

       change24Hr = changeTwentyFourHour.toFixed(2);
     


      let sevenDaysChange;

      if (newChartData.length >= 7) {
         sevenDaysChange = ((newChartData[newChartData.length - 1].price - newChartData[newChartData.length - 8].price) /  newChartData[newChartData.length - 8].price) * 100;
      } 

       change7Days = sevenDaysChange.toFixed(2);



   return (
       <div className="flex flex-col">
             <div className="flex flex-col w-full min-h-screen gap-10">
                <button className="absolute t-0 outline outline-1 outline-gray-300 text-xs pr-2 pl-2 rounded-[2px] bg-white" onClick={() => navigate(-1)}>Back</button>
          <CoinNameHomepage selectedCoin={selectedCoin} chartCurrency={chartCurrency} change24Hr={change24Hr} newChartData={newChartData} arrowDirection={arrowDirection} color24h={color24h} priceSign24h={priceSign24h} watchList={watchList} setWatchList={setWatchList} />
          
          <div>
            {isLoadingChart ? (
                             <div>Loading price chart...</div>
                           ) : (
                             priceChartError ? (
                                 <div>{priceChartError}</div>
                           ) : (
                              <div className="w-full overflow-hidden">
                                 <PriceChartHomepage newChartData={newChartData} timeFrame={timeFrame} setTimeframe={setTimeframe} chartCurrency={chartCurrency} />
                              </div>
                           ))}
          </div>

          <CoinDetailsHomepage selectedCoin={selectedCoin} chartCurrency={chartCurrency} change7Days={change7Days} newChartData={newChartData} color7d={color7d} priceSign7d={priceSign7d} coinInfo={coinInfo} isLoadingAbout={isLoadingAbout} aboutCoinError={aboutCoinError} />
          <CoinSummaryHomepage selectedCoin={selectedCoin} chartCurrency={chartCurrency} />
             </div>
       </div>
   );
}  
