module.exports = time => {
    if(isNaN(time)) return;
    if (typeof time !== 'number') return;

    let s = Math.trunc(time / 1000);
    let m = Math.trunc(s / 60);
    s = s - m * 60;
    let h = Math.trunc(m / 60);
    m = m - h * 60;
    let d = Math.trunc(h / 24);
    h = h - d * 24;

    return `${d} дней, ${h} часа и ${m} минут`
}