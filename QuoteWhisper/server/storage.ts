import { type Quote, type InsertQuote } from "@shared/schema";

export interface IStorage {
  // Quote related methods
  getAllQuotes(): Promise<Quote[]>;
  getQuote(id: number): Promise<Quote | undefined>;
  createQuote(quote: InsertQuote): Promise<Quote>;
}

export class MemStorage implements IStorage {
  private quotes: Map<number, Quote>;
  private currentQuoteId: number;

  constructor() {
    this.quotes = new Map();
    this.currentQuoteId = 1;
  }

  // Quote methods implementation
  async getAllQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }

  async getQuote(id: number): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = this.currentQuoteId++;
    const quote: Quote = { ...insertQuote, id };
    this.quotes.set(id, quote);
    return quote;
  }
}

export const storage = new MemStorage();
