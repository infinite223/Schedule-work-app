import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "./globalStyles";
import { timeCounter } from "./timeCounter";
import { Log, UserInDay } from "./types";

export const formatDateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0');
    
    const formattedDate = `${year}/${month}/${day}`
  
    return formattedDate
  }


  export const formatStringToDate = (dateString: string) => {
    const parts = dateString.split("/");
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; 
    const day = parseInt(parts[2], 10);
    
    const date = new Date(year, month, day);
    
    return date
  }

  export function addMonthsToDate(date: Date, months: number) {
    const newDate = new Date(date);
    const currentMonth = newDate.getMonth();
    const targetMonth = (currentMonth + months) % 12; 
    newDate.setMonth(targetMonth);

    if (currentMonth + months >= 12) {
        newDate.setFullYear(newDate.getFullYear() + 1);
    }

    return newDate;
}

export const getColorDot = (userInDay: UserInDay) => {
  const time = timeCounter(userInDay.from, userInDay.to)

  if(time.godziny>7)
    return colors.fullDayHours
  if(time.godziny<=7)
    return colors.halfDayHours
}

export const setLogsInStorage = async (newLog: Log) => {
  const logsValue = await AsyncStorage.getItem('logs');

  if(logsValue != null) {
    let newLogs = JSON.parse(logsValue)
    newLogs.push(newLog)
    await AsyncStorage.setItem('logs',  JSON.stringify(newLogs));
  }
  else {
    await AsyncStorage.setItem('logs',  JSON.stringify([newLog]));
  }
} 