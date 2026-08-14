export default function CustomTick({x, y, payload, chartCurrency}) {
 
    return (
        <text
          x={x}
          y={y}
          fontSize={10}
          textAnchor="end"
        >
         {`${chartCurrency.selectCurrency.sign}${payload.value.toLocaleString()}`}
        </text>
    );
}