(function (React$1, ReactDOM, d3$1, topojson) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React$1);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

  var jsonUrl$1 = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

  var useWorldAtlas = function () {
    var ref = React$1.useState(null);
    var data = ref[0];
    var setData = ref[1];
  	
    React$1.useEffect(function () {
      d3$1.json(jsonUrl$1).then(function (topology){
        var ref = topology.objects;
        var counties = ref.counties;
        ref.nation;
        ref.states;
      setData(topojson.feature(topology,counties).features);
      });
    }, []);

    return data;
  };

  var jsonUrl =
    'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';

  var useData = function () {
    var ref = React$1.useState(null);
    var data = ref[0];
    var setData = ref[1];

    React$1.useEffect(function () {
      d3$1.json(jsonUrl).then(function (data) {
        
        setData(
          data
        );
      });
    }, []);

    return data;
  };

  var path = d3$1.geoPath();

  var missingDataColor = "gray";
  var Marks = function (ref) {
    var worldAtlas = ref.worldAtlas;
    var rowByID = ref.rowByID;
    var color = ref.color;
    var onMouseEnter = ref.onMouseEnter;
    var onMouseOut = ref.onMouseOut;

    return (
    React.createElement( 'g', null,
      worldAtlas.map(function (feature) {
        var d = rowByID.get(feature.id);
        // console.log((path(feature)));
        return (
          React.createElement( 'path', {
            className: "county", d: path(feature), fill: d ? color(d.bachelorsOrHigher) : missingDataColor, 'data-fips': d.fips, 'data-education': d.bachelorsOrHigher, onMouseEnter: function (e) { return onMouseEnter(d, e); }, onMouseOut: function () { return onMouseOut(null); } })
        );
      })
    )
  );
  };

  var Legend = function (ref) {
    var x = ref.x;
    var color = ref.color;

    return (
      React.createElement( 'g', { id: "legend" },
        color.range().map(function (r, i) {
          var d = color.invertExtent(r);

          d[0] == null ? (d[0] = x.domain()[0]) : null;
          d[1] == null ? (d[1] = x.domain()[1]) : null;
          console.log(d[1]);

          return (
            React.createElement( React.Fragment, null,
              React.createElement( 'rect', { x: x(d[0]), height: 8, width: x(d[1]) - x(d[0]), fill: r }),
              React.createElement( 'line', { x1: x(d[1]), x2: x(d[1]), y1: 0, y2: 20 }),
              React.createElement( 'text', { x: x(d[1]), y: 40, textAnchor: "middle" },
                d[1] + "%"
              )
            )
          );
        })
      )
    );
  };

  var width = 940;
  var height = 600;

  var App = function () {
    var worldAtlas = useWorldAtlas();

    var data = useData();

    if (!worldAtlas || !data) {
      return React__default["default"].createElement( 'pre', null, "Loading..." );
    }

    var x = d3$1.scaleLinear().domain([1, 60]).rangeRound([550, 850]);

    var color = d3$1.scaleThreshold().domain([3, 12, 21, 30, 39, 48, 57, 66]).range(d3.schemeBlues[8]);

    var rowByID = new Map();
    data.forEach(function (d) {
      var id = d.fips;
      rowByID.set(id, d);
    });
    var onMouseEnter = function (d, e) {
      var b = d.bachelorsOrHigher;
      var a = d.area_name;
      var s = d.state;

      e.pageX > window.innerWidth / 2 ? (e.pageX = e.pageX - 120) : e.pageX;
      a.length > 15 && e.pageX > window.innerWidth / 2 ? (e.pageY = e.pageY - 40) : e.pageY;
      tooldiv
        .style("visibility", "visible")
        .html(function () { return (a + ", " + s + ": " + b + "%"); })
        .style("top", e.pageY - 40 + "px")
        .style("left", e.pageX + "px")
        .attr("data-education", b);
    };
    var onMouseOut = function () {
      tooldiv.style("visibility", "hidden");
    };
    return (
      React__default["default"].createElement( React__default["default"].Fragment, null,
        React__default["default"].createElement( 'div', { id: "title" },
          React__default["default"].createElement( 'h1', null, "United States Educational Attainment" ),
          React__default["default"].createElement( 'p', { id: "description" }, "Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)")
        ),

        React__default["default"].createElement( 'svg', { width: width, height: height },
          React__default["default"].createElement( 'g', { className: "map" },
            React__default["default"].createElement( Legend, { x: x, color: color }),
            React__default["default"].createElement( Marks, {
              worldAtlas: worldAtlas, rowByID: rowByID, x: x, color: color, onMouseEnter: function (e, d) { return onMouseEnter(e, d); }, onMouseOut: function () { return onMouseOut(); } })
          ),
          React__default["default"].createElement( 'g', { className: "copyright", transform: ("translate(" + (width - 35) + "," + (height - 25) + ") ") },
            React__default["default"].createElement( 'text', { textAnchor: "middle", dx: -15, dy: 18 }, "By"),
            React__default["default"].createElement( 'a', { href: "https://thembdev.com" },
              " ",
              React__default["default"].createElement( 'image', { href: "https://mbdev-utils.s3.eu-west-3.amazonaws.com/mbdev_logo_sm.svg", width: 25 })
            )
          )
        )
      )
    );
  };
  var rootElement = document.getElementById("root");
  ReactDOM__default["default"].render(React__default["default"].createElement( App, null ), rootElement);

})(React, ReactDOM, d3, topojson);
//# sourceMappingURL=bundle.js.map
