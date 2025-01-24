import { useSearchParams } from "react-router-dom";
import { getTodayDate } from "./Date";
import { getCurrentMeal } from "./Meal";

function getInitDate() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dateParam = searchParams.get("date");
  if (dateParam !== null) {
    // TODO sanitize input properly
    if (dateParam.length === 10 && dateParam.startsWith("2025-0")) return dateParam;
  }
  return getTodayDate();
}

function getInitMeal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mealParam = searchParams.get("meal");
  if (mealParam !== null) {
    // TODO sanitize input for full
    if (["brunch", "dinner"].includes(mealParam)) return mealParam;
  }
  return getCurrentMeal();
}

function getInitDorm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dormParam = searchParams.get("dorm");
  if (dormParam !== null) {
    // TODO sanitize input for full
    if (["maseeh", "mccormick", "baker", "new-vassar", "simmons", "next"].includes(dormParam))
      return dormParam;
  }
  return "maseeh";
}

export { getInitDate, getInitMeal, getInitDorm };
