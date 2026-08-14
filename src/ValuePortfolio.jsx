import { Wallet, TrendingUp, Landmark } from "lucide-react";

export default function ValuePortfolio({totalValue, totalInvested, totalProfitAndLoss, color, portfolioCurrency, setShowModal, signs, totalProfitAndLossPercentage}) {

    return (
        <div className="flex flex-col gap-8 pt-5">
  
  <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
    <div className="flex flex-col">
      <h6 className="text-xl font-medium text-black">Portfolio</h6>
      <p className="text-xs">
        Track and manage your cryptocurrency investments
      </p>
    </div>

    <button
      className="self-start sm:self-auto h-7 outline outline-1 outline-blue-700 rounded-[4px] bg-blue-700 text-white text-[10px] px-2"
      onClick={() => setShowModal(true)}
    >
      + Add Asset
    </button>
  </div>

  <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">

    <div className="w-full sm:w-72 outline outline-1 outline-gray-300 rounded-[3px] p-4 bg-white">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Wallet className="w-7 h-7 text-white outline outline-1 outline-blue-700 rounded-[4px] bg-blue-700 p-1" />
          <p className="text-[12px]">Total Value</p>
        </div>

        <div className="text-lg font-medium">
          {portfolioCurrency.selectCurrency.sign}
          {totalValue.toLocaleString()}
        </div>
      </div>
    </div>

    <div className="w-full sm:w-72 outline outline-1 outline-gray-300 rounded-[3px] p-4 bg-white">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <TrendingUp className="w-7 h-7 text-white outline outline-1 outline-green-700 rounded-[4px] bg-green-700 p-1" />
          <p className="text-[12px]">Total Profit/Loss</p>
        </div>

        <div className="flex flex-col">
          <div
            className="text-lg font-medium"
            style={{ color: color }}
          >
            {signs}
            {portfolioCurrency.selectCurrency.sign}
            {totalProfitAndLoss.toLocaleString()}
          </div>

          <div
            className="text-[10px] font-light"
            style={{ color: color }}
          >
            {signs}
            {totalProfitAndLossPercentage.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>

    <div className="w-full sm:w-72 outline outline-1 outline-gray-300 rounded-[3px] p-4 bg-white">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Landmark className="w-7 h-7 text-white outline outline-1 outline-purple-700 rounded-[4px] bg-purple-700 p-1" />
          <p className="text-[12px]">Total Invested</p>
        </div>

        <div className="text-lg font-medium">
          {portfolioCurrency.selectCurrency.sign}
          {totalInvested.toLocaleString()}
        </div>
      </div>
    </div>

  </div>
</div>
    );
}