/** Shared shapes for the free tools' questions and free → paid steps. */

export interface ToolOption {
  value: string;
  label: string;
}

export interface ToolQuestion {
  id: string;
  /** The question as asked in the tool. */
  prompt: string;
  /** Short label printed on the sheet and in the WhatsApp message. */
  label: string;
  options: ToolOption[];
  /** Allow several answers. An option with value "none" clears the others. */
  multiple?: boolean;
  hint?: string;
}

export interface ToolTier {
  id: string;
  name: string;
  free: boolean;
  /** Confirmed prices only. `null` → "Price shared on WhatsApp". */
  priceINR: number | null;
  priceEUR: number | null;
  description: string;
  points: string[];
}

export type ToolAnswers = Partial<Record<string, string[]>>;
