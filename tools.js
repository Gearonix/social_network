export const randomInteger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}
export const isWrong = response => response.data.status!==200

export const write = (message,value) => console.log(`[INFO] ${message.toUpperCase()}: ${value}`)

export const splitArr = (arr, chunks) =>
    [...Array(chunks)].map((_, c) => arr.filter((n, i) => i % chunks === c));


//splitArr(followers,followers.length//2).map(array => <Row