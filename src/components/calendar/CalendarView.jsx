import React, { useState, useEffect } from 'react';
import Holidays from 'date-holidays';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, subMonths, addMonths } from 'date-fns';
import { useTasks } from '../../context/TaskContext';
import { ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import Button from '../ui/Button';

const CalendarView = () => {
  const { tasks } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [holidays, setHolidays] = useState({});

  useEffect(() => {
    let isMounted = true;
    
    const hdIn = new Holidays('IN');
    const hdUs = new Holidays('US');
    const year = currentDate.getFullYear();
    
    const inHolidays = hdIn.getHolidays(year) || [];
    // Only bring in major public US holidays + popular global observances to avoid noise
    const usHolidays = (hdUs.getHolidays(year) || []).filter(h => 
      h.type === 'public' || 
      ['Halloween', "Valentine's Day", "St. Patrick's Day", "Earth Day"].includes(h.name)
    );
    
    const allHolidays = [...inHolidays, ...usHolidays];
    
    const holidayMap = {};
    if (allHolidays.length > 0) {
      allHolidays.forEach(h => {
        const datePart = h.date.split(' ')[0]; // YYYY-MM-DD
        const [, month, day] = datePart.split('-');
        const key = `${month}-${day}`;
        // Avoid duplicate festival names on the same day
        if (holidayMap[key]) {
          if (!holidayMap[key].includes(h.name)) {
            holidayMap[key] += `, ${h.name}`;
          }
        } else {
          holidayMap[key] = h.name;
        }
      });
    } else {
      // Fallback static
      const fallback = { '01-14': 'Makar Sankranti', '01-26': 'Republic Day', '04-09': 'Ugadi', '08-15': 'Independence Day', '10-02': 'Gandhi Jayanti', '12-25': 'Christmas' };
      Object.assign(holidayMap, fallback);
    }
    
    if (isMounted) setHolidays(holidayMap);

    return () => {
      isMounted = false;
    };
  }, [currentDate.getFullYear()]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  const renderDaysOfWeek = () => {
    const dateFormat = "EEE";
    const days = [];
    let startDay = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
        days.push(
            <div key={i} style={{ textAlign: 'center', fontWeight: 600, color: 'var(--text-secondary)', padding: '0.5rem 0' }}>
                {format(addDays(startDay, i), dateFormat)}
            </div>
        );
    }
    return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>{days}</div>;
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      const dateKey = format(cloneDay, 'MM-dd');
      const fullDateStr = format(cloneDay, 'yyyy-MM-dd');
      
      const dayTasks = tasks.filter(t => t.dueDate === fullDateStr);
      const isHoliday = holidays[dateKey];
      
      const isCurrentMonth = isSameMonth(day, monthStart);
      const isToday = isSameDay(day, new Date());

      days.push(
        <div 
          key={day.toISOString()} 
          className={`calendar-cell ${!isCurrentMonth ? 'opacity-40' : ''}`}
          style={{ 
            minHeight: '100px', 
            padding: '0.5rem', 
            border: '1px solid var(--glass-border)',
            background: isToday ? 'rgba(9, 132, 227, 0.1)' : 'rgba(255,255,255,0.05)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.2rem',
            opacity: isCurrentMonth ? 1 : 0.4
          }}
        >
          <span style={{ fontWeight: 600, color: isToday ? 'var(--accent-color)' : 'var(--text-primary)' }}>
            {formattedDate}
          </span>
          
          {isHoliday && (
            <div style={{ fontSize: '0.7rem', color: 'var(--danger-color)', display: 'flex', alignItems: 'center', gap: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <Gift size={12}/> {isHoliday}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
            {dayTasks.map(t => (
              <div key={t.id} style={{
                fontSize: '0.65rem',
                padding: '2px 4px',
                borderRadius: '4px',
                backgroundColor: t.completed ? 'var(--success-color)' : 'var(--accent-color)',
                color: '#fff',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {t.title}
              </div>
            ))}
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div key={day.toISOString()} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', marginBottom: '0.5rem' }}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem' }}>
        <Button onClick={prevMonth} className="p-2"><ChevronLeft /></Button>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>{format(currentDate, "MMMM yyyy")}</h2>
        <Button onClick={nextMonth} className="p-2"><ChevronRight /></Button>
      </div>
      
      <div className="glass-card" style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {renderDaysOfWeek()}
        <div style={{ flex: 1, overflowY: 'auto', marginTop: '1rem' }}>
           {rows}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
