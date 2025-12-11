/**
 * Транслитерация кириллицы в латиницу и обратно
 * Используется для автоматического заполнения ФИО на обоих языках
 */

// Таблица транслитерации кириллица -> латиница (ГОСТ 7.79-2000 система Б)
const cyrToLatMap: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "kh",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
  // Кыргызские буквы
  ө: "o",
  ү: "u",
  ң: "n",
};

// Таблица транслитерации латиница -> кириллица
const latToCyrMap: Record<string, string> = {
  a: "а",
  b: "б",
  c: "к",
  d: "д",
  e: "е",
  f: "ф",
  g: "г",
  h: "х",
  i: "и",
  j: "дж",
  k: "к",
  l: "л",
  m: "м",
  n: "н",
  o: "о",
  p: "п",
  q: "к",
  r: "р",
  s: "с",
  t: "т",
  u: "у",
  v: "в",
  w: "в",
  x: "кс",
  y: "й",
  z: "з",
};

// Диграфы латиница -> кириллица (порядок важен - сначала длинные)
const latToCyrDigraphs: [string, string][] = [
  ["shch", "щ"],
  ["zh", "ж"],
  ["kh", "х"],
  ["ts", "ц"],
  ["ch", "ч"],
  ["sh", "ш"],
  ["yu", "ю"],
  ["ya", "я"],
  ["yo", "ё"],
  ["ye", "е"],
];

/**
 * Определяет, является ли строка преимущественно кириллицей
 */
export function isCyrillic(text: string): boolean {
  const cyrillicRegex = /[а-яёөүң]/i;
  const latinRegex = /[a-z]/i;

  const cyrCount = (text.match(/[а-яёөүң]/gi) || []).length;
  const latCount = (text.match(/[a-z]/gi) || []).length;

  // Если есть хоть одна кириллическая буква и их больше или равно латинским
  if (cyrillicRegex.test(text) && cyrCount >= latCount) {
    return true;
  }

  // Если только латиница
  if (latinRegex.test(text) && cyrCount === 0) {
    return false;
  }

  // По умолчанию считаем кириллицей
  return true;
}

/**
 * Определяет, является ли строка преимущественно латиницей
 */
export function isLatin(text: string): boolean {
  return !isCyrillic(text);
}

/**
 * Транслитерация кириллицы в латиницу
 */
export function cyrillicToLatin(text: string): string {
  if (!text) return "";

  let result = "";

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const lowerChar = char.toLowerCase();
    const isUpperCase = char !== lowerChar;

    if (cyrToLatMap[lowerChar] !== undefined) {
      const transliterated = cyrToLatMap[lowerChar];
      if (isUpperCase && transliterated.length > 0) {
        // Capitalize first letter of transliterated sequence
        result += transliterated.charAt(0).toUpperCase() + transliterated.slice(1);
      } else {
        result += transliterated;
      }
    } else {
      // Оставляем символ как есть (пробелы, дефисы и т.д.)
      result += char;
    }
  }

  return result;
}

/**
 * Транслитерация латиницы в кириллицу
 */
export function latinToCyrillic(text: string): string {
  if (!text) return "";

  let result = "";
  let i = 0;

  while (i < text.length) {
    let found = false;

    // Сначала проверяем диграфы (от длинных к коротким)
    for (const [digraph, cyrillic] of latToCyrDigraphs) {
      const substr = text.slice(i, i + digraph.length).toLowerCase();
      if (substr === digraph) {
        const isUpperCase = text[i] !== text[i].toLowerCase();
        if (isUpperCase) {
          result += cyrillic.charAt(0).toUpperCase() + cyrillic.slice(1);
        } else {
          result += cyrillic;
        }
        i += digraph.length;
        found = true;
        break;
      }
    }

    if (!found) {
      const char = text[i];
      const lowerChar = char.toLowerCase();
      const isUpperCase = char !== lowerChar;

      if (latToCyrMap[lowerChar] !== undefined) {
        const transliterated = latToCyrMap[lowerChar];
        if (isUpperCase && transliterated.length > 0) {
          result += transliterated.charAt(0).toUpperCase() + transliterated.slice(1);
        } else {
          result += transliterated;
        }
      } else {
        // Оставляем символ как есть
        result += char;
      }
      i++;
    }
  }

  return result;
}

/**
 * Автоматическая транслитерация ФИО
 * Возвращает объект с кириллическим и латинским вариантами
 */
export function transliterateName(name: string | null | undefined): {
  cyrillic: string;
  latin: string;
} {
  if (!name || name.trim() === "") {
    return { cyrillic: "", latin: "" };
  }

  const trimmedName = name.trim();

  if (isCyrillic(trimmedName)) {
    return {
      cyrillic: trimmedName,
      latin: cyrillicToLatin(trimmedName),
    };
  } else {
    return {
      cyrillic: latinToCyrillic(trimmedName),
      latin: trimmedName,
    };
  }
}

/**
 * Транслитерация полного ФИО
 * Возвращает объект со всеми полями на обоих языках
 */
export function transliterateFullName(data: {
  surname: string;
  names: string;
  patronymic?: string | null;
}): {
  surname: string;
  names: string;
  patronymic: string;
  surname_en: string;
  names_en: string;
  patronymic_en: string;
} {
  const surnameResult = transliterateName(data.surname);
  const namesResult = transliterateName(data.names);
  const patronymicResult = transliterateName(data.patronymic);

  return {
    surname: surnameResult.cyrillic,
    names: namesResult.cyrillic,
    patronymic: patronymicResult.cyrillic,
    surname_en: surnameResult.latin,
    names_en: namesResult.latin,
    patronymic_en: patronymicResult.latin,
  };
}
