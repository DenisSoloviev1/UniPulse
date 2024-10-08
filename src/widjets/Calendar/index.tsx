import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ru } from 'date-fns/locale'; 
import "react-datepicker/dist/react-datepicker.css";
import "./style.scss"; 
import { CalendarSvg } from "../../assets/svg"; 

registerLocale("ru", ru);

const Calendar: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
      setSelectedDate(date);
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
    <div className="calendarContainer">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect // Показ времени
        dateFormat="d MMMM yyyy HH:mm" // Формат даты и времени
        timeFormat="HH:mm" // 24-часовой формат
        minDate={new Date()}
        locale="ru" // Указываем локализацию
        placeholderText="Выберите дату и время"
        timeIntervals={30} // Интервалы времени (например, каждые 30 минут)
        className="datePicker" // Ваши кастомные стили
        filterTime={filterTime} // Применение фильтра для времени
      />
      <CalendarSvg />
    </div>
  );
};

export default Calendar;
