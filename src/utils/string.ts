const WHITE_SPACES = [
  " ",
  "\n",
  "\r",
  "\t",
  "\f",
  "\v",
  "\u00A0",
  "\u1680",
  "\u180E",
  "\u2000",
  "\u2001",
  "\u2002",
  "\u2003",
  "\u2004",
  "\u2005",
  "\u2006",
  "\u2007",
  "\u2008",
  "\u2009",
  "\u200A",
  "\u2028",
  "\u2029",
  "\u202F",
  "\u205F",
  "\u3000",
];

interface ITrim {
  str: string;
  chars?: string[];
}

/**
 * Add space between camelCase text.
 */
export function unCamelCase(str: string): string {
  str = str.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, "$1 $2");
  str = str.toLowerCase(); // add space between camelCase text
  return str;
}

/**
 * Convert to lower case, remove accents, remove non-word chars and
 * replace spaces with the specified delimeter.
 * Does not split camelCase text.
 */
export function slugify({
  str,
  delimeter,
}: {
  str: string;
  delimeter?: string;
}): string {
  if (delimeter == null) {
    delimeter = "-";
  }

  str = replaceAccents(str);
  str = removeNonWord(str);
  str = trim({ str }) // should come after removeNonWord
    .replace(/ +/g, delimeter) // replace spaces with delimeter
    .toLowerCase();

  return str;
}

/**
 * Replaces spaces with hyphens, split camelCase text, remove non-word chars, remove accents and convert to lower case.
 */
export function hyphenate(str: string): string {
  str = unCamelCase(str);
  return slugify({ str, delimeter: "-" });
}

/**
 * Replaces all accented chars with regular ones
 */
export function replaceAccents(str: string): string {
  // verifies if the String has accents and replace them
  if (str.search(/[\xC0-\xFF]/g) > -1) {
    str = str
      .replace(/[\xC0-\xC5]/g, "A")
      .replace(/[\xC6]/g, "AE")
      .replace(/[\xC7]/g, "C")
      .replace(/[\xC8-\xCB]/g, "E")
      .replace(/[\xCC-\xCF]/g, "I")
      .replace(/[\xD0]/g, "D")
      .replace(/[\xD1]/g, "N")
      .replace(/[\xD2-\xD6\xD8]/g, "O")
      .replace(/[\xD9-\xDC]/g, "U")
      .replace(/[\xDD]/g, "Y")
      .replace(/[\xDE]/g, "P")
      .replace(/[\xE0-\xE5]/g, "a")
      .replace(/[\xE6]/g, "ae")
      .replace(/[\xE7]/g, "c")
      .replace(/[\xE8-\xEB]/g, "e")
      .replace(/[\xEC-\xEF]/g, "i")
      .replace(/[\xF1]/g, "n")
      .replace(/[\xF2-\xF6\xF8]/g, "o")
      .replace(/[\xF9-\xFC]/g, "u")
      .replace(/[\xFE]/g, "p")
      .replace(/[\xFD\xFF]/g, "y");
  }

  return str;
}

/**
 * Remove non-word chars.
 */
export function removeNonWord(str: string): string {
  return str.replace(/[^0-9a-zA-Z\xC0-\xFF -]/g, "");
}

/**
 * Remove chars from beginning of string.
 */
export function ltrim({ str, chars }: ITrim): string {
  chars = chars != null ? chars : WHITE_SPACES;

  let start = 0;
  const len = str.length;
  const charLen = chars.length;
  let found = true;
  let i;
  let c;

  while (found && start < len) {
    found = false;
    i = -1;
    c = str.charAt(start);

    while (++i < charLen) {
      if (c === chars[i]) {
        found = true;
        start++;
        break;
      }
    }
  }

  return start >= len ? "" : str.substr(start, len);
}

/**
 * Remove white-spaces from beginning and end of string.
 */
export function trim({
  str,
  chars,
}: {
  str: string;
  chars?: string[];
}): string {
  chars = chars != null ? chars : WHITE_SPACES;
  return ltrim({ str: rtrim({ str, chars }), chars });
}

/**
 * Remove chars from end of string.
 */
export function rtrim({ str, chars }: ITrim): string {
  chars = chars != null ? chars : WHITE_SPACES;

  let end = str.length - 1;
  const charLen = chars.length;
  let found = true;
  let i;
  let c;

  while (found && end >= 0) {
    found = false;
    i = -1;
    c = str.charAt(end);

    while (++i < charLen) {
      if (c === chars[i]) {
        found = true;
        end--;
        break;
      }
    }
  }

  return end >= 0 ? str.substring(0, end + 1) : "";
}
