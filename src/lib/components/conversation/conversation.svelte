<script lang="ts">
import type { ConversationInfo } from "$lib/store/conversation";
import type { DMConversation } from "../../types";
import { conversationStore } from "$lib/store/conversation";
import { get } from "svelte/store";
import { isValidKeyupEvent, isValidMouseEvent } from "../../utils";
import Bin from "../icons/bin.svelte";
import Edit from "../icons/edit.svelte";

export let c: DMConversation;
export let selectedConversation: DMConversation | null;

const buttonClass = "w-8 h-8 stroke-white stroke-1.5";

$: id = c.dmConversation.conversationId;
$: isCurConversation =
	c.dmConversation.conversationId ===
	selectedConversation?.dmConversation.conversationId;
$: store = $conversationStore;

$: storedInfo = store[id];
$: deleted = storedInfo?.deleted ?? false;
$: title = storedInfo?.title ?? id;

$: onSelectConversation = (e: KeyboardEvent | MouseEvent) => {
	e.stopPropagation();
	const isValidKeyup = isValidKeyupEvent(e, "Enter");
	const isValidMouse = isValidMouseEvent(e);

	if (isValidKeyup || isValidMouse) {
		selectedConversation = c;
	}
};

$: onRenameConveresation = (e: MouseEvent) => {
	e.stopPropagation();
	const response = window.prompt("대화의 새 이름을 입력해주세요.");
	const stored = get(conversationStore);

	if (response) {
		const result: ConversationInfo = {
			id,
			title: response,
			deleted: false,
		};

		conversationStore.set({
			...stored,
			[id]: result,
		});
	}
};

$: onDeleteConversation = (e: MouseEvent) => {
	e.stopPropagation();
	const response = window.confirm("정말 이 대화를 숨김 처리하시겠어요?");
	const stored = get(conversationStore);

	if (response) {
		const result: ConversationInfo = {
			id,
			title,
			deleted: true,
		};

		conversationStore.set({
			...stored,
			[id]: result,
		});
	}
};
</script>

{#if (!deleted)}
    <div
        class={`
            flex justify-between align-center 
            min-w-84
            w-full p-4
            border-x-4 border-y-2
            cursor-pointer
            ${isCurConversation ? "bg-[#224488]" : ""}
        `}
        role="button"
        tabindex="0"
        on:click={onSelectConversation}
        on:keyup={onSelectConversation}
    >
        <span class="flex flex-col justify-center">
            {title.slice(0, 31)}
        </span>

        <div class="flex space-x-4">
            <button
                type="button"
                tabindex="0"
                class={buttonClass}
                on:click={onRenameConveresation}
            >
                <Edit />
            </button>
            <button
                type="button"
                tabindex="0"
                class={`${buttonClass} fill-red-800`}
                on:click={onDeleteConversation}
            >
                <Bin />
            </button>
            <div class="flex flex-col justify-center w-fit rounded-xl text-sm bg-gray-800 p-2">
                {c.dmConversation.messages.length}
            </div>
        </div>
    </div>
{/if}