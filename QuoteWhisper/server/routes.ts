import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

const lifeAndLoveQuotes = [
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "life"
  },
  {
    text: "Love is composed of a single soul inhabiting two bodies.",
    author: "Aristotle",
    category: "love"
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "life"
  },
  {
    text: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.",
    author: "Helen Keller",
    category: "love"
  },
  {
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: "life"
  },
  {
    text: "You will face many defeats in life, but never let yourself be defeated.",
    author: "Maya Angelou",
    category: "life"
  },
  {
    text: "The greatest thing you'll ever learn is just to love and be loved in return.",
    author: "Eden Ahbez",
    category: "love"
  },
  {
    text: "In three words I can sum up everything I've learned about life: it goes on.",
    author: "Robert Frost",
    category: "life"
  },
  {
    text: "Love does not consist of gazing at each other, but in looking outward together in the same direction.",
    author: "Antoine de Saint-Exupéry",
    category: "love"
  },
  {
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    category: "life"
  },
  {
    text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
    author: "Lao Tzu",
    category: "love"
  },
  {
    text: "Life is either a daring adventure or nothing at all.",
    author: "Helen Keller",
    category: "life"
  },
  {
    text: "Where there is love there is life.",
    author: "Mahatma Gandhi",
    category: "love"
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "life"
  },
  {
    text: "If I know what love is, it is because of you.",
    author: "Hermann Hesse",
    category: "love"
  },
  {
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
    category: "life"
  },
  {
    text: "To love and be loved is to feel the sun from both sides.",
    author: "David Viscott",
    category: "love"
  },
  {
    text: "Life is really simple, but we insist on making it complicated.",
    author: "Confucius",
    category: "life"
  },
  {
    text: "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
    author: "Unknown",
    category: "love"
  },
  {
    text: "The whole secret of a successful life is to find out what is one's destiny to do, and then do it.",
    author: "Henry Ford",
    category: "life"
  },
  {
    text: "Happiness is not something ready-made. It comes from your own actions.",
    author: "Dalai Lama",
    category: "life"
  },
  {
    text: "Love is an untamed force. When we try to control it, it destroys us. When we try to imprison it, it enslaves us. When we try to understand it, it leaves us feeling lost and confused.",
    author: "Paulo Coelho",
    category: "love"
  },
  {
    text: "You only live once, but if you do it right, once is enough.",
    author: "Mae West",
    category: "life"
  },
  {
    text: "Love is like the wind, you can't see it but you can feel it.",
    author: "Nicholas Sparks",
    category: "love"
  },
  {
    text: "The unexamined life is not worth living.",
    author: "Socrates",
    category: "life"
  },
  {
    text: "We love the things we love for what they are.",
    author: "Robert Frost",
    category: "love"
  },
  {
    text: "Life is 10% what happens to us and 90% how we react to it.",
    author: "Charles R. Swindoll",
    category: "life"
  },
  {
    text: "Love all, trust a few, do wrong to none.",
    author: "William Shakespeare",
    category: "love"
  },
  {
    text: "Life isn't about finding yourself. Life is about creating yourself.",
    author: "George Bernard Shaw",
    category: "life"
  },
  {
    text: "Love isn't something you find. Love is something that finds you.",
    author: "Loretta Young",
    category: "love"
  }
];

export async function registerRoutes(app: Express): Promise<Server> {
  // Seed the in-memory database with quotes if empty
  const seedQuotes = async () => {
    try {
      const existingQuotes = await storage.getAllQuotes();
      if (existingQuotes.length === 0) {
        for (const quote of lifeAndLoveQuotes) {
          await storage.createQuote(quote);
        }
      }
    } catch (error) {
      console.error("Error seeding quotes:", error);
    }
  };

  // Seed quotes when the server starts
  await seedQuotes();

  // API endpoint to get a random quote
  app.get("/api/quotes/random", async (req, res) => {
    try {
      const quotes = await storage.getAllQuotes();
      if (quotes.length === 0) {
        return res.status(404).json({ message: "No quotes found" });
      }

      const randomIndex = Math.floor(Math.random() * quotes.length);
      const randomQuote = quotes[randomIndex];
      
      return res.status(200).json(randomQuote);
    } catch (error) {
      console.error("Error fetching random quote:", error);
      return res.status(500).json({ message: "Failed to fetch a random quote" });
    }
  });

  // API endpoint to get all quotes (for testing purposes)
  app.get("/api/quotes", async (_req, res) => {
    try {
      const quotes = await storage.getAllQuotes();
      return res.status(200).json(quotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      return res.status(500).json({ message: "Failed to fetch quotes" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
