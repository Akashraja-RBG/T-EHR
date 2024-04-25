import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";

const Graph = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    renderChart();
  }, [data]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/final_tweets");
      setData(
        response.data && Array.isArray(response.data.Tweets_final)
          ? response.data.Tweets_final
          : []
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const renderChart = () => {
    const tabletNames = data.map((item) => item.Tablet_Name);
    const sideEffects = data.map((item) => item.Side_Effects_Mentioned);
    const ages = data.map((item) => item.Age);

    const chartData = {
      labels: tabletNames,
      datasets: [
        {
          label: "Side Effects",
          data: sideEffects,
          backgroundColor: "rgba(255, 99, 132, 0.6)",
        },
        {
          label: "Ages",
          data: ages,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
        },
      ],
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const ctx = document.getElementById("chart-canvas").getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: chartOptions,
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="my-4">
      <h2 className="text-lg font-semibold mb-2">Graph</h2>
      <canvas id="chart-canvas" />
    </div>
  );
};

export default Graph;




// import React, { useState, useEffect, useRef } from "react";
// import Chart from "chart.js/auto";
// import axios from "axios";

// const Graph = () => {
//   const [data, setData] = useState([]);
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/final_tweets");
//       setData(response.data.Tweets_final || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     if (data && data.length > 0) {
//       renderChart();
//     }
//   }, [data]);

//   const renderChart = () => {
//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }

//     const groupedData = data.reduce((acc, item) => {
//       if (!acc[item.Tablet_Name]) {
//         acc[item.Tablet_Name] = { ages: [], sideEffects: [] };
//       }
//       acc[item.Tablet_Name].ages.push(item.Age);
//       acc[item.Tablet_Name].sideEffects.push(item.Side_Effects_Mentioned);
//       return acc;
//     }, {});

//     const chartData = {
//       labels: [],
//       datasets: [],
//     };

//     Object.entries(groupedData).forEach(([tabletName, values], index) => {
//       chartData.labels.push(tabletName);
//       chartData.datasets.push({
//         label: `Age for ${tabletName}`,
//         data: values.ages,
//         backgroundColor: `rgba(${index * 50}, ${255 - index * 30}, ${index * 70}, 0.6)`,
//       });
//       chartData.datasets.push({
//         label: `Side Effects for ${tabletName}`,
//         data: values.sideEffects,
//         backgroundColor: `rgba(${255 - index * 30}, ${index * 50}, ${255 - index * 70}, 0.6)`,
//       });
//     });

//     const chartOptions = {
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     };

//     const ctx = chartRef.current.getContext("2d");
//     chartInstance.current = new Chart(ctx, {
//       type: "bar",
//       data: chartData,
//       options: chartOptions,
//     });
//   };

//   return <canvas ref={chartRef} id="chart-canvas" />;
// };

// export default Graph;
