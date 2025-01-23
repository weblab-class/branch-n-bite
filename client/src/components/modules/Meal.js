/**
 * Returns the current mealtime (breakfast, lunch, or dinner)
 * for the specified dorm.
 * @param currentDorm {String} a dorm
 * @returns the current meal, one of "breakfast", "brunch", "lunch", "dinner", "late-night"
 */
function getCurrentMeal(currentDorm) {
  const currentTime = new Date();
  const lunchTime = new Date();
  lunchTime.setHours(10, 0, 0);
  const dinnerTime = new Date();
  dinnerTime.setHours(15, 0, 0);
  const lateNightTime = new Date();
  lateNightTime.setHours(20, 0, 0);
  // for now, during IAP
  if (currentDorm === "maseeh") {
    if (currentTime >= dinnerTime) return "dinner";
    else return "brunch";
  }
  if (currentDorm === "maseeh") {
    // late nights only open mon-thu, sun
    if (currentTime >= lateNightTime && currentTime.getDay() <= 5) return "late-night";
    // otherwise, after 8pm it's dinner
    if (currentTime >= dinnerTime) return "dinner";
    // if weekend, only brunch or dinner
    if ([0, 6].includes(currentTime.getDay())) return "brunch";
    // otherwise, it's a weekday
    if (currentTime >= lunchTime) return "lunch";
    else return "breakfast";
  }
  // TODO edit both of the below
  else if (currentDorm === "new-vassar") {
    return "dinner";
  } else {
    return "dinner";
  }
}

export { getCurrentMeal }