// adapted from https://bl.ocks.org/mbostock/3887235, agpl3
import { scaleOrdinal, arc, pie, schemeSpectral } from "d3";
const populationData = [
  { age: "<5", population: 2704659 },
  { age: "5-13", population: 4499890 },
  { age: "14-17", population: 2159981 },
  { age: "18-24", population: 3853788 },
  { age: "25-44", population: 14106543 },
  { age: "45-64", population: 8819342 },
  { age: "≥65", population: 612463 },
];
const Pie = ({ width = 400, height = 400 }) => {
  const radius = Math.min(width, height) / 2;
  const color = scaleOrdinal(schemeSpectral[populationData.length]);
  const pieGenerator = pie()
    .sort(null)
    .value((d) => {
      return d.population;
    });
  const path = arc()
    .outerRadius(radius - 10)
    .innerRadius(0);
  const arcLabel = arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);
  const _pieShapeData = pieGenerator(populationData);
  return (
    <div>
      <p>Pie chart</p>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          {_pieShapeData.map((pieSlice, i) => {
            return (
              <g key={i} fontSize={10}>
                <path d={path(pieSlice)} fill={color(i)} />
                <text
                  transform={`translate(${arcLabel.centroid(pieSlice)})`}
                  fill="#000"
                >
                  <tspan fontWeight={700} x={0}>
                    {pieSlice.data.age}
                  </tspan>
                  <tspan x={0} y={`${1.1}em`}>
                    {pieSlice.data.population}
                  </tspan>
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};
export default Pie;
