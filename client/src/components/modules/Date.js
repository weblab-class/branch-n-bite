/**
 * Returns today's date in YYYY-MM-DD format.
 */
function getTodayDate() {
  return new Date().toJSON().slice(0, 10);
}

/**
 * Return's today's date, offset by the given offset in days,
 * in YYYY-MM-DD format. For example, -1 gives yesterday,
 * 0 gives today, and 3 gives 3 days from now.
 */
function getTodayDateOffset(offset) {
  const currDay = new Date();
  currDay.setDate(currDay.getDate() + offset);
  return currDay.toJSON().slice(0, 10);
}

export { getTodayDate, getTodayDateOffset }