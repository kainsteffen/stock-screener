import Chart from "chart.js";
import React, { useEffect, useRef } from "react";
import "./time-series-preview-chart.css";

export interface TimeSeriesPreviewChartProps {
  data: number[];
}

export function TimeSeriesPreviewChart(props: TimeSeriesPreviewChartProps) {
  const canvasRef = useRef(null);

  useEffect(() => {
    // const ctx = (document.getElementById(
    //   "chart"
    // ) as HTMLCanvasElement)?.getContext("2d");
    const canvas = (canvasRef.current as unknown) as HTMLCanvasElement;

    const ctx = canvas?.getContext("2d");
    if (ctx) {
      var myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              data: props.data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          tooltips: {
            enabled: false,
          },
          elements: {
            point: {
              radius: 0,
            },
          },
          scales: {
            xAxes: [
              {
                display: false,
              },
            ],
            yAxes: [
              {
                display: false,
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
    }
  });

  return (
    <canvas className="time-series-preview-chart" id="chart" ref={canvasRef} />
  );
}
