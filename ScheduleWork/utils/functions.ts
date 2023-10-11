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
    const month = parseInt(parts[1], 10) - 1; // Odejmujemy 1, ponieważ miesiące są indeksowane od 0 (styczeń = 0, luty = 1, itd.)
    const day = parseInt(parts[2], 10);
    
    const date = new Date(year, month, day);
    // console.log(date.getMonth(), 'nodawa data')
    return date
  }

  export function addMonthsToDate(date: Date, months: number) {
    const newDate = new Date(date);
    const currentMonth = newDate.getMonth();
    const targetMonth = (currentMonth + months) % 12; // Oblicz docelowy miesiąc, uwzględniając zmianę roku
    newDate.setMonth(targetMonth);

    // Jeśli nowy miesiąc jest większy niż początkowy, dodaj rok
    if (currentMonth + months >= 12) {
        newDate.setFullYear(newDate.getFullYear() + 1);
    }

    return newDate;
}