export function daysInMonth (selectDate:Date) {
    const nowDate:Date = new Date();
    const nowYear = selectDate.getFullYear();
    const nowMoth = selectDate.getMonth()+1;

    return new Date(nowYear, nowMoth, 0).getDate();
}

export const firstDayOfMonth = (selectDate:Date) => {
    const nowMonth = selectDate.getMonth()
    const nowYear = selectDate.getFullYear()
    const arr:number[] = []

    for (let i = 0; i < (new Date(nowYear, nowMonth, 1)).getDay()-1; i++) {
        arr.push(i)              
    }

    return arr
}