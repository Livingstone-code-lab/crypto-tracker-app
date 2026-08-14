import AssetPortfolio from "./AssetPortfolio";
import AssetForm from "./AssetForm";
import ValuePortfolio from "./ValuePortfolio";
import { useState, useContext, useEffect } from "react";
import { WalletCards } from "lucide-react";
import { currencyContext } from "./App";

export default function Portfolio({trueCoinsArr}) {

    const [portFolio, setPortFolio] = useState(() => {
      const saved = localStorage.getItem("portFolio");

      return saved ? JSON.parse(saved) : [];
    });
 
    const [showModal, setShowModal] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [getId, setGetId] = useState("");

    const [quantity, setQuantity] = useState("");

    const [price, setPrice] = useState("");

    const [date, setDate] = useState("");


    const portfolioCurrency = useContext(currencyContext);

    useEffect(() => {
      localStorage.setItem("portFolio", JSON.stringify(portFolio));
    }, [portFolio]);


    function addAssetToPortfolio(getId, quantity, price, date) {
      setPortFolio(prev => 
        [...prev, {assetId: Date.now(), id: getId, quantity: quantity, buyPrice: price, buyDate: date}]
      );
    }

    function deleteCoin(assetId) {
      setPortFolio(prev => prev.filter(coin => coin.assetId !== assetId));
    }
    

    function editCoin(assetId, quantity, price, date) {
      setPortFolio(prev => prev.map(coin => {
         if (coin.assetId === assetId) {
           return {...coin, quantity: quantity, buyPrice: price, buyDate: date}
         } else {
           return coin;
         }
      }));
    }



    if (trueCoinsArr.length === 0) {
          return null;
    }


    const coinImage = portFolio.map(port => {
       const images = trueCoinsArr.find(coin => coin.id === port.id);

       if (!images) return null;

       return images?.image;
    });


    const currentValue = portFolio.map(coin => {

        const findCoin = trueCoinsArr.find(item => item.id === coin.id);

        if (!findCoin) return null;

          return coin.quantity * findCoin.current_price;
    });

    
    const invested = portFolio.map(port => port.quantity * port.buyPrice);

    const totalInvested = invested.reduce((sum, invested) => sum + invested, 0);

    const totalValue = currentValue.reduce((sum, currentValue) => sum + currentValue, 0)

    const totalProfitAndLoss = Math.abs(totalValue - totalInvested);

    const totalProfitAndLossPercentage = totalInvested === 0 ? 0 : (totalProfitAndLoss / totalInvested) * 100;

    const profit = (totalProfitAndLoss / totalInvested) * 100;
    
    let color; 

    if (profit > 0) {
        color = "green";
    } else if (profit <= 0) {
        color = "red";
    }

    
    let signs;

     if (profit > 0) {
        signs = "+";
    }


   return (
        <div>
          <ValuePortfolio totalValue={totalValue} totalInvested={totalInvested} totalProfitAndLoss={totalProfitAndLoss} color={color} portfolioCurrency={portfolioCurrency} setShowModal={setShowModal} signs={signs} totalProfitAndLossPercentage={totalProfitAndLossPercentage} />

            <div className="mt-8">
               {portFolio.length === 0 ? (
                 
                   showModal ? (
                     <div className={`${showModal ? "flex" : "hidden"} flex-col mt-10 items-center`}>
              <AssetForm trueCoinsArr={trueCoinsArr} addAssetToPortfolio={addAssetToPortfolio} setShowModal={setShowModal} editingId={editingId} setEditingId={setEditingId} editCoin={editCoin} getId={getId} setGetId={setGetId} quantity={quantity} setQuantity={setQuantity} price={price} setPrice={setPrice} date={date} setDate={setDate} />
                     </div>
                   ) : (
                      <div className="w-full flex flex-col justify-center items-center outline outline-1 outline-gray-300 rounded-[3px] bg-white py-16 px-6 text-center mt-10">
                      <WalletCards className="w-14 h-14 text-gray-400" />
                      <h5  className="text-2xl font-semibold text-gray-800 mb-2">Your portfolio is empty</h5>
                      <p className="text-gray-500 leading-6 mb-8">Start tracking your cryptocurrency investments by adding assets to your portfolio</p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition mt-6" onClick={() => setShowModal(prev => !prev)}>+  Add Your First Asset</button>
                      </div>
               )) : (
                  <div className="flex flex-col gap-5 mt-8">

                      {portFolio.map(port => (
                      <AssetPortfolio 
                         assetId={port.assetId}
                         key={port.assetId}
                         id={port.id}
                         quantity={port.quantity}
                         buyPrice={port.buyPrice}
                         buyDate={port.buyDate}
                         trueCoinsArr={trueCoinsArr} 
                         addAssetToPortfolio={addAssetToPortfolio} 
                         deleteCoin={deleteCoin}
                         setEditingId={setEditingId}        
                         setShowModal={setShowModal}
                         setGetId={setGetId}
                         setQuantity={setQuantity}
                         setPrice={setPrice}
                         setDate={setDate}   
                         coinImage={coinImage}    
                         portfolioCurrency={portfolioCurrency}    
                      />
                 ))}

                 <div className="flex justify-center mt-10">{showModal && <AssetForm trueCoinsArr={trueCoinsArr} addAssetToPortfolio={addAssetToPortfolio} setShowModal={setShowModal} editingId={editingId} setEditingId={setEditingId} editCoin={editCoin} getId={getId} setGetId={setGetId} quantity={quantity} setQuantity={setQuantity} price={price} setPrice={setPrice} date={date} setDate={setDate} />}</div>
                  </div> 
              )}  
            </div>
        </div>
   );   
}



                 
                   