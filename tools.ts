import {nor} from "./types";

export const randomInteger = (min : number, max : number) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
export const isWrong = response => response.data.status !== 200

export const write = (message : string, value : nor) =>
    console.log(`[INFO] ${message.toUpperCase()}: ${value}`)

export const splitArr = (arr : Array<any>, chunks : any) =>
    [...Array(chunks)].map((_, c) => arr.filter((n, i) => i % chunks === c));

export const ForbiddenWeb = () => alert('Forbidden for web devices.')

type dateObj = {
    date : string,
    time : string
}

export const sortByDate = (a: dateObj,b : dateObj) : any => {
    return new Date(`${a.date} ${a.time}`).getTime() >=
    new Date(`${b.date} ${b.time}`).getTime() ? 1 : -1
}
export const getTime = () => {
    let date = new Date()
    const hoursS = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours()
    const minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()
    return hoursS + ':' + minutes
}
export const getDate = () => {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}

