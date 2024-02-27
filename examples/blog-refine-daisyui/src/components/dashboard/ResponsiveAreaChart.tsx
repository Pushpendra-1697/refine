import React from "react";
import {
    ResponsiveContainer,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Area,
} from "recharts";
import { ChartTooltip } from "../../components/dashboard/ChartTooltip";
import { IChartDatum } from "../../interfaces";

type TResponsiveAreaChartProps = {
    kpi: string;
    data: IChartDatum[];
    colors: {
        stroke: string;
        fill: string;
    };
};

export const ResponsiveAreaChart = ({
    kpi,
    data,
    colors,
}: TResponsiveAreaChartProps) => {
    if(!data){
        return <h1>Loading....</h1>;
    };
    // Calculate maxYAxisValue based on the data
    const maxYAxisValue = Math.max(40000, Math.ceil(Math.max(...data.map((item) => item.value)) / 20000) * 20000);
    return (
        <ResponsiveContainer height={400}>
            <AreaChart
                data={data}
                height={400}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="0 0 0" />
                <XAxis
                    dataKey="date"
                    tickCount={Math.ceil(data.length / 2) ?? 0}
                    tick={{
                        stroke: "light-grey",
                        strokeWidth: 0.5,
                        fontSize: "12px",
                    }}
                    interval={0}
                />
                <YAxis
                    tickCount={3}
                    tick={{
                        stroke: "light-grey",
                        strokeWidth: 0.5,
                        fontSize: "12px",
                    }}
                    interval="preserveStartEnd"
                    domain={[0, maxYAxisValue]}
                    tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip
                    content={<ChartTooltip kpi={kpi} colors={colors} />}
                    wrapperStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        border: "0 solid #000",
                        borderRadius: "10px",
                    }}
                />
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke={colors?.stroke}
                    strokeWidth={2}
                    fill={colors?.fill}
                    dot={{
                        stroke: colors?.stroke,
                        strokeWidth: 2,
                    }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};
