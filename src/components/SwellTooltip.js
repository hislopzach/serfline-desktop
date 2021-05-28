import React from "react";
import { degToCompass } from "../util";

const SwellTooltip = ({ payload, active, ...props }) => {
  const compareSwells = (s1, s2) => s2.value - s1.value;

  if (!active) {
    return null;
  }
  const tooltip = {
    backgroundColor: "white",
    opacity: "0.9",
    border: "1px solid black",
    borderRadius: "15px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
  };
  return (
    <div>
      <div className="custom-tooltip">
        <span style={{ textAlign: "center" }}>
          <strong>{props.label}</strong>
        </span>
        {payload
          .slice()
          .sort(compareSwells)
          .map((item, i) => {
            const { height, direction, period } =
              item.payload.swells[item.dataKey[7]];
            if (height > 0) {
              return (
                <div key={i} style={tooltip}>
                  <span style={{ color: item.color }}>
                    {`${height.toFixed(1)} ft @ ${Math.trunc(
                      direction
                    )}° ${degToCompass(direction)} ${period}s`}
                  </span>
                </div>
              );
            } else {
              return null;
            }
          })}
      </div>
    </div>
  );
};

export default SwellTooltip;
