export interface MatchResult {
  matched: boolean;
  category: string;
  confidence: number;
  response: string;
}

export class FuzzyMatcher {
  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private calculateSimilarity(str1: string, str2: string): number {
    const words1 = str1.split(' ');
    const words2 = str2.split(' ');
    
    let matches = 0;
    words1.forEach(word1 => {
      if (words2.some(word2 => {
        const distance = this.levenshteinDistance(word1, word2);
        const maxLength = Math.max(word1.length, word2.length);
        return maxLength === 0 ? 0 : (maxLength - distance) / maxLength > 0.7;
      })) {
        matches++;
      }
    });
    
    return matches / Math.max(words1.length, words2.length);
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => 
      Array(str1.length + 1).fill(null)
    );

    for (let i = 0; i <= str1.length; i++) {
      matrix[0][i] = i;
    }

    for (let j = 0; j <= str2.length; j++) {
      matrix[j][0] = j;
    }

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[str2.length][str1.length];
  }

  public findBestMatch(input: string, patterns: string[]): { pattern: string; confidence: number } {
    const normalizedInput = this.normalizeText(input);
    let bestMatch = { pattern: '', confidence: 0 };

    patterns.forEach(pattern => {
      const normalizedPattern = this.normalizeText(pattern);
      const similarity = this.calculateSimilarity(normalizedInput, normalizedPattern);
      
      if (similarity > bestMatch.confidence) {
        bestMatch = { pattern, confidence: similarity };
      }
    });

    return bestMatch;
  }
}