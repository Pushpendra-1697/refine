import React, { useState, useEffect, useRef } from "react";
import { PencilIcon, InformationCircleIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

type TKpiCardProps = {
    title: string;
    data: any;
    formatTotal?: (value: number | string) => typeof value;
};

export const KpiCard = ({
    title,
    data,
    formatTotal = (value) => value,
}: TKpiCardProps) => {
    const [showEditIcon, setShowEditIcon] = useState(false);
    const [showPopup, setShowPopup] = useState(false); 
    const popupRef = useRef<HTMLDivElement>(null); 

    const total = data?.data?.total;
    const percent = "10%";

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setShowPopup(false);
            }
        };
        if (showPopup) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPopup]);

    const handleEditIconHover = (isHovering: boolean) => {
        setShowEditIcon(isHovering);
    };

    const handleEditIconClick = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div
            className="stat my-2 py-4 flex-1 border-l-4 rounded relative"
            onMouseEnter={() => handleEditIconHover(true)}
            onMouseLeave={() => handleEditIconHover(false)}
            style={{ 
                backgroundColor: showEditIcon ? "#F3F4F6" : "#FFFFFF",
                borderRadius: "0.8rem" 
            }} 
        >
            <div className="stat-title text-l">{title}</div>
            <div className="stat-value">{formatTotal(total ?? "1000")}</div>
            <div className="stat-desc my-2">
                <span className="mx-1 text-l font-bold">{percent}</span>
                since last week
            </div>
            {showEditIcon && (
                <PencilIcon
                    className="h-4 w-4 absolute top-1 right-1 cursor-pointer"
                    onClick={handleEditIconClick}
                />
            )}
            {showPopup && (
                <div
                    ref={popupRef}
                    className="absolute top-10 right-5 bg-white p-4 border border-gray-300 rounded-md shadow-md"
                    style={{ width: "210px", height: "180px", zIndex: 1000 }}
                >
                    <div>
                        <p
                            className="mb-1 text-xs text-gray-800 px-2 py-1 flex justify-between items-center"
                            style={{ width: "190px", height: "22px" }}
                        >
                            <PencilSquareIcon className="h-4 w-4 cursor-pointer" />
                            <span>Average Order Value</span>
                            <InformationCircleIcon className="h-4 w-4 cursor-pointer" />
                        </p>
                    </div>
                    <div>
                        <p
                            className="mb-1 text-xs text-gray-800 px-2 py-1 flex justify-between items-center"
                            style={{ width: "190px", height: "22px" }}
                        >
                            <PencilSquareIcon className="h-4 w-4 cursor-pointer" />
                            <span>Conversation Rate</span>
                            <InformationCircleIcon className="h-4 w-4 cursor-pointer" />
                        </p>
                    </div>
                    <div>
                        <p
                            className="mb-1 text-xs text-gray-800 px-2 py-1 flex justify-between items-center"
                            style={{ width: "190px", height: "22px" }}
                        >
                            <PencilSquareIcon className="h-4 w-4 cursor-pointer" />
                            <span>Gross Sell</span>
                            <InformationCircleIcon className="h-4 w-4 cursor-pointer" />
                        </p>
                    </div>
                    <div>
                        <p
                            className="mb-1 text-xs text-gray-800 px-2 py-1 flex justify-between items-center"
                            style={{ width: "190px", height: "22px" }}
                        >
                            <PencilSquareIcon className="h-4 w-4 cursor-pointer" />
                            <span>Net Return Value</span>
                            <InformationCircleIcon className="h-4 w-4 cursor-pointer" />
                        </p>
                    </div>
                    <div>
                        <p
                            className="mb-1 text-xs text-gray-800 px-2 py-1 flex justify-between items-center"
                            style={{ width: "190px", height: "22px" }}
                        >
                            <PencilSquareIcon className="h-4 w-4 cursor-pointer" />
                            <span>Store Search Conversation</span>
                            <InformationCircleIcon className="h-4 w-4 cursor-pointer" />
                        </p>
                    </div>
                    <div>
                        <p
                            className="mb-1 text-xs text-gray-800 px-2 py-1 flex justify-between items-center"
                            style={{ width: "190px", height: "22px" }}
                        >
                            <PencilSquareIcon className="h-4 w-4 cursor-pointer" />
                            <span>Return Rate</span>
                            <InformationCircleIcon className="h-4 w-4 cursor-pointer" />
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};