import React from "react";

export const CustomizedXTick = props => {
    const { x, y, payload } = props;
    return (
        <g transform={`translate(${x},${y})`}>
            <text dy={10} textAnchor="middle" fill="var(--chart)">
                {payload.value}
            </text>
        </g>
    );
};

export const CustomizedTooltip = props => {
    const price = props.payload[0] ? props.payload[0].value : 0;
    const date = props.label;
    return (
        <section className="chart-tooltip">
            <p>${price.toFixed(2)}</p>
            <p>{date}</p>
        </section>
    );
};
