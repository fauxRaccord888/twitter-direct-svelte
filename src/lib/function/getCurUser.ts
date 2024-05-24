import type { DMConversation } from "../types";

export async function getCurUser(
	conversations: Promise<DMConversation[] | null>,
) {
	if (!conversations) return null;

	const visited = new Set<string>();

	return conversations.then((res) => {
		if (!res) return null;
		for (const conversation of res) {
			const users = conversation.dmConversation.conversationId.split("-");
			for (const u of users) {
				if (visited.has(u)) return u;
				visited.add(u);
			}
		}

		return Array.from(visited.keys())[0];
	});
}
