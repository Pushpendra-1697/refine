import React from "react";

// skeleton loading UI for Stats
const SkeletonLoaderStats: React.FC = () => {
    return (
        <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonLoaderStats;