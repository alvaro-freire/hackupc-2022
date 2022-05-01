function getPoints(emojis) {
  let points = 0
  for (const line of emojis) {
    for (const emoji of line) {
      switch (emoji) {
        case '⬜':
          break;
        case '🟨':
          points += 50;
          break;
        case '🟩':
          points += 100;
          break;
      }
    }
  }
  return Math.floor(points / emojis.length)
}

export default getPoints