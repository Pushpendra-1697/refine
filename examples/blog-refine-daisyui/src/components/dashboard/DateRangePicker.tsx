import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
    value: [Date, Date];
    onChange: (value: [Date, Date]) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ value, onChange }) => {
    const [startDate, endDate] = value;

    const handleStartDateChange = (date: Date | null) => {
        if (date) {
            onChange([date, endDate]);
        }
    };

    const handleEndDateChange = (date: Date | null) => {
        if (date) {
            onChange([startDate, date]);
        }
    };

    return (
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
            <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="MM/dd/yyyy"
                placeholderText="Start date"
            />
            <span>to</span>
            <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                dateFormat="MM/dd/yyyy"
                minDate={startDate}
                placeholderText="End date"
            />
        </div>
    );
};

export default DateRangePicker;
