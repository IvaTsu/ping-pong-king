const emojis = Object.freeze([
  "😄",
  "😃",
  "😀",
  "😊",
  "😉",
  "😜",
  "😝",
  "😛",
  "😳",
  "😁",
  "😔",
  "😌",
  "😒",
  "😞",
  "😣",
  "😢",
  "😂",
  "😭",
  "😪",
  "😥",
  "😰",
  "😅",
  "😓",
  "😩",
  "😫",
  "😨",
  "😱",
  "😠",
  "😡",
  "😤",
  "😖",
  "😆",
  "😷",
  "😎",
  "😵",
  "😲",
  "😟",
  "😦",
  "😧",
  "😈",
  "👿",
  "😮",
  "😬",
  "😐",
  "😕",
  "😯",
  "😶",
  "😇",
  "😏",
  "😑",
  "👲",
  "👳",
  "👷",
  "💂",
  "👶",
  "👴",
  "👱",
  "👼",
  "👸",
  "😺",
  "😸",
  "😼",
  "🙀",
  "😿",
  "😹",
  "😾",
  "👹",
  "👺",
  "🙈",
  "🙉",
  "🙊",
  "💀",
  "👽",
  "💩",
  "🔥",
  "✨",
  "🌟",
  "💫",
  "💥",
  "👍",
  "👎",
  "👌",
  "👊",
  "✊",
  "👋",
  "✋",
  "👏",
  "💪",
  "🙆",
  "🙅",
  "💁",
  "🎩",
  "👑",
  "🐶",
  "🐺",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🐸",
  "🐯",
  "🐨",
  "🐻",
  "🐷",
  "🐽",
  "🐮",
  "🐗",
  "🐵",
  "🐒",
  "🐴",
  "🐑",
  "🐘",
  "🐼",
  "🐧",
  "🐦",
  "🐤",
  "🐥",
  "🐣",
  "🐔",
  "🐍",
  "🐢",
  "🐛",
  "🐝",
  "🐜",
  "🐞",
  "🐌",
  "🐙",
  "🐚",
  "🐠",
  "🐟",
  "🐬",
  "🐳",
  "🐋",
  "🐄",
  "🐏",
  "🐀",
  "🐃",
  "🐅",
  "🐇",
  "🐉",
  "🐎",
  "🐐",
  "🐓",
  "🐕",
  "🐖",
  "🐁",
  "🐂",
  "🐲",
  "🐡",
  "🐊",
  "🐫",
  "🐪",
  "🐆",
  "🐈",
  "🐩",
  "🌚",
  "⚡",
  "🎆",
  "🎇",
  "🎃",
  "👻",
  "🎉",
  "🎊",
  "🚬",
  "💣",
  "🔫",
  "🔪",
  "💊",
  "🎲",
  "🎯",
  "☕",
  "🍵",
  "🍶",
  "🍼",
  "🍺",
  "🍻",
  "🍸",
  "🍹",
  "🍷",
  "🍕",
  "🍔",
  "🍟",
  "🍗",
  "🍖",
  "🍝",
  "🍛",
  "🍤",
  "🍱",
  "🍣",
  "🍥",
  "🍙",
  "🍘",
  "🍚",
  "🍜",
  "🍲",
  "🍢",
  "🍡",
  "🍳",
  "🍞",
  "🍩",
  "🍮",
  "🍦",
  "🍨",
  "🍧",
  "🎂",
  "🍰",
  "🍪",
  "🍫",
  "🍬",
  "🍭",
  "🍯",
  "🍎",
  "🍏",
  "🍊",
  "🍋",
  "🍒",
  "🍇",
  "🍉",
  "🍓",
  "🍑",
  "🍈",
  "🍌",
  "🍐",
  "🍍",
  "🍠",
  "🍆",
  "🍅",
  "🌽",
  "🌄",
  "🌅",
  "🗿",
  "🚩",
  "🆗",
  "🚫",
  "🔞",
  "🔝",
  "❌",
  "⭕",
  "❗",
  "❓",
  "❕",
  "❔",
  "💯",
  "✔",
]);

export default function getRandomEmoji(): string {
  return emojis[Math.floor(Math.random() * emojis.length)];
}
