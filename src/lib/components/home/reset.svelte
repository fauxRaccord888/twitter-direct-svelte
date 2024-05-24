<script lang="ts">
import { resetStore } from "$lib/store/conversation";
import { isValidKeyupEvent, isValidMouseEvent } from "$lib/utils";

const onReset = (e: MouseEvent | KeyboardEvent) => {
	const isValidKey = isValidKeyupEvent(e, "Enter");
	const isValidMouse = isValidMouseEvent(e);

	if (isValidKey || isValidMouse) {
		const response = window.confirm(
			"진행할 경우 설정한 모든 대화 이름과 숨김처리가 초기화됩니다. 계속하시겠습니까?",
		);
		resetStore();
	}
};
</script>


<div
	role="button"
	tabindex="0"
	on:click={onReset}
	on:keyup={onReset}
	class="p-4 w-1/2 cursor-pointer bg-red-800 rounded-2xl"
>
	대화방 이름 및 숨김 처리 초기화
</div>
