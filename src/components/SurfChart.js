import React from "react";
import {
  BarChart,
  CartesianGrid,
  Bar,
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
          <XAxis dataKey="humanTime" xAxisId={0} />
          <XAxis dataKey="humanTime" xAxisId={1} hide />
          <YAxis />
          <Tooltip />
          <Bar dataKey="surf.max" xAxisId={0} fill={colors.purple} />
          <Bar dataKey="surf.min" xAxisId={1} fill={colors.green} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
