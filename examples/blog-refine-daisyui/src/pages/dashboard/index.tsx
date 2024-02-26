import React, { useMemo, useState } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import Stats from "../../components/dashboard/Stats";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { ResponsiveBarChart } from "../../components/dashboard/ResponsiveBarChart";
import { TabView } from "../../components/dashboard/TabView";
import { RecentSales } from "../../components/dashboard/RecentSales";
import { IChartDatum, TTab } from "../../interfaces";
import DateRangePicker from "../../components/dashboard/DateRangePicker";

export const Dashboard: React.FC = () => {
    const [dateRange, setDateRange] = useState<[Date, Date]>([
        dayjs().subtract(7, "days").startOf("day").toDate(),
        dayjs().startOf("day").toDate()
    ]);

    const handleDateRangeChange = (newDates: [Date, Date]) => {
        setDateRange(newDates);
    };

    const filters: CrudFilter[] = [
        {
            field: "start",
            operator: "eq",
            value: dayjs(dateRange[0])?.startOf("day"),
        },
        {
            field: "end",
            operator: "eq",
            value: dayjs(dateRange[1])?.startOf("day"),
        },
    ];

    // useMemo to memoize chart data fetching based on the selected date range
    const { data: dailyRevenue } = useList<IChartDatum>({
        resource: "dailyRevenue",
        filters,
    });

    const { data: dailyOrders } = useList<IChartDatum>({
        resource: "dailyOrders",
        filters,
    });

    const { data: newCustomers } = useList<IChartDatum>({
        resource: "newCustomers",
        filters,
    });

    const useMemoizedChartData = (d: any) => {
        return useMemo(() => {
            return d?.data?.data?.map((item: IChartDatum) => ({
                date: new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    year: "numeric",
                    day: "numeric",
                }).format(new Date(item.date)),
                value: item?.value,
            }));
        }, [d]);
    };

    const memoizedRevenueData = useMemoizedChartData(dailyRevenue);
    const memoizedOrdersData = useMemoizedChartData(dailyOrders);
    const memoizedNewCustomersData = useMemoizedChartData(newCustomers);

    // Rendering logic for the comparison charts based on the selected date range
    const tabs: TTab[] = [
        {
            id: 1,
            label: "Daily Revenue",
            content: (
                <ResponsiveAreaChart
                    kpi="Daily revenue"
                    data={memoizedRevenueData}
                    colors={{
                        stroke: "rgb(54, 162, 235)",
                        fill: "rgba(54, 162, 235, 0.2)",
                    }}
                />
            ),
        },
        {
            id: 2,
            label: "Daily Orders",
            content: (
                <ResponsiveBarChart
                    kpi="Daily orders"
                    data={memoizedOrdersData}
                    colors={{
                        stroke: "rgb(255, 159, 64)",
                        fill: "rgba(255, 159, 64, 0.7)",
                    }}
                />
            ),
        },
        {
            id: 3,
            label: "New Customers",
            content: (
                <ResponsiveAreaChart
                    kpi="New customers"
                    data={memoizedNewCustomersData}
                    colors={{
                        stroke: "rgb(76, 175, 80)",
                        fill: "rgba(54, 162, 235, 0.2)",
                    }}
                />
            ),
        },
    ];

    return (
        <>
            <DateRangePicker value={dateRange} onChange={handleDateRangeChange} />
            <Stats
                dailyRevenue={dailyRevenue}
                dailyOrders={dailyOrders}
                newCustomers={newCustomers}
            />
            <TabView tabs={tabs} />
            <RecentSales />
        </>
    );
};
