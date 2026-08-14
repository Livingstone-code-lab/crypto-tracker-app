import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import CustomTick from './CustomTick';

export default function PriceChartHomepage({newChartData, timeFrame, setTimeframe, chartCurrency}) {

    return (
        <div className="w-full h-110 outline outline-1 outline-gray-300 rounded-[2px] bg-white pt-5 pr-4 pl-4">
           <div className="flex justify-between pb-3">
             <div>
                <h6 className="font-bold">Price Chart</h6>
             </div>
              <div className="flex gap-2">
                 <button className="outline outline-1 text-[10px] pr-2 pl-2 rounded-[2px] font-medium" value={1} style={timeFrame === 1 ? {background: "blue", color: "white"} : {background: "white", color: "black"}} onClick={((e) => setTimeframe(Number(e.target.value)))}>24h</button>
                 <button className="outline outline-1 text-[10px] pr-2 pl-2 rounded-[2px] font-medium" value={7} style={timeFrame === 7 ? {background: "blue", color: "white"} : {background: "white", color: "black"}} onClick={((e) => setTimeframe(Number(e.target.value)))}>7d</button>
                 <button className="outline outline-1 text-[10px] pr-2 pl-2 rounded-[2px] font-medium" value={30} style={timeFrame === 30 ? {background: "blue", color: "white"} : {background: "white", color: "black"}} onClick={((e) => setTimeframe(Number(e.target.value)))}>30d</button>
                 <button className="outline outline-1 text-[10px] pr-2 pl-2 rounded-[2px] font-medium" value={90} style={timeFrame === 90 ? {background: "blue", color: "white"} : {background: "white", color: "black"}} onClick={((e) => setTimeframe(Number(e.target.value)))}>90d</button>
                 <button className="outline outline-1 text-[10px] pr-2 pl-2 rounded-[2px] font-medium" value={365} style={timeFrame === 365 ? {background: "blue", color: "white"} : {background: "white", color: "black"}} onClick={((e) => setTimeframe(Number(e.target.value)))}>1y</button>
              </div>
           </div>  

           <ResponsiveContainer width="100%" height={400}>
              <LineChart data={newChartData} >
                 <XAxis tick={{fontSize: 10}} dataKey="date" />
                 <YAxis 
                   tick={(prop) => (
                     <CustomTick
                        x={prop.x} 
                        y={prop.y}
                        payload={prop.payload}
                        chartCurrency={chartCurrency}
                     /> 
                   )}
                 />
                 <Tooltip formatter={(value) => `${chartCurrency.selectCurrency.sign}${value.toLocaleString()}`} /> 
                 <CartesianGrid />
                 <Line dataKey="price" dot={false} />
              </LineChart>
           </ResponsiveContainer>
        </div>
    );
} 