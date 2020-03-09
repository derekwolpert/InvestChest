import React from "react";
import * as moment from "moment";

export const CustomizedXTick = props => {
    const { x, y, payload, range } = props;

    let value;

    if (range === "1d") {
        value = moment(payload.value, 'HH:mm').format('h:mm');
    } else if ((new Set(["5dm", "1mm", "3m", "6m", "1y"])).has(range)) {
        value = moment(payload.value).format("MMM Do");
    } else {
        value = moment(payload.value).format("MMM Do YY");
    }

    return (
        <g transform={`translate(${x},${y})`}>
            <text dy={10} textAnchor="middle" fill="var(--chart)">
                {value}
            </text>
        </g>
    );
};

export const CustomizedYTick = props => {
    const { x, y, payload } = props;

    return (
        <g transform={`translate(${x + 3},${y + 3})`}>
            <text dx={10} textAnchor="middle" fill="var(--chart)">
                {payload.value}
            </text>
        </g>
    );
};

export const CustomizedTooltip = props => {

    if (props.payload[0]) {
        const { close, date } = props.payload[0].payload;
        const formatDate = (new Set(["2y", "5y"]).has(props.range)) ?
            moment(date).format("MMM Do YY") : moment(date).format("MMM Do");
        if (new Set(["1d", "5dm", "1mm"]).has(props.range)) {
            const { minute } = props.payload[0].payload;
            const formatMinute = moment(minute, 'HH:mm').format('h:mm A');
            return (
                <section className="chart-tooltip">
                    <p>Price: ${close.toFixed(2)}</p>
                    <p>Time: {formatMinute}</p>
                    <p>Date: {formatDate}</p>
                </section>
            )
        } else {
            return (
                <section className="chart-tooltip">
                    <p>Price: ${close.toFixed(2)}</p>
                    <p>Date: {formatDate}</p>
                </section>
            )
        }
    } else {
        return null;
    }
};
