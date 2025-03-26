/**
 * Returns total XP required for a given level L in level up system (Modeled after the game: Runescape)
 * Levels typically go 1..99, but you can adapt as needed.
 */
export function xpForLevel(L: number): number {
    if (L <= 1) return 0; // Level 1 requires 0 XP
    let total = 0;
    for (let n = 1; n < L; n++) {
      total += Math.floor(n + 300 * 2 ** (n / 7));
    }
    return Math.floor(total / 4);
  }
  
  /**
   * Determines the highest level for which xpForLevel(level) <= xp.
   * We'll cap it at 99 since it will take years to achieve this
   */
  export function getLevelFromXp(xp: number): number {
    let level = 1;
    for (let l = 2; l <= 99; l++) {
      if (xpForLevel(l) > xp) {
        break;
      }
      level = l;
    }
    return level;
  }
  