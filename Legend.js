export const Legend = ({ x, color }) => {
  return (
    <g id="legend">
      {color.range().map((r, i) => {
        let d = color.invertExtent(r);

        d[0] == null ? (d[0] = x.domain()[0]) : null;
        d[1] == null ? (d[1] = x.domain()[1]) : null;
        console.log(d[1]);

        return (
          <>
            <rect x={x(d[0])} height={8} width={x(d[1]) - x(d[0])} fill={r} />
            <line x1={x(d[1])} x2={x(d[1])} y1={0} y2={20} />
            <text x={x(d[1])} y={40} textAnchor="middle">
              {d[1] + "%"}
            </text>
          </>
        );
      })}
    </g>
  );
};
