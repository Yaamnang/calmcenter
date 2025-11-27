import { chatbotData, defaultResponses, ChatResponse } from '../data/chatbot';
import { FuzzyMatcher } from '../utils/fuzzyMatch';

export class ChatbotService {
  private fuzzyMatcher: FuzzyMatcher;

  constructor() {
    this.fuzzyMatcher = new FuzzyMatcher();
  }

  public getResponse(userInput: string): string {
    const normalizedInput = userInput.toLowerCase().trim();
    
    // Check for exact matches first
    for (const category of chatbotData) {
      for (const pattern of category.patterns) {
        if (normalizedInput.includes(pattern.toLowerCase())) {
          return this.getRandomResponse(category.responses);
        }
      }
    }

    // Use fuzzy matching for similar patterns
    const bestMatch = this.findBestCategoryMatch(userInput);
    if (bestMatch && bestMatch.confidence > 0.3) {
      return this.getRandomResponse(bestMatch.category.responses);
    }

    // Fallback to default responses
    return this.getRandomResponse(defaultResponses);
  }

  private findBestCategoryMatch(userInput: string): { category: ChatResponse; confidence: number } | null {
    let bestCategory: ChatResponse | null = null;
    let highestConfidence = 0;

    chatbotData.forEach(category => {
      const match = this.fuzzyMatcher.findBestMatch(userInput, category.patterns);
      if (match.confidence > highestConfidence) {
        highestConfidence = match.confidence;
        bestCategory = category;
      }
    });

    return bestCategory && highestConfidence > 0.3 ? { category: bestCategory, confidence: highestConfidence } : null;
  }

  private getRandomResponse(responses: string[]): string {
    return responses[Math.floor(Math.random() * responses.length)];
  }
}