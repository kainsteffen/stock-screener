import Chart from "chart.js";
import React, { useEffect, useRef } from "react";

export interface TimeSeriesPreviewChartProps {
  data: any[];
  labels: any[];
}

export function TimeSeriesPreviewChart(props: TimeSeriesPreviewChartProps) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = (canvasRef.current as unknown) as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");
    const isGain = props.data[0] < props.data[props.data.length - 1];
    const strokeRgb = isGain ? "65,206,62" : "255, 98, 98";
    const gradient = ctx?.createLinearGradient(0, 0, 0, 400);
    gradient?.addColorStop(0, `rgba(${strokeRgb}, 0.8)`);
    gradient?.addColorStop(0.1, `rgba(${strokeRgb}, 0.3)`);
    gradient?.addColorStop(0.2, `rgba(${strokeRgb}, 0.2)`);
    gradient?.addColorStop(0.7, `rgba(${strokeRgb}, 0.0)`);

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
              backgroundColor: gradient,
              borderColor: `rgba(${strokeRgb})`,
              borderWidth: 2,
              pointHoverRadius: 7,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          tooltips: {
            mode: "nearest",
            intersect: false,
          },
          hover: {
            mode: "nearest",
            intersect: false,
          },
          elements: {
            point: {
              radius: 0,
            },
            line: {
              tension: 0.125,
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
                display: false,
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
