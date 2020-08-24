import React from "react";
import {
  CartesianGrid,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { format, fromUnixTime } from "date-fns";
import { degToCompass } from "../util";
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

const WindChart = ({ surflineResponse, syncId, days, ...props }) => {
  const data = surflineResponse.data.wind
    .filter((wind, ndx) => ndx % days === 0)
    .map((wind) => ({
      humanTime: formatTime(wind.timestamp),
      ...wind,
    }));
  return (
    <div style={styles.chartFillIn}>
      <ResponsiveContainer width="100%">
        <ComposedChart data={data} syncId={syncId}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="humanTime" />
          <YAxis />
          <Tooltip
            formatter={(value, name, props) => [
              `${degToCompass(props.payload.direction)}`,
              `${value.toPrecision(1)} kts`,
            ]}
          />
          <Line dataKey="speed" stroke={colors.blue} strokeWidth={5} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WindChart;
