import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";
import styled from "styled-components";
import { CalendarSvg } from "../../shared/ui/Icon";

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 220px;
 
  font-size: 16px;
`;

registerLocale("ru", ru);

interface CalendarProps {
  onChange: (date: number | null) => void; // Передаем timestamp в родительский компонент
}

const Calendar: React.FC<CalendarProps> = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onChange(date ? Math.floor(date.getTime() / 1000) : null); // Передаем timestamp в секундах
  };

  const filterTime = (time: Date) => {
    const now = new Date();
    const selectedDateWithoutTime = selectedDate ? new Date(selectedDate) : null;

    if (selectedDateWithoutTime) {
      selectedDateWithoutTime.setHours(time.getHours());
      selectedDateWithoutTime.setMinutes(time.getMinutes());
      return selectedDateWithoutTime > now;
    }

    return true;
  };

  return (
      <CalendarContainer>
        <DatePicker
            selected={selectedDate || null}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="d MMMM yyyy  HH:mm"
            timeFormat="HH:mm"
            minDate={new Date()}
            locale="ru"
            placeholderText="__ ______ ____  __:__"
            timeIntervals={30}
            filterTime={filterTime}
        />
        <CalendarSvg />
      </CalendarContainer>
  );
};

export default Calendar;
