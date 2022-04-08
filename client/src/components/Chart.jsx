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
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />

          <YAxis
            yAxisId="left"
            orientation="left"
            dataKey="temperature"
            domain={["dataMin-40", "dataMax + 10"]}
          />
          <YAxis
            label="Humid"
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
