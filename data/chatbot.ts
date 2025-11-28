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
      "Hello! Welcome to CalmCenter. How are you feeling today?",
      "Hi there! I'm here to listen and support you. How's your day going?",
      "Hey! Welcome to your safe space. What's on your mind?",
      "Hello! I'm glad you're here. How can I support you today?"
    ]
  },
  {
    category: "anxiety",
    patterns: [
      "anxious", "anxiety", "panic", "nervous", "worried", "stressed",
      "overwhelmed", "can't breathe", "heart racing", "panic attack",
      "feeling anxious", "so anxious", "anxious right now"
    ],
    responses: [
      "I hear you're feeling anxious. Try taking slow, deep breaths with me: breathe in for 4 counts, hold for 4, breathe out for 6.",
      "Anxiety can feel overwhelming. Remember, this feeling will pass. Would you like to try a grounding exercise?",
      "It's okay to feel anxious. Let's focus on your breathing together. You're safe right here, right now.",
      "I understand anxiety can be scary. Try naming 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste."
    ]
  },
  {
    category: "depression",
    patterns: [
      "depressed", "depression", "sad", "hopeless", "empty", "numb",
      "can't get out of bed", "no motivation", "worthless", "useless",
      "so sad", "feeling down", "really depressed"
    ],
    responses: [
      "I'm sorry you're feeling this way. Depression is really hard. You're not alone in this.",
      "It takes courage to acknowledge these feelings. Even small steps like reaching out matter.",
      "Your feelings are valid. Would it help to talk about what's been on your mind?",
      "Remember that this feeling is temporary, even if it doesn't feel that way right now. You've survived 100% of your bad days so far."
    ]
  },
  {
    category: "stress",
    patterns: [
      "stressed", "stress", "pressure", "burnout", "overwhelmed",
      "too much pressure", "can't handle", "stressed out", "burned out"
    ],
    responses: [
      "Stress can feel overwhelming. Let's break things down into smaller, manageable pieces.",
      "Remember to be kind to yourself. You're doing the best you can with what you have right now.",
      "Would it help to prioritize what absolutely needs to get done today versus what can wait?",
      "Let's try a quick stress relief technique: tense all your muscles for 5 seconds, then completely relax. Notice the difference."
    ]
  },
  {
    category: "sleep",
    patterns: [
      "can't sleep", "insomnia", "trouble sleeping", "waking up", "nightmares",
      "restless", "exhausted but can't sleep", "sleep problems"
    ],
    responses: [
      "Sleep struggles can be really tough. Have you tried establishing a relaxing bedtime routine?",
      "Sometimes listening to calming sounds or doing a body scan meditation can help ease into sleep.",
      "It might help to avoid screens an hour before bed and try reading or gentle stretching instead.",
      "Remember that resting quietly with your eyes closed still provides some benefit, even if you're not sleeping."
    ]
  },
  {
    category: "loneliness",
    patterns: [
      "lonely", "alone", "isolated", "no friends", "nobody cares",
      "feel alone", "so lonely", "isolated", "no one understands"
    ],
    responses: [
      "Loneliness is a painful feeling, and you're brave for acknowledging it. Many people feel this way, even when surrounded by others.",
      "You matter, and your feelings matter. Would you like to explore some ways to connect with supportive communities?",
      "It's okay to feel lonely. Remember that this feeling doesn't mean you're alone - I'm here with you right now.",
      "Loneliness can be incredibly difficult. What's one small step you could take today to reach out to someone?"
    ]
  },
  {
    category: "self_care",
    patterns: [
      "self care", "take care of myself", "how to feel better", "what should I do",
      "need help coping", "coping strategies", "feel better", "improve mood"
    ],
    responses: [
      "Great that you're thinking about self-care! Even small actions like drinking water or stepping outside can help.",
      "Self-care looks different for everyone. What usually helps you feel grounded or comforted?",
      "Remember that self-care isn't selfish - it's essential. What's one kind thing you could do for yourself today?",
      "Sometimes the simplest self-care is just acknowledging how you feel without judgment. You're doing that right now."
    ]
  },
  {
    category: "crisis",
    patterns: [
      "suicide", "kill myself", "end it all", "don't want to live",
      "harm myself", "self harm", "hurting myself", "suicidal"
    ],
    responses: [
      "I'm really concerned about what you're sharing. Your life is precious and there are people who want to help.",
      "Please reach out to a crisis helpline right now. In the US, you can call or text 988 to connect with trained counselors.",
      "You don't have to go through this alone. Let me help you connect with professional support immediately.",
      "Your safety is the most important thing. Please call emergency services or a crisis hotline right away. They're there to help 24/7."
    ]
  },
  {
    category: "mindfulness",
    patterns: [
      "mindfulness", "meditation", "stay present", "grounding", "be here now",
      "anxious thoughts", "racing thoughts", "can't stop thinking"
    ],
    responses: [
      "Let's try a quick mindfulness exercise: Notice your feet on the ground. What sensations do you feel?",
      "Mindfulness is about observing without judgment. Try naming your thoughts as 'just thoughts' rather than facts.",
      "When thoughts race, try focusing on your breath. Each inhale and exhale is an anchor to the present moment.",
      "Grounding techniques can help. Try: What are 3 things you can see? 2 things you can hear? 1 thing you can feel?"
    ]
  },
  {
    category: "gratitude",
    patterns: [
      "grateful", "gratitude", "thankful", "appreciate", "blessed",
      "looking for positive", "something good", "silver lining"
    ],
    responses: [
      "Practicing gratitude can really shift perspective. What's one small thing you're thankful for today?",
      "That's wonderful you're thinking about gratitude! Even noticing something simple like a warm drink or comfortable clothes counts.",
      "Gratitude doesn't mean ignoring hard feelings - it means acknowledging the good alongside the difficult.",
      "What's something that made you smile recently, no matter how small?"
    ]
  },
  {
    category: "progress",
    patterns: [
      "getting better", "progress", "improving", "healing", "recovery",
      "doing better", "feeling stronger", "moving forward"
    ],
    responses: [
      "That's amazing to hear! Healing isn't linear, so celebrate every step forward.",
      "I'm so glad you're noticing progress. Remember to acknowledge how far you've come.",
      "Progress, no matter how small, is still progress. What's helping you move forward?",
      "You're doing important work. Be proud of yourself for showing up and trying."
    ]
  },
  {
    category: "support",
    patterns: [
      "therapy", "counseling", "professional help", "therapist", "counselor",
      "need therapy", "should I get help", "mental health professional"
    ],
    responses: [
      "Seeking professional support is a brave and important step. Therapy can provide valuable tools and perspectives.",
      "There are many types of mental health professionals who can help. Would you like information about finding the right fit?",
      "Therapy looks different for everyone. It's about finding what works for you in a safe, supportive space.",
      "Remember that asking for professional help is a sign of strength, not weakness. It means you're taking your wellbeing seriously."
    ]
  },
  {
    category: "farewell",
    patterns: [
      "bye", "goodbye", "see you", "see ya", "take care", "have a good day",
      "cya", "later", "bye bye", "good night", "I'm done", "that's all"
    ],
    responses: [
      "Take care of yourself. Remember I'm here whenever you need to talk.",
      "Goodbye! Be gentle with yourself today.",
      "See you later! You're always welcome back here.",
      "Take care. Remember to do one kind thing for yourself today."
    ]
  }
];

export const defaultResponses = [
  "Thank you for sharing that with me. How does that feel to talk about?",
  "I hear you. Would you like to explore that feeling more together?",
  "That sounds really difficult. I'm here with you in this.",
  "Your feelings are valid. What do you need most right now?",
  "I'm listening. Take your time - there's no rush.",
  "Thank you for trusting me with this. How can I best support you right now?",
  "That sounds challenging. What's been helping you get through this?",
  "I appreciate you sharing that. What would feel supportive to explore next?"
];