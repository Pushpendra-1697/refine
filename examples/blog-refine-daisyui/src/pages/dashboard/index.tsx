import React, { useEffect, useMemo, useState } from "react";
import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import Stats from "../../components/dashboard/Stats";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { ResponsiveBarChart } from "../../components/dashboard/ResponsiveBarChart";
import { TabView } from "../../components/dashboard/TabView";
import { RecentSales } from "../../components/dashboard/RecentSales";
import { IChartDatum, TTab } from "../../interfaces";
import DateRangePicker from "../../components/dashboard/DateRangePicker";
import SkeletonLoader from '../../components/dashboard/skeleton/SkeletonLoader';

export const Dashboard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [chartBarOpen, setChartBarOpen] = useState(true);


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
            value: dayjs(dateRange[0])?.subtract(7, "days")?.startOf("day"),
        },
        {
            field: "end",
            operator: "eq",
            value: dayjs(dateRange[1]).startOf("day"),
        },
    ];

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
                }).format(new Date(item.date)),
                value: item?.value,
            }));
        }, [d]);
    };

    const memoizedRevenueData = useMemoizedChartData(dailyRevenue);
    const memoizedOrdersData = useMemoizedChartData(dailyOrders);
    const memoizedNewCustomersData = useMemoizedChartData(newCustomers);


    // Overall loading state or Update loading state when data changes
    useEffect(() => {
        if (dailyRevenue !== undefined || dailyOrders !== undefined || newCustomers !== undefined) {
            setLoading(false);
        }
    }, [dailyRevenue, dailyOrders, newCustomers]);

    // Rendering logic for the comparison charts based on the selected date range
    const tabs: TTab[] = [
        {
            id: 1,
            label: "Daily Revenue",
            content: loading ? (
                <SkeletonLoader />
            ) : (
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

    const handleToggleChartBar = () => {
        setChartBarOpen(!chartBarOpen);
    };

    return (
        <>
            <DateRangePicker value={dateRange} onChange={handleDateRangeChange} />
            <Stats chartBarOpen={chartBarOpen} loading={loading} handleToggleChartBar={handleToggleChartBar} />
            {chartBarOpen && <TabView tabs={tabs} />}
            <RecentSales />
        </>
    );
};
