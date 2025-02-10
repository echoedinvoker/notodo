"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";
import { useState, useMemo, useEffect } from "react";
import { PointHistoryItem } from "@/helpers/utils";

interface PointPerHourChartProps {
  history: PointHistoryItem[];
}

export default function PointsPerHourChart({
  history,
}: PointPerHourChartProps) {
  const [dataRange, setDataRange] = useState<[number, number]>([0, 0]);

  const { initialDataRange, filteredData } = useMemo(() => {
    const sortedHistory = [...history].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    const endIndex = sortedHistory.length - 1;
    const startIndex = Math.max(0, endIndex - 6);

    return {
      initialDataRange: [startIndex, endIndex] as [number, number],
      filteredData: sortedHistory,
    };
  }, [history]);

  useEffect(() => {
    setDataRange(initialDataRange);
  }, [initialDataRange]);

  const handleBrushChange = (newRange: any) => {
    if (
      newRange &&
      newRange.startIndex !== undefined &&
      newRange.endIndex !== undefined
    ) {
      setDataRange([newRange.startIndex, newRange.endIndex]);
    }
  };

  return (
    <ResponsiveContainer>
      <LineChart
        data={filteredData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
        />
        <YAxis
          domain={["auto", "auto"]}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="pointsPerHour"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Brush
          dataKey="date"
          height={30}
          stroke="#8884d8"
          startIndex={dataRange[0]}
          endIndex={dataRange[1]}
          onChange={handleBrushChange}
          tickFormatter={(value) => new Date(value).toLocaleDateString()}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
