import React from "react";
import DefaultTooltipContent from "recharts/lib/component/DefaultTooltipContent";

const SwellTooltip = ({ payload, active, ...props }) => {
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
        {payload.map((item, i, payload) => {
          return (
            <div key={i} style={tooltip}>
              <p style={{ color: payload[i].color }}>
                {`${payload[i].payload.swells[i].height} ft @ ${Math.trunc(
                  payload[i].payload.swells[i].direction
                )}° ${payload[i].payload.swells[i].period}s`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SwellTooltip;
