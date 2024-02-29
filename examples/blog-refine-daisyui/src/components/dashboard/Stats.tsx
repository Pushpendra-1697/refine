import { KpiCard } from "./KpiCard";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import SkeletonLoaderStats from "./skeleton/SkeletonLoaderStats";

interface statsProps {
    loading: boolean;
    handleToggleChartBar: () => void;
    chartBarOpen: any;
}
const Stats = ({ loading, handleToggleChartBar, chartBarOpen }: statsProps) => {
    return (
        <div className="w-full mx-auto mb-24 flex flex-col justify-center items-stretch md:flex-row md:justify-between drop-shadow-md">
            <div className="w-full mx-auto md:flex-1 md:mr-2">
                {loading ? <SkeletonLoaderStats /> : <KpiCard
                    title="Online Store Sessions"
                    data={6000}
                    formatTotal={(value: number | string) => `${value}`}
                />}
            </div>
            <div className="w-full mx-auto md:flex-1">
                {loading ? <SkeletonLoaderStats /> : <KpiCard
                    title="Net Return Value"
                    data={5000}
                    formatTotal={(value: number | string) => `${value}`}
                />}
            </div>
            <div className="w-full mx-auto md:flex-1 md:ml-2">
                {loading ? <SkeletonLoaderStats /> : <KpiCard
                    title="Total Orders"
                    data={4000}
                    formatTotal={(value: number | string) => `${value}`}
                />}
            </div>
            <div className="w-full mx-auto md:flex-1 md:ml-2">
                {loading ? <SkeletonLoaderStats /> : <KpiCard
                    title="Conversion Rate"
                    data={3000}
                    formatTotal={(value: number | string) => `${value}`}
                />}
            </div>
            <div className="flex justify-center items-center ml-2 mt-2">
                {chartBarOpen ? <ChevronDownIcon
                    className="h-6 w-6 cursor-pointer"
                    onClick={handleToggleChartBar}
                /> : <ChevronUpIcon className="h-6 w-6 cursor-pointer"
                    onClick={handleToggleChartBar} />}
            </div>
        </div>
    );
};

export default Stats;