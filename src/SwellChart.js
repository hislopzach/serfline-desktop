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
import colors from "./colors";
import SwellTooltip from "./SwellTooltip";
const styles = {
  chartFillIn: {
    height: 250,
    width: "100%",
  },
};

const formatTime = (timestamp) => {
  return format(fromUnixTime(timestamp), "EEEEEE MM/dd h aaaa");
};

export const SwellChart = ({ surflineResponse, synchId, ...props }) => {
  const data = surflineResponse.data.wave
    .filter((wave, ndx) => ndx % 6 === 0 || ndx < 2)
    .map((wave) => ({
      humanTime: formatTime(wave.timestamp),
      ...wave,
    }));
  return (
    <div style={styles.chartFillIn}>
      <ResponsiveContainer width="100%">
        <LineChart data={data} synchId={synchId}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="humanTime" />
          <YAxis />
          <Tooltip
            cursor={{ fill: "rgba(206, 206, 206, 0.2)" }}
            content={SwellTooltip}
          />
          {/* <Tooltip /> */}
          <Line
            dataKey="swells[0].height"
            stroke={colors.blue}
            strokeWidth={5}
          />
          <Line
            dataKey="swells[1].height"
            stroke={colors.green}
            strokeWidth={5}
          />
          <Line
            dataKey="swells[2].height"
            stroke={colors.pink}
            strokeWidth={5}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
