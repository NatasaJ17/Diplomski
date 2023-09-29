import { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import "react-datepicker/dist/react-datepicker.css";

const DateRangePicker = (props) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const onDatesChange = (update) => {

    props.onDatesChange(update[0],
      update[1]);
  }

  return (
    <label style={{ display: 'inline-block' }}>

      <DatePicker
        showIcon={true}
        render={<button />}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          onDatesChange(update);
          setDateRange(update);

        }}
        isClearable={true}
      />
    </label>

  );
};

export default DateRangePicker;