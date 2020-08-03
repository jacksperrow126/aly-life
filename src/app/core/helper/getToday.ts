export function getToday(day?) {
    let date = new Date();
    if (date) {
        date = new Date(day);
    }
    let today = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    return today;
}