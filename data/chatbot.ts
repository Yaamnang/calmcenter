export interface ChatResponse {
  patterns: string[];
  responses: string[];
  category: string;
}

export const chatbotData: ChatResponse[] = [
  {
    category: "greeting",
    patterns: [
      "hello", "hi", "hey", "good morning", "good afternoon", "good evening",
      "howdy", "what's up", "hi there", "hello there"
    ],
    responses: [
      "Hello! How can I help you today?",
      "Hi there! What can I do for you?",
      "Hey! Welcome to our support. How can I assist you?",
      "Hello! Thanks for reaching out. How can I help?"
    ]
  },
  {
    category: "farewell",
    patterns: [
      "bye", "goodbye", "see you", "see ya", "take care", "have a good day",
      "cya", "later", "bye bye", "good night"
    ],
    responses: [
      "Goodbye! Have a great day!",
      "See you later! Feel free to come back if you have more questions.",
      "Take care! We're here if you need anything else.",
      "Bye! Thanks for chatting with us!"
    ]
  },
  {
    category: "help",
    patterns: [
      "help", "support", "can you help", "need help", "assist me",
      "what can you do", "how does this work", "help me"
    ],
    responses: [
      "I'm here to help! You can ask me about our products, services, shipping, returns, or anything else.",
      "I'd be happy to help! What do you need assistance with?",
      "Sure! I can help with product information, orders, shipping, and more. What do you need?",
      "I'm here to assist you! Feel free to ask any questions about our services."
    ]
  },
  {
    category: "shipping",
    patterns: [
      "shipping", "delivery", "when will it arrive", "shipping time",
      "how long shipping", "delivery time", "when shipped", "track order",
      "shipping cost", "free shipping"
    ],
    responses: [
      "We offer free standard shipping on orders over $50. Standard shipping takes 3-5 business days.",
      "Shipping typically takes 2-7 business days depending on your location. Express shipping is available.",
      "You can track your order using the tracking link in your confirmation email.",
      "Standard shipping: 3-5 days, Express: 1-2 days, Overnight: next business day."
    ]
  },
  {
    category: "returns",
    patterns: [
      "return", "refund", "exchange", "return policy", "how to return",
      "can I return", "return item", "refund policy", "money back"
    ],
    responses: [
      "We have a 30-day return policy. Items must be unused with original tags.",
      "You can return items within 30 days of delivery for a full refund.",
      "Returns are easy! Just contact support and we'll send you a return label.",
      "Our return policy allows returns within 30 days. Some items may be final sale."
    ]
  },
  {
    category: "products",
    patterns: [
      "products", "items", "what do you sell", "catalog", "inventory",
      "available products", "product range", "merchandise"
    ],
    responses: [
      "We offer a wide range of products including electronics, home goods, and fashion items.",
      "Our catalog includes electronics, clothing, home decor, and accessories.",
      "We have products in categories like electronics, fashion, home, and beauty.",
      "You can browse our complete catalog on our website. Is there a specific category you're interested in?"
    ]
  },
  {
    category: "pricing",
    patterns: [
      "price", "cost", "how much", "pricing", "discount", "sale",
      "expensive", "cheap", "affordable", "price range"
    ],
    responses: [
      "Our prices are competitive and we regularly run sales and promotions.",
      "We offer products at various price points to suit different budgets.",
      "Check our website for current pricing and any ongoing sales.",
      "We have a range of products from budget-friendly to premium options."
    ]
  },
  {
    category: "contact",
    patterns: [
      "contact", "phone number", "email", "call", "speak to someone",
      "customer service", "support phone", "live person", "talk to agent"
    ],
    responses: [
      "You can reach us at support@company.com or call 1-800-123-4567.",
      "Our customer service team is available Mon-Fri 9AM-6PM at 1-800-123-4567.",
      "Contact us via email at support@company.com or through our contact form.",
      "We're here to help! Call us at 1-800-123-4567 or email support@company.com."
    ]
  },
  {
    category: "website",
    patterns: [
      "website", "site", "online", "web address", "url",
      "where to buy", "how to order", "online store", "ecommerce"
    ],
    responses: [
      "You can shop on our website at www.company.com",
      "Visit www.company.com to browse our full catalog and place orders.",
      "Our online store is available 24/7 at www.company.com",
      "Shop easily at www.company.com with secure checkout and fast shipping."
    ]
  },
  {
    category: "technical",
    patterns: [
      "not working", "broken", "defective", "issue", "problem",
      "error", "bug", "technical issue", "malfunction", "defect"
    ],
    responses: [
      "I'm sorry you're having issues. Please contact our technical support team for assistance.",
      "For technical issues, please reach out to our support team with details about the problem.",
      "Let me connect you with our technical team. They'll help resolve the issue quickly.",
      "I understand the frustration. Our technical team can help - contact them with specific details."
    ]
  },
  {
    category: "thanks",
    patterns: [
      "thanks", "thank you", "appreciate", "thx", "thank you so much",
      "thanks a lot", "grateful", "appreciation"
    ],
    responses: [
      "You're welcome! Happy to help.",
      "My pleasure! Let me know if you need anything else.",
      "You're very welcome! Have a great day.",
      "Glad I could help! Don't hesitate to reach out again."
    ]
  },
  {
    category: "hours",
    patterns: [
      "hours", "open", "closed", "business hours", "when are you open",
      "operating hours", "store hours", "working hours"
    ],
    responses: [
      "We're open Monday-Friday 9AM-6PM and Saturday 10AM-4PM (EST).",
      "Our business hours are Mon-Fri 9AM-6PM, Sat 10AM-4PM. Closed Sundays.",
      "You can reach us Monday through Friday, 9AM to 6PM Eastern Time.",
      "Our support team is available Mon-Fri 9AM-6PM EST."
    ]
  }
];

export const defaultResponses = [
  "I'm not sure I understand. Could you rephrase that?",
  "That's an interesting question. Let me connect you with more specific information.",
  "I'm still learning! Could you try asking that in a different way?",
  "I don't have the exact answer for that, but our support team can help!",
  "Let me think about that... Could you provide more details?",
  "I want to make sure I give you the right information. Could you clarify your question?"
];