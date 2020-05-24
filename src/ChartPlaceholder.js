import React from "react";
import { CircularProgress, Box } from "@material-ui/core";
const styles = {
  chartFillIn: {
    height: 250,
    width: "100%",
    paddingTop: 123,
    paddingBottom: 123,
  },
};
const ChartPlaceholder = () => (
  <Box style={styles.chartFillIn} alignItems="center" justifyContent="center">
    <CircularProgress />
  </Box>
);
export default ChartPlaceholder;
