export default function AssetForm({trueCoinsArr, addAssetToPortfolio, editCoin, setShowModal, editingId, setEditingId, getId, setGetId, quantity, setQuantity, price, setPrice, date, setDate}) {

    return (
         <form onSubmit={(e) => {e.preventDefault(); {editingId ? editCoin(editingId, quantity, price, date) : addAssetToPortfolio(getId, quantity, price, date);}

    setEditingId(null);
    setShowModal(false);
    setGetId("");
    setQuantity("");
    setPrice("");
    setDate("");
  }}
  className="w-full max-w-xl bg-white rounded-lg border border-gray-200 p-5 sm:p-8 flex flex-col gap-6">
    
  <h2 className="text-2xl font-semibold text-gray-800">
    Add Asset
  </h2>

  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">
      Coin:
    </label>

    <select className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-blue-500" value={getId} onChange={(e) => setGetId(e.target.value)}>
      <option value="">Select Coin</option>

      {trueCoinsArr.map((coin) => (
        <option key={coin.id} value={coin.id}>
          {coin.name}
        </option>
      ))}
    </select>
  </div>

  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Quantity:</label>

    <input className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-blue-500" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
  </div>

  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Purchase Price:</label>

    <input className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-blue-500" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
  </div>

  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">Purchase Date:</label>

    <input className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-blue-500" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
  </div>

  <div className="flex flex-col sm:flex-row gap-3 sm:justify-around mt-2">
    {editingId === null ? (
      <button
        type="button"
        onClick={() => setShowModal(false)}
        className="w-full sm:w-auto px-5 py-2 border border-gray-300 rounded-md">Cancel Changes</button>
    ) : (
      <button
        type="button"
        onClick={() => setShowModal(false)}
        className="w-full sm:w-auto px-5 py-2 border border-gray-300 rounded-md">Cancel</button>
    )}

    <button
      type="submit"
      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">{editingId !== null ? "Save Changes" : "Save Asset"}</button>
  </div>
</form>
    );
}