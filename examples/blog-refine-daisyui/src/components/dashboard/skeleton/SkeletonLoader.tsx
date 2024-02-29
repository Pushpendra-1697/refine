import React from "react";

// skeleton loading UI for Graph
const SkeletonLoader: React.FC = () => {
    return (
        <div className="p-4 mx-auto bg-white rounded-lg shadow-md">
            <div className="animate-pulse flex space-x-4">
                <div className="h-80 bg-gray-300 rounded w-full"></div>
            </div>
        </div>
    );
};

export default SkeletonLoader;