import React, { useState, useMemo, useEffect } from "react";
import {
  Apple,
  Dumbbell,
  Scale,
  CalendarDays,
  ChevronRight,
  ChevronLeft,
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Utensils,
  Coffee,
  Moon,
  Check,
  Droplets,
  PlusCircle,
  MinusCircle,
} from "lucide-react";

// --- מאגר נתונים תזונאי מותאם אישית ---
const FOOD_DB = {
  breakfast: [
    {
      id: "b11",
      name: "פרנץ׳ טוסט: 2 פרוסות לחם קל + ביצה + רבע כוס חלב (מטוגן בכפית שמן)",
      calories: 240,
    },
    {
      id: "b12",
      name: "קערת קורנפלקס (כוס אחת) + חצי כוס חלב דל שומן",
      calories: 150,
    },
    { id: "b13", name: "יוגורט טבעי 1.5% + 3 כפות גרנולה", calories: 230 },
    {
      id: "b1",
      name: "2 פרוסות לחם קל + חביתה (ביצה 1) + ירקות + כף גבינה",
      calories: 220,
    },
    {
      id: "b14",
      name: "2 ביצים (קשות/עין) + כף טחינה + סלט ירקות + פריכית",
      calories: 240,
    },
    {
      id: "b8",
      name: "פרוסת לחם רגיל + חביתה (1 ביצה) + ירקות + כף גבינה",
      calories: 250,
    },
    {
      id: "b9",
      name: "פיתה מיני + חצי אבוקדו + עגבניה + ביצה קשה",
      calories: 320,
    },
    {
      id: "b2",
      name: "דייסת שיבולת שועל (4 כפות) מים/חלב + תפוח וקינמון",
      calories: 250,
    },
    {
      id: "b10",
      name: "טוסט מ-2 פרוסות לחם רגיל + גבינה צהובה 9% + רסק",
      calories: 290,
    },
  ],
  lunch: [
    {
      id: "l14",
      name: "פסטה בולונז (כוס וחצי פסטה מבושלת + 100 ג׳ בקר רזה ברוטב)",
      calories: 450,
    },
    {
      id: "l16",
      name: "שניצל אפוי או מטוגן קלות (יחידה בינונית) + כוס פירה/אורז + סלט",
      calories: 430,
    },
    {
      id: "l13",
      name: "המבורגר בקר בינוני (150 ג׳) + חצי לחמניה/פיתה מיני + ירקות",
      calories: 400,
    },
    {
      id: "l15",
      name: "פסטה בשמנת (15%) וערמונים - מנה של כוס פסטה מוכנה",
      calories: 380,
    },
    {
      id: "l17",
      name: "רול סושי פוטומאקי (8 יחידות עבות) עם דג וירקות + מעט סויה",
      calories: 350,
    },
    {
      id: "l18",
      name: "שווארמה עוף/הודו (150 ג׳) + פיתה מיני + כף טחינה + סלט",
      calories: 440,
    },
    {
      id: "l19",
      name: "טורטיה מקומחת מגולגלת עם 100 ג׳ חזה עוף/בקר + ירקות + כפית מיונז",
      calories: 380,
    },
    {
      id: "l1",
      name: "חזה עוף צלוי (150 ג׳) + כוס אורז/קינואה + סלט קצוץ",
      calories: 420,
    },
    {
      id: "l11",
      name: "רבע עוף צלוי (שוק וירך) ללא עור + תפוח אדמה בתנור + שעועית ירוקה",
      calories: 480,
    },
    {
      id: "l2",
      name: "פילה דג בתנור + תפוח אדמה אפוי + ברוקולי",
      calories: 380,
    },
    {
      id: "l3",
      name: "סלט ענק + קופסת טונה/סרדינים + ביצה קשה + כף טחינה + לחם קל",
      calories: 430,
    },
  ],
  snack: [
    { id: "s1", name: "תפוח עץ / אגס / תפוז + 10 שקדים טבעיים", calories: 140 },
    { id: "s9", name: "2 עוגיות פתי בר + קפה/תה (ללא סוכר)", calories: 80 },
    {
      id: "s10",
      name: "חצי פיתה מיני + כפית ממרח (שוקולד/חמאת בוטנים)",
      calories: 150,
    },
    { id: "s11", name: "כוס קורנפלקס קטנה כנשנוש יבש", calories: 100 },
    {
      id: "s12",
      name: "רול סושי קטן (מאקי 6 יחידות צמחוני) כנשנוש",
      calories: 140,
    },
    { id: "s3", name: "חטיף אנרגיה/חלבון קטן (עד 150 קל׳)", calories: 150 },
    { id: "s4", name: "מעדן סויה / יוגורט טבעי 1.5% + פרי קטן", calories: 120 },
    {
      id: "s5",
      name: "קפה הפוך קטן על חלב דל שומן/סויה + עוגיית גרנולה",
      calories: 140,
    },
  ],
  dinner: [
    {
      id: "d13",
      name: "סלט טונה/סרדינים (קופסה) + כף מיונז קל + 2 פרוסות לחם רגיל + ירקות",
      calories: 350,
    },
    {
      id: "d14",
      name: "טורטיה מקומחת מגולגלת עם חביתה (ביצה 1) + כף טחינה/מיונז + סלט",
      calories: 320,
    },
    {
      id: "d12",
      name: "פילה סלמון בתנור (120 ג׳) + סלט ירוק עם שמן זית ולימון",
      calories: 320,
    },
    {
      id: "d15",
      name: "פיתה מיני + שווארמה עוף קטנה (100 ג׳) שנשארה מצהריים + סלט",
      calories: 350,
    },
    {
      id: "d1",
      name: "שקשוקה (2 ביצים, כפית שמן) + פרוסת לחם מלא + סלט",
      calories: 350,
    },
    {
      id: "d2",
      name: "סלט יווני: 50 ג׳ בולגרית 5%, 5 זיתים, כפית שמן + לחם קל",
      calories: 300,
    },
    {
      id: "d10",
      name: "2 פרוסות לחם רגיל + כף טחינה + ביצה קשה + סלט ירקות",
      calories: 360,
    },
    {
      id: "d5",
      name: "פיצה פיתה (פיתה קלה, רסק, גבינה צהובה 9%, תוספות)",
      calories: 220,
    },
    {
      id: "d11",
      name: 'פיצה פיתה על פיתה מיני (רסק, גב"צ 9%, זיתים)',
      calories: 260,
    },
    {
      id: "d7",
      name: "פשטידת ירקות קלה (מנה בינונית) + סלט ירקות גדול",
      calories: 260,
    },
  ],
};

