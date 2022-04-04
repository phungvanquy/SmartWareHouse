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
let i = 0;

const initialData = [];

export default function Chart() {
  const [data, setData] = useState(initialData);

  let k = 0;

  useEffect(() => {
    setInterval(() => {
      setData((data) => {
        return [...data, { time: k++, temp: Math.random() * (100 - 90) + 90 }];
      });
    }, 1000);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "white",
        width: "100%",
        boxShadow: "2px 2px black",
      }}
    >
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
          <Tooltip></Tooltip>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
