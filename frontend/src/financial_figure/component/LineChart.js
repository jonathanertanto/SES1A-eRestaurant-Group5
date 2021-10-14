import React from "react";
import "../style/FinancialFigure.css";

import { Line } from "react-chartjs-2";

export const LineChart = (result) => {
    const data = {
        labels: result.period,
        datasets: [
            {
                label: "Sales Revenue (exclude discount offers)",
                data: result.revenue,
                fill: true,
                borderColor: "rgba(75,192,192,1)"
            },
            {
                label: "Net Profit from Sales (Sales Revenue minus meals' costs and discount offers)",
                data: result.profit,
                fill: true,
                borderColor: "#742774"
            }
        ]
    };

    return (
        <div>
            <Line data={data} />
        </div>
    );
}
