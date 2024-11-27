import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import styled from "styled-components";
import { CalendarSvg } from "../../shared/ui/Icon";
import { formatDate } from "../../shared/config";
import { INotif } from "../../entities/notification";

const InputContainer = styled.div`
  width: 220px;
  height: 25px;
  display: flex;
  align-items: center;
`;

registerLocale("ru", ru);

interface CalendarProps {
  onChange: (timestamp: INotif["time"]) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [displayDate, setDisplayDate] = useState<string>("");

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const timestamp = Math.floor(date.getTime() / 1000);
      const formattedDate = formatDate(timestamp);
      setDisplayDate(formattedDate);
      onChange(timestamp);
    } else {
      setDisplayDate("");
      onChange(null);
    }
  };

  const filterTime = (time: Date) => {
    const now = new Date();
    return time > now;
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      showTimeSelect
      dateFormat="d MMMM yyyy HH:mm"
      timeFormat="HH:mm"
      minDate={new Date()}
      locale="ru"
      timeIntervals={30}
      filterTime={filterTime}
      customInput={
        <InputContainer>
          <input
            type="text"
            value={displayDate}
            readOnly
            placeholder="__ ______ ____ __:__"
          />
          <CalendarSvg />
        </InputContainer>
      }
    />
  );
};

export default Calendar;
