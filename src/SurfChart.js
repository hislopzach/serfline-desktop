import React from "react";
import {
  BarChart,
  CartesianGrid,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, fromUnixTime } from "date-fns";
const styles = {
  chartFillIn: {
    height: 250,
    width: "100%",
    // backgroundColor: "blue",
  },
};

const formatTime = (timestamp) => {
  return format(fromUnixTime(timestamp), "EEEEEE MM/dd h aaaa");
};

export const SurfChart = ({ surflineResponse, synchId, ...props }) => {
  const data = surflineResponse.data.wave
    .filter((wave, ndx) => ndx % 6 === 0 || ndx < 2)
    .map((wave) => ({
      humanTime: formatTime(wave.timestamp),
      ...wave,
    }));
  return (
    <div style={styles.chartFillIn}>
      <ResponsiveContainer width="100%">
        <BarChart data={data} synchId={synchId}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="humanTime" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="surf.max" fill="#8884d8" barSize={30} />
          {/* <Bar dataKey="surf.min" fill="#8884d8" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
