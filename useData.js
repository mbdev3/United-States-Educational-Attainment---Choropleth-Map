import { useState, useEffect } from 'react';
import { json } from 'd3';

const jsonUrl =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';

const row = (d) => {
  d.aids = +d[
    'Prevalence - HIV/AIDS - Sex: Both - Age: 15-49 years (Percent) (%)'
  ];
  return d;
};

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(jsonUrl).then((data) => {
      
      setData(
        data
      );
    });
  }, []);

  return data;
};
