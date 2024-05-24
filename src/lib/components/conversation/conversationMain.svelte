<script lang="ts">
import type { DMConversation } from "$lib/types";
import Conversation from "./conversation.svelte";
import Message from "./message.svelte";
import "$lib/style/customScroll.css";

export let conversations: DMConversation[];
export let curUser: string;

// biome-ignore lint/style/useConst: <bind 변수임>
let selectedConversation: DMConversation | null = null;
</script>

<div class="flex justify-center h-[90vh] max-h-[90vh] overscroll-none gap-4">
    <div class="w-[400px] custom-scroll p-4">
        {#each conversations as c}
            <Conversation
                c={c}
                bind:selectedConversation={selectedConversation}
            />
        {/each}
    </div>
    <div class="w-[500px] custom-scroll p-4 space-y-4">
        {#if (selectedConversation && curUser)}
            {#each selectedConversation.dmConversation.messages as m}
                <Message
                    message={m}
                    curUser={curUser}
                />
            {/each}
        {/if}
    </div>

</div>
