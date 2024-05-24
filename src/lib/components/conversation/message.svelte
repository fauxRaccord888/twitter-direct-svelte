<script lang="ts">
import type { Message } from "../../types";
import { decode } from "html-entities";

export let message: Message;
export let curUser: string;

const commonClassName =
	"max-w-[320px] text-left whitespace-pre-wrap rounded-xl p-4";
const rMessageClass = `${commonClassName} bg-[#333] justify-self-start`;
const sMessageClass = `${commonClassName} bg-[#224488] justify-self-end`;

$: isSentByCurUser = message.messageCreate.senderId === curUser;
</script>

<div class="grid">
    <div 
        class={isSentByCurUser ? sMessageClass : rMessageClass} 
        title={message.messageCreate.createdAt}
    >
        {decode(message.messageCreate.text)}
    </div>
</div>
