import Chart from "chart.js";
import React, { useEffect, useRef } from "react";
import "./time-series-preview-chart.css";

export interface TimeSeriesPreviewChartProps {
  data: any[];
  labels: any[];
}

export function TimeSeriesPreviewChart(props: TimeSeriesPreviewChartProps) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = (canvasRef.current as unknown) as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");

    // Destroy chart instance before redraw
    Chart.helpers.each(Chart.instances, (instance: any) => {
      if (instance.chart.canvas.id === canvas.id) {
        instance.chart.destroy();
      }
    });

    if (ctx) {
      new Chart(ctx, {
        type: "line",
        data: {
          labels: props.labels,
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
            mode: "index",
            intersect: false,
          },
          hover: {
            mode: "index",
            intersect: false,
          },
          elements: {
            point: {
              radius: 0,
            },
            line: {
              tension: 0,
            },
          },
          scales: {
            xAxes: [
              {
                display: false,
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                },
              },
            ],
            yAxes: [
              {
                display: true,
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                },
                ticks: {
                  // beginAtZero: true,
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
