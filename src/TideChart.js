import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { format, fromUnixTime } from "date-fns";
const styles = {
  chartFillIn: {
    height: 250,
    width: "100%",
  },
};

const formatTime = (timestamp) => {
  return format(fromUnixTime(timestamp), "EEEEEE MM/dd h aaaa");
};

export const TideChart = ({ surflineResponse, synchId, ...props }) => {
  const data = surflineResponse.data.tides
    // .filter((wave, ndx) => ndx % 6 === 0 || ndx < 2)
    .map((tide) => ({
      humanTime: formatTime(tide.timestamp),
      ...tide,
    }));
  return (
    <div style={styles.chartFillIn}>
      <ResponsiveContainer width="100%">
        <AreaChart data={data} synchId={synchId} baseValue="dataMin">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="humanTime" />
          <YAxis />
          <Tooltip />
          <Area dataKey="height" fill="#8884d8" barSize={30} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
