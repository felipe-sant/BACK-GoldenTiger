function newDate(): Date {
    const date = new Date();
    const time = date.getTime();
    const newTime = time - 3 * 60 * 60 * 1000;
    return new Date(newTime);
}

export default newDate;