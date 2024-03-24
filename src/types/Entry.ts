import Emoji from "./Emoji";

interface Entry {
  id: number;
  body: string;
  emoji: Emoji | null;
  createdAt: Date;
  userId: number;
}

export default Entry;
