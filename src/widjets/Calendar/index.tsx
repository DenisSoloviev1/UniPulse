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
  height: 300px
  font-size: 16px;
}`;

registerLocale("ru", ru);

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const filterTime = (time: Date) => {
    const now = new Date();
    const selectedDateWithoutTime = selectedDate
      ? new Date(selectedDate)
      : null;

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
        showTimeSelect // Показ времени
        dateFormat="d MMMM yyyy  HH:mm" // Формат даты и времени
        timeFormat="HH:mm" // 24-часовой формат
        minDate={new Date()}
        locale="ru" // Указываем локализацию
        placeholderText="__ ______ ____  __:__"
        timeIntervals={30} // Интервалы времени (например, каждые 30 минут)
        filterTime={filterTime} // Применение фильтра для времени
      />
      <CalendarSvg />
    </CalendarContainer>
  );
};

export default Calendar;