const DAILY_GOAL = 1300;
const WATER_GOAL = 8;

const formatDate = (dateObj) => {
  return dateObj.toISOString().split("T")[0];
};

const getDisplayDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
};

export default function App() {
  // קוד קטן שדואג להפעיל את העיצוב (Tailwind) אוטומטית בכל סביבה (כולל CodeSandbox)
  useEffect(() => {
    if (!document.getElementById("tailwind-cdn")) {
      const script = document.createElement("script");
      script.id = "tailwind-cdn";
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
    }
  }, []);

  const todayStr = formatDate(new Date());
  const [currentDate, setCurrentDate] = useState(todayStr);

  const [logs, setLogs] = useState({
    [todayStr]: {
      meals: { breakfast: [], lunch: [], snack: [], dinner: [] },
      exercise: false,
      water: 0,
    },
  });

  const [weights, setWeights] = useState([]);
  const [newWeight, setNewWeight] = useState("");

  const currentDayLog = logs[currentDate] || {
    meals: { breakfast: [], lunch: [], snack: [], dinner: [] },
    exercise: false,
    water: 0,
  };

  const totalCalories = useMemo(() => {
    let total = 0;
    Object.values(currentDayLog.meals).forEach((mealArray) => {
      mealArray.forEach((food) => {
        total += food.calories;
      });
    });
    return total;
  }, [currentDayLog]);

  const changeDate = (days) => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + days);
    setCurrentDate(formatDate(d));
  };

  const initLogForDateIfNeeded = (date) => {
    setLogs((prev) => {
      if (prev[date]) return prev;
      return {
        ...prev,
        [date]: {
          meals: { breakfast: [], lunch: [], snack: [], dinner: [] },
          exercise: false,
          water: 0,
        },
      };
    });
  };

  const addFood = (mealType, foodId) => {
    if (!foodId) return;
    const foodItem = FOOD_DB[mealType].find((f) => f.id === foodId);
    if (!foodItem) return;

    const instanceId = crypto.randomUUID
      ? crypto.randomUUID()
      : Date.now().toString() + Math.random().toString();

    setLogs((prev) => {
      const dayLog = prev[currentDate] || {
        meals: { breakfast: [], lunch: [], snack: [], dinner: [] },
        exercise: false,
        water: 0,
      };
      return {
        ...prev,
        [currentDate]: {
          ...dayLog,
          meals: {
            ...dayLog.meals,
            [mealType]: [
              ...dayLog.meals[mealType],
              { ...foodItem, instanceId },
            ],
          },
        },
      };
    });
  };

  const addCustomFood = (mealType, name, calories) => {
    if (!name || isNaN(calories) || calories === "") return; // אפשרנו לקבל גם ערכים שליליים לקיזוז

    const instanceId = crypto.randomUUID
      ? crypto.randomUUID()
      : Date.now().toString() + Math.random().toString();
    const customFoodItem = {
      id: `custom-${instanceId}`,
      name: `(אישי) ${name}`,
      calories: parseInt(calories, 10),
      instanceId,
    };

    initLogForDateIfNeeded(currentDate);
    setLogs((prev) => {
      const dayLog = prev[currentDate] || {
        meals: { breakfast: [], lunch: [], snack: [], dinner: [] },
        exercise: false,
        water: 0,
      };
      return {
        ...prev,
        [currentDate]: {
          ...dayLog,
          meals: {
            ...dayLog.meals,
            [mealType]: [...dayLog.meals[mealType], customFoodItem],
          },
        },
      };
    });
  };

  const removeFood = (mealType, instanceId) => {
    setLogs((prev) => {
      const dayLog = prev[currentDate];
      if (!dayLog) return prev;
      return {
        ...prev,
        [currentDate]: {
          ...dayLog,
          meals: {
            ...dayLog.meals,
            [mealType]: dayLog.meals[mealType].filter(
              (f) => f.instanceId !== instanceId
            ),
          },
        },
      };
    });
  };

  const toggleExercise = () => {
    initLogForDateIfNeeded(currentDate);
    setLogs((prev) => {
      const dayLog = prev[currentDate] || {
        meals: { breakfast: [], lunch: [], snack: [], dinner: [] },
        exercise: false,
        water: 0,
      };
      return {
        ...prev,
        [currentDate]: {
          ...dayLog,
          exercise: !dayLog.exercise,
        },
      };
    });
  };

  const updateWater = (amount) => {
    initLogForDateIfNeeded(currentDate);
    setLogs((prev) => {
      const dayLog = prev[currentDate] || {
        meals: { breakfast: [], lunch: [], snack: [], dinner: [] },
        exercise: false,
        water: 0,
      };
      const newWater = Math.max(0, (dayLog.water || 0) + amount);
      return {
        ...prev,
        [currentDate]: {
          ...dayLog,
          water: newWater,
        },
      };
    });
  };

  const handleAddWeight = () => {
    if (!newWeight || isNaN(newWeight)) return;
    const newWeightEntry = {
      id: Date.now().toString(),
      date: currentDate,
      weight: parseFloat(newWeight),
    };
    setWeights((prev) =>
      [...prev, newWeightEntry].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      )
    );
    setNewWeight("");
  };

  const deleteWeight = (id) => {
    setWeights((prev) => prev.filter((w) => w.id !== id));
  };

  const MealSection = ({
    title,
    mealType,
    icon: Icon,
    headerColorClass,
    headerBgClass,
    borderColorClass,
  }) => {
    const [selectedFood, setSelectedFood] = useState("");
    const [isCustomOpen, setIsCustomOpen] = useState(false);
    const [customName, setCustomName] = useState("");
    const [customCal, setCustomCal] = useState("");

    const mealItems = currentDayLog.meals[mealType] || [];
    const mealCalories = mealItems.reduce(
      (sum, item) => sum + item.calories,
      0
    );

    const handleCustomSubmit = (e) => {
      e.preventDefault();
      addCustomFood(mealType, customName, customCal);
      setCustomName("");
      setCustomCal("");
      setIsCustomOpen(false);
    };

    return (
      <div
        className={`bg-white rounded-2xl shadow-md border-2 ${borderColorClass} p-5 mb-6 transition-all hover:shadow-lg`}
      >
        <div className="flex items-center justify-between mb-5 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div
              className={`p-2 rounded-xl ${headerBgClass} ${headerColorClass}`}
            >
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-400 font-medium mb-0.5">
              סה״כ בארוחה:
            </span>
            <span className="text-lg font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
              {mealCalories} <span className="text-sm font-medium">קל׳</span>
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <select
            className="flex-1 bg-white border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none shadow-sm text-slate-700 font-medium"
            value={selectedFood}
            onChange={(e) => setSelectedFood(e.target.value)}
          >
            <option value="">בחר/י מנה מהרשימה...</option>
            {FOOD_DB[mealType].map((food) => (
              <option key={food.id} value={food.id}>
                {food.name} ({food.calories} קל׳)
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              addFood(mealType, selectedFood);
              setSelectedFood("");
            }}
            disabled={!selectedFood}
            className="bg-teal-600 hover:bg-teal-700 disabled:bg-slate-300 text-white px-5 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">הוסף לארוחה</span>
          </button>
        </div>

        <div className="mb-4 flex flex-col items-start">
          <button
            onClick={() => setIsCustomOpen(!isCustomOpen)}
            className="text-sm text-teal-600 hover:text-teal-800 font-medium flex items-center gap-1 transition-colors px-1"
          >
            {isCustomOpen
              ? "- סגור הוספה אישית"
              : "+ הוסף מנה אישית (שלא ברשימה) או קזז קלוריות"}
          </button>

          {isCustomOpen && (
            <form
              onSubmit={handleCustomSubmit}
              className="mt-2 w-full flex flex-col sm:flex-row gap-2 bg-teal-50/50 p-3 rounded-xl border border-teal-100"
            >
              <input
                type="text"
                placeholder="שם המנה (לדוג: עוגייה / בלי לחם)"
                required
                className="flex-2 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
              />
              <input
                type="number"
                placeholder="קלוריות (לקיזוז רשום מינוס: -70)"
                required
                className="flex-1 border border-slate-200 rounded-lg p-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
                value={customCal}
                onChange={(e) => setCustomCal(e.target.value)}
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold whitespace-nowrap shadow-sm"
              >
                עדכן
              </button>
            </form>
          )}
        </div>

        {mealItems.length > 0 && (
          <div className="mt-5">
            <h4 className="text-sm font-bold text-slate-500 mb-3 px-1">
              נבחרו לארוחה:
            </h4>
            <ul className="space-y-3">
              {mealItems.map((item) => (
                <li
                  key={item.instanceId}
                  className="group flex justify-between items-center text-sm bg-slate-100/80 p-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="bg-white p-1 rounded-full shadow-sm border border-slate-200">
                      <Check className="w-4 h-4 text-teal-600 shrink-0" />
                    </div>
                    <span
                      className="text-slate-800 font-medium truncate text-base"
                      title={item.name}
                    >
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 mr-4">
                    <span
                      className="text-slate-700 font-black bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200"
                      dir="ltr"
                    >
                      {item.calories} קל׳
                    </span>
                    <button
                      onClick={() => removeFood(mealType, item.instanceId)}
                      className="text-slate-400 hover:text-rose-500 transition-colors p-1.5 rounded-md hover:bg-rose-50"
                      title="הסר מנה"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#f1f5f9] text-slate-900 font-sans pb-10"
    >
      <header className="bg-teal-700 text-white sticky top-0 z-10 shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Apple className="w-7 h-7 text-teal-300" />
            <h1 className="text-2xl font-bold tracking-tight">
              יומן התזונה שלי
            </h1>
          </div>

          <div className="flex items-center bg-teal-800 rounded-full p-1.5 shadow-inner">
            <button
              onClick={() => changeDate(-1)}
              className="p-2 hover:bg-teal-700 rounded-full transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="px-5 flex items-center gap-2 font-bold min-w-[150px] justify-center text-lg">
              <CalendarDays className="w-5 h-5 text-teal-300" />
              <span>
                {currentDate === todayStr
                  ? "היום"
                  : getDisplayDate(currentDate)}
              </span>
            </div>
            <button
              onClick={() => changeDate(1)}
              className="p-2 hover:bg-teal-700 rounded-full transition-colors disabled:opacity-50"
              disabled={currentDate === todayStr}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <section className="bg-white rounded-3xl shadow-md border border-slate-200 p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-teal-50 rounded-bl-full -z-10 opacity-60"></div>

          <div className="flex-1 text-center md:text-right">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">
              מצב קלורי יומי
            </h2>
            <p className="text-slate-500 font-medium text-lg">
              היעד שלך: {DAILY_GOAL} קלוריות
            </p>

            <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
              <button
                onClick={toggleExercise}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all shadow-sm ${
                  currentDayLog.exercise
                    ? "bg-green-50 border-green-400 text-green-700"
                    : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                }`}
              >
                {currentDayLog.exercise ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
                <span className="font-bold text-base">
                  פעילות גופנית בוצעה היום
                </span>
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center shrink-0">
            <svg className="w-48 h-48 transform -rotate-90 drop-shadow-sm">
              <circle
                cx="96"
                cy="96"
                r="84"
                stroke="currentColor"
                strokeWidth="14"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="96"
                cy="96"
                r="84"
                stroke="currentColor"
                strokeWidth="14"
                fill="transparent"
                strokeDasharray={527.7}
                strokeDashoffset={Math.max(
                  0,
                  527.7 - (totalCalories / DAILY_GOAL) * 527.7
                )}
                strokeLinecap="round"
                className={`${
                  totalCalories > DAILY_GOAL ? "text-rose-500" : "text-teal-500"
                } transition-all duration-1000 ease-in-out`}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span
                className={`text-4xl font-black ${
                  totalCalories > DAILY_GOAL
                    ? "text-rose-600"
                    : "text-slate-800"
                }`}
              >
                {totalCalories}
              </span>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider mt-1">
                סה״כ נצרכו
              </span>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl shadow-sm border border-blue-100 p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 text-blue-500 rounded-full shadow-sm">
              <Droplets className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">
                מעקב שתיית מים
              </h3>
              <p className="text-sm text-slate-500 font-medium">
                יעד: לפחות {WATER_GOAL} כוסות ביום
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-blue-50">
            <button
              onClick={() => updateWater(-1)}
              disabled={currentDayLog.water === 0}
              className="text-slate-400 hover:text-blue-500 disabled:opacity-30 transition-colors p-1"
            >
              <MinusCircle className="w-8 h-8" />
            </button>
            <div className="flex gap-1.5">
              {[...Array(Math.max(WATER_GOAL, currentDayLog.water))].map(
                (_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-8 rounded-b-md rounded-t-sm transition-all duration-300 border-2 ${
                      i < currentDayLog.water
                        ? "bg-blue-400 border-blue-500 shadow-inner"
                        : "bg-slate-100 border-slate-200"
                    }`}
                  ></div>
                )
              )}
            </div>
            <button
              onClick={() => updateWater(1)}
              className="text-blue-500 hover:text-blue-700 transition-colors p-1"
            >
              <PlusCircle className="w-8 h-8" />
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-black text-slate-800 mb-4 px-2 flex items-center gap-3">
              <Utensils className="w-6 h-6 text-slate-400" />
              יומן ארוחות
            </h2>
            <MealSection
              title="ארוחת בוקר"
              mealType="breakfast"
              icon={Coffee}
              headerBgClass="bg-amber-100"
              headerColorClass="text-amber-600"
              borderColorClass="border-amber-400"
            />
            <MealSection
              title="ארוחת צהריים"
              mealType="lunch"
              icon={Utensils}
              headerBgClass="bg-orange-100"
              headerColorClass="text-orange-600"
              borderColorClass="border-orange-400"
            />
            <MealSection
              title="ארוחת ביניים"
              mealType="snack"
              icon={Apple}
              headerBgClass="bg-green-100"
              headerColorClass="text-green-600"
              borderColorClass="border-green-400"
            />
            <MealSection
              title="ארוחת ערב"
              mealType="dinner"
              icon={Moon}
              headerBgClass="bg-indigo-100"
              headerColorClass="text-indigo-600"
              borderColorClass="border-indigo-400"
            />
          </div>

          <div className="lg:col-span-5 space-y-8">
            <section className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-3">
                <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  שקילה שבועית
                </h3>
              </div>

              <div className="flex gap-2 mb-6">
                <input
                  type="number"
                  placeholder="משקל בק״ג"
                  className="flex-1 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 font-medium"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  step="0.1"
                />
                <button
                  onClick={handleAddWeight}
                  disabled={!newWeight}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-5 py-2 rounded-xl transition-colors font-bold text-sm whitespace-nowrap shadow-sm"
                >
                  שמור
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm text-right">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3.5 font-bold">תאריך</th>
                      <th className="px-4 py-3.5 font-bold">משקל</th>
                      <th className="px-4 py-3.5 font-bold"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {weights.map((w) => (
                      <tr
                        key={w.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-4 py-3.5 text-slate-600 font-medium">
                          {getDisplayDate(w.date)}
                        </td>
                        <td className="px-4 py-3.5 font-black text-slate-800 text-base">
                          {w.weight}
                        </td>
                        <td className="px-4 py-3.5 text-left">
                          <button
                            onClick={() => deleteWeight(w.id)}
                            className="text-slate-300 hover:text-rose-500 transition-colors p-1.5 rounded-md hover:bg-white"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {weights.length === 0 && (
                      <tr>
                        <td
                          colSpan="3"
                          className="text-center py-6 text-slate-400 italic font-medium"
                        >
                          לא הוזנו נתוני שקילה עדיין
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-5 border-b border-slate-100 pb-3">
                <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600">
                  <CalendarDays className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  ארכיון יומי
                </h3>
              </div>

              <div className="overflow-y-auto max-h-[350px] pr-2 custom-scrollbar rounded-xl border border-slate-200">
                <table className="w-full text-sm text-right">
                  <thead className="bg-slate-50 text-slate-600 sticky top-0 border-b border-slate-200 shadow-sm z-10">
                    <tr>
                      <th className="px-3 py-3.5 font-bold">תאריך</th>
                      <th className="px-3 py-3.5 font-bold">קלוריות</th>
                      <th className="px-3 py-3.5 font-bold text-center">
                        מים/אימון
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {Object.keys(logs).length === 0 ? (
                      <tr>
                        <td
                          colSpan="3"
                          className="text-center py-6 text-slate-400 italic font-medium"
                        >
                          אין נתונים בארכיון
                        </td>
                      </tr>
                    ) : (
                      Object.entries(logs)
                        .sort(
                          ([dateA], [dateB]) =>
                            new Date(dateB) - new Date(dateA)
                        )
                        .map(([date, log]) => {
                          let dailyTotal = 0;
                          Object.values(log.meals).forEach((mealArray) => {
                            mealArray.forEach((food) => {
                              dailyTotal += food.calories;
                            });
                          });

                          if (
                            dailyTotal === 0 &&
                            !log.exercise &&
                            log.water === 0 &&
                            date !== currentDate &&
                            date !== todayStr
                          )
                            return null;

                          return (
                            <tr
                              key={date}
                              className={`hover:bg-slate-50 transition-colors cursor-pointer ${
                                date === currentDate ? "bg-teal-50/60" : ""
                              }`}
                              onClick={() => setCurrentDate(date)}
                            >
                              <td className="px-3 py-3.5 font-bold text-slate-700">
                                {date === todayStr
                                  ? "היום"
                                  : getDisplayDate(date)}
                              </td>
                              <td className="px-3 py-3.5">
                                <span
                                  className={`inline-block px-3 py-1 rounded-md text-xs font-black border ${
                                    dailyTotal > DAILY_GOAL
                                      ? "bg-rose-50 text-rose-700 border-rose-200"
                                      : "bg-teal-50 text-teal-700 border-teal-200"
                                  }`}
                                >
                                  {dailyTotal} / {DAILY_GOAL}
                                </span>
                              </td>
                              <td className="px-3 py-3.5 text-center flex flex-col items-center justify-center gap-1">
                                <div className="flex items-center gap-2">
                                  {log.exercise && (
                                    <div className="bg-green-100 p-1 rounded-full">
                                      <Dumbbell className="w-3 h-3 text-green-600" />
                                    </div>
                                  )}
                                  {log.water > 0 && (
                                    <span className="text-xs font-bold text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-md">
                                      {log.water} כוסות
                                    </span>
                                  )}
                                </div>
                                {!log.exercise &&
                                  (!log.water || log.water === 0) && (
                                    <span className="text-slate-300 font-bold">
                                      -
                                    </span>
                                  )}
                              </td>
                            </tr>
                          );
                        })
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f8fafc; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }
      `,
        }}
      />
    </div>
  );
}
