import React from "react";
import {
  LineChart,
  CartesianGrid,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { format, fromUnixTime } from "date-fns";
import colors from "../colors";
const styles = {
  chartFillIn: {
    height: 250,
    width: "100%",
  },
};

const formatTime = (timestamp) => {
  return format(fromUnixTime(timestamp), "EEEEEE MM/dd h aaaa");
};

const WindChart = ({ surflineResponse, synchId, ...props }) => {
  const data = surflineResponse.data.wind
    .filter((wind, ndx) => ndx % 6 === 0)
    .map((wind) => ({
      humanTime: formatTime(wind.timestamp),
      ...wind,
    }));
  return (
    <div style={styles.chartFillIn}>
      <ResponsiveContainer width="100%">
        <LineChart data={data} synchId={synchId}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="humanTime" />
          <YAxis />
          <Tooltip />
          <Line dataKey="speed" stroke={colors.blue} strokeWidth={5} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WindChart;
