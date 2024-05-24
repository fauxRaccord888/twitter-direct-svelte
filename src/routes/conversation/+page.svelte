<script lang="ts">
import ConversationMain from "$lib/components/conversation/conversationMain.svelte";
import Upload from "$lib/components/upload/upload.svelte";
import type { DMConversation } from "$lib/types";

import { getCurUser, sortDirectMessage } from "$lib/function";
import { assertIsValidDm } from "$lib/validator";
import MainLayout from "$lib/layout/mainLayout.svelte";

// biome-ignore lint/style/useConst: <bind 변수>
let file: File | null = null;

let sortedConversation: Promise<DMConversation[] | null>;
let curUser: Promise<string | null>;

async function getConversation(file: File | null) {
	// TODO Reject로 변경
	try {
		const response = await file?.text();
		if (!response) throw new Error();
		const stringified = response.slice(35);
		const parsed = JSON.parse(stringified);
		assertIsValidDm(parsed);
		const sorted = sortDirectMessage(parsed);
		return sorted;
	} catch {
		return null;
	}
}

$: sortedConversation = getConversation(file);
$: curUser = getCurUser(sortedConversation);
$: loaded = Promise.all([sortedConversation, curUser]);
</script>

{#if !file}
    <MainLayout>
        <Upload 
            bind:file={file}
        />
    </MainLayout>
{/if}

{#await loaded}
    <MainLayout>
        <div>업로드 중입니다...</div>
    </MainLayout>
{:then [conversations, user]}
    {#if conversations && user}
        <ConversationMain
            conversations={conversations}
            curUser={user}
        />
    {/if}
{:catch}
    <MainLayout>
        <div>올바른 형식의 파일을 입력해주세요</div>
    </MainLayout>
{/await}
