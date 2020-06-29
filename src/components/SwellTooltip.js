import React from "react";
import { degToCompass } from "../util";

const SwellTooltip = ({ payload, active, ...props }) => {
  const compareSwells = (s1, s2) => s2.value - s1.value;

  if (!active) {
    // I think returning null works based on this: http://recharts.org/en-US/examples/CustomContentOfTooltip
    return null;
  }
  const tooltip = {
    backgroundColor: "white",
    opacity: "0.9",
    border: "1px solid black",
    borderRadius: "15px",
    paddingLeft: "10px",
    paddingRight: "10px",
  };
  // todo sort by height in tooltip
  return (
    <div>
      <div className="custom-tooltip">
        <p style={{ textAlign: "center" }}>
          <strong>{props.label}</strong>
        </p>
        {payload
          .slice()
          .sort(compareSwells)
          .map((item, i, payload) => {
            const { height, direction, period } = payload[i].payload.swells[i];
            return (
              <div key={i} style={tooltip}>
                <p style={{ color: payload[i].color }}>
                  {`${height} ft @ ${Math.trunc(direction)}° ${degToCompass(
                    direction
                  )} ${period}s`}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SwellTooltip;
