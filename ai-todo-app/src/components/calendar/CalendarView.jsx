import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, subMonths, addMonths } from 'date-fns';
import { useTasks } from '../../context/TaskContext';
import { ChevronLeft, ChevronRight, Gift } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

const HOLIDAYS = {
  '01-14': 'Makar Sankranti', '01-26': 'Republic Day', '08-15': 'Independence Day', '10-02': 'Gandhi Jayanti', '10-31': 'Diwali', '12-25': 'Christmas'
};

const CalendarView = () => {
  const { tasks } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const rows = [];
  let days = [];
  let day = startDate;

  // Render Days Header
  const renderDaysHeader = () => {
    const daysArr = [];
    let startDay = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
        daysArr.push(
            <div key={i} className="text-center font-bold text-gray-500 py-2 text-sm uppercase tracking-wider">
                {format(addDays(startDay, i), "EEE")}
            </div>
        );
    }
    return <div className="grid grid-cols-7 mb-4">{daysArr}</div>;
  };

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const dateKey = format(cloneDay, 'MM-dd');
        const fullDateStr = format(cloneDay, 'yyyy-MM-dd');
        
        const dayTasks = tasks.filter(t => t.dueDate === fullDateStr);
        const isHoliday = HOLIDAYS[dateKey];
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());

        days.push(
            <div 
              key={day.toISOString()} 
              className={`min-h-[120px] p-2 border border-card-border/30 flex flex-col gap-1 transition-colors hover:bg-card-border/20 ${!isCurrentMonth ? 'opacity-30' : ''} ${isToday ? 'bg-accent/10 border-accent/30' : 'bg-card/20'}`}
            >
              <div className="flex justify-between items-start">
                 <span className={`text-sm font-bold ${isToday ? 'text-accent' : 'text-foreground'}`}>
                   {format(day, "d")}
                 </span>
              </div>
              
              {isHoliday && (
                <div className="text-[0.65rem] font-bold text-red-500 flex items-center gap-1 bg-red-500/10 px-1.5 py-0.5 rounded-md truncate">
                  <Gift size={10}/> {isHoliday}
                </div>
              )}

              <div className="flex flex-col gap-1 mt-1 overflow-y-auto scrollbar-hide">
                {dayTasks.map(t => (
                  <div key={t.id} className={`text-[0.65rem] font-semibold px-1.5 py-0.5 rounded-md truncate ${t.completed ? 'bg-green-500/20 text-green-600' : 'bg-accent text-white shadow-md shadow-accent/20'}`}>
                    {t.title}
                  </div>
                ))}
              </div>
            </div>
        );
        day = addDays(day, 1);
    }
    rows.push(
      <div key={day.toISOString()} className="grid grid-cols-7 gap-px bg-card-border/30 border border-card-border/30 rounded-xl overflow-hidden mb-6 shadow-sm">
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="flex flex-col h-full bg-background pb-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#0984e3] to-[#74b9ff]">Events Calendar</h1>
          <p className="text-gray-500 mt-1 font-medium">Visualize your deadlines and national holidays.</p>
        </div>
        
        <GlassCard className="flex items-center gap-4 py-2 px-4 rounded-2xl">
          <button onClick={prevMonth} className="p-2 hover:bg-card-border/50 rounded-xl transition-colors outline-none"><ChevronLeft size={20}/></button>
          <AnimatePresence mode="popLayout">
            <motion.h2 
              key={currentDate.toISOString()}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="text-lg font-bold w-36 text-center"
            >
              {format(currentDate, "MMMM yyyy")}
            </motion.h2>
          </AnimatePresence>
          <button onClick={nextMonth} className="p-2 hover:bg-card-border/50 rounded-xl transition-colors outline-none"><ChevronRight size={20}/></button>
        </GlassCard>
      </div>

      <div className="flex-1 flex flex-col">
         {renderDaysHeader()}
         <div className="flex-1">
           {rows}
         </div>
      </div>
    </div>
  );
};

export default CalendarView;
