import React from "react";
import {
  CartesianGrid,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ComposedChart,
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

export const SurfChart = ({ surflineResponse, syncId, days, ...props }) => {
  const data = surflineResponse.data.wave
    .filter((wave, ndx) => ndx % days === 0)
    .map((wave) => ({
      humanTime: formatTime(wave.timestamp),
      ...wave,
    }));
  return (
    <div style={styles.chartFillIn}>
      <ResponsiveContainer width="100%">
        <ComposedChart data={data} syncId={syncId}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="humanTime" xAxisId={0} />
          <XAxis dataKey="humanTime" xAxisId={1} hide />
          <YAxis />
          <Tooltip />
          <Bar dataKey="surf.max" xAxisId={0} fill={colors.purple} />
          <Bar dataKey="surf.min" xAxisId={1} fill={colors.green} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
