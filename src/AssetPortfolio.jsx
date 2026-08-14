
export default function AssetPortfolio({id, quantity, buyPrice, buyDate, deleteCoin, setEditingId, setShowModal, setGetId, setQuantity, setPrice, setDate, assetId, coinImage, portfolioCurrency}) {

    return (
         <div className="w-full bg-white border border-gray-200 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between shadow-sm">

  <div className="flex items-center gap-4">
    <img className="w-12 h-12 rounded-full bg-gray-100" src={coinImage} alt={`${id} logo`} />

    <h6 className="text-lg font-semibold text-gray-800">{id}</h6>
  </div>

  <div className="flex justify-between sm:block sm:text-right">
    <p className="text-sm text-gray-500">Quantity:</p>
    <p className="font-semibold">{quantity}</p>
  </div>

  <div className="flex justify-between sm:block sm:text-right">
    <p className="text-sm text-gray-500">Buy Price:</p>
    <p className="font-semibold">{portfolioCurrency.selectCurrency.sign}{buyPrice.toLocaleString()}</p>
  </div>

  <div className="flex justify-between sm:block sm:text-right">
    <p className="text-sm text-gray-500">Buy Date:</p>
    <p className="font-semibold">{buyDate}</p>
  </div>

  <div className="flex gap-4">
    <button className="text-blue-600 hover:text-blue-800 font-medium"onClick={() => {setEditingId(assetId); setGetId(id); setQuantity(quantity); setPrice(buyPrice); setDate(buyDate); setShowModal(true);}}>
      Edit
    </button>

    <button className="text-red-600 hover:text-red-800 font-medium"onClick={() => deleteCoin(assetId)}>
      Delete
    </button>
  </div>

</div>
    ); 
}

