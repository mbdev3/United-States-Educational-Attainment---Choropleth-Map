import { useState, useEffect } from 'react';
import { json } from 'd3';
import { feature } from 'topojson';

const jsonUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

export const useWorldAtlas = () => {
  const [data, setData] = useState(null);
	
  useEffect(() => {
    json(jsonUrl).then(topology=>{
      const {counties,nation,states} = topology.objects
    setData(feature(topology,counties).features)
    });
    ;
  }, []);

  return data;
};
