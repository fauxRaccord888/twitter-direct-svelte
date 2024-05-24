import type { Conversation_Store } from "$lib/types";
import { persisted } from "svelte-persisted-store";

export const conversationStore = persisted<Record<string, Conversation_Store>>(
	"conversation",
	{},
);
export const resetStore = () => conversationStore.set({});
