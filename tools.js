export const randomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
export const isWrong = response => response.data.status !== 200

export const write = (message, value) => console.log(`[INFO] ${message.toUpperCase()}: ${value}`)

export const splitArr = (arr, chunks) =>
    [...Array(chunks)].map((_, c) => arr.filter((n, i) => i % chunks === c));

export const ForbiddenWeb = () => alert('Forbidden for web devices.')

export const sortByDate = (a,b) => {
    return new Date(`${a.date} ${a.time}`).getTime() >=
    new Date(`${b.date} ${b.time}`).getTime() ? 1 : -1
}


