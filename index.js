import React from "react";
import ReactDOM from "react-dom";
import { useWorldAtlas } from "./useWorldAtlas";
import { useData } from "./useData";
import { Marks } from "./Marks";
import { Legend } from "./Legend";
import { scaleLinear, scaleThreshold } from "d3";

const width = 940;
const height = 600;

const App = () => {
  const worldAtlas = useWorldAtlas();

  const data = useData();

  if (!worldAtlas || !data) {
    return <pre>Loading...</pre>;
  }

  const x = scaleLinear().domain([1, 60]).rangeRound([550, 850]);

  const color = scaleThreshold().domain([3, 12, 21, 30, 39, 48, 57, 66]).range(d3.schemeBlues[8]);

  const rowByID = new Map();
  data.forEach((d) => {
    const id = d.fips;
    rowByID.set(id, d);
  });
  const onMouseEnter = (d, e) => {
    let b = d.bachelorsOrHigher;
    let a = d.area_name;
    let s = d.state;

    e.pageX > window.innerWidth / 2 ? (e.pageX = e.pageX - 120) : e.pageX;
    a.length > 15 && e.pageX > window.innerWidth / 2 ? (e.pageY = e.pageY - 40) : e.pageY;
    tooldiv
      .style("visibility", "visible")
      .html(() => `${a}, ${s}: ${b}%`)
      .style("top", e.pageY - 40 + "px")
      .style("left", e.pageX + "px")
      .attr("data-education", b);
  };
  const onMouseOut = () => {
    tooldiv.style("visibility", "hidden");
  };
  return (
    <>
      <div id="title">
        <h1>United States Educational Attainment</h1>
        <p id="description">Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)</p>
      </div>

      <svg width={width} height={height}>
        <g className="map">
          <Legend x={x} color={color} />
          <Marks
            worldAtlas={worldAtlas}
            rowByID={rowByID}
            x={x}
            color={color}
            onMouseEnter={(e, d) => onMouseEnter(e, d)}
            onMouseOut={() => onMouseOut()}
          />
        </g>
        <g className="copyright" transform={`translate(${width - 35},${height - 25}) `}>
          <text textAnchor="middle" dx={-15} dy={18}>
            By
          </text>
          <a xlink:href="https://thembdev.com">
            {" "}
            <image xlink:href="https://mbdev-utils.s3.eu-west-3.amazonaws.com/mbdev_logo_sm.svg" width={25} />
          </a>
        </g>
      </svg>
    </>
  );
};
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
