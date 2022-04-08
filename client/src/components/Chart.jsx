import React, { useState, useEffect } from "react";
import "./Chart.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AxisLabel = ({ axisType, x, y, width, height, stroke, children }) => {
  const isVert = axisType === "yAxis";
  const cx = isVert ? x : x + width / 2;
  const cy = isVert ? height / 2 + y : y + height + 10;
  const rot = isVert ? `270 ${cx} ${cy}` : 0;
  return (
    <text
      x={cx}
      y={cy}
      transform={`rotate(${rot})`}
      textAnchor="middle"
      stroke={stroke}
    >
      {children}
    </text>
  );
};

export default function Chart(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData((prevData) => {
      return [
        ...prevData,
        {
          time: props.data.time,
          temperature: props.data.temperature,
          humidity: props.data.humidity,
        },
      ];
    });
  }, [props.data]);

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        boxShadow: "inset 1px 1px 10px black",
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: -20,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />

          <YAxis
            width={80}
            label={{
              value: "Temperature",
              angle: -90,
              position: "center",
            }}
            yAxisId="left"
            orientation="left"
            dataKey="temperature"
            domain={["dataMin-40", "dataMax + 10"]}
          />
          <YAxis
            width={80}
            label={{
              value: "Humidity",
              angle: -90,
              position: "center",
            }}
            yAxisId="right"
            orientation="right"
            dataKey="humidity"
            domain={["dataMin - 10", "dataMax + 10"]}
          />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="temperature"
            stroke="#ee5522"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="humidity"
            stroke="#229dee"
          />
          <Tooltip></Tooltip>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
