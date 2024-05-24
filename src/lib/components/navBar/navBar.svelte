<script lang="ts">	
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';  
	$: pageName = $page.url.pathname

	const onNavigateToConversation = () => {
		goto("/conversation")
	};

	const onNavigateToExample = () => {
		goto("/example")
	};

	const onNavigateToMain = () => {
		goto("/home")
	};

	const buttonClass = "p-2 rounded-lg"
	const normalBg = `${buttonClass} bg-gray-800`;
	const selectedBg = `${buttonClass} bg-blue-800`;
</script>

<div
	class="
		fixed bottom-0 
		w-full h-12 space-x-4 
		flex items-center justify-center
		text-sm
		bg-[#565656]
	"
>
	<button
		on:click={onNavigateToMain}
		class={`${pageName === "/home" ? selectedBg : normalBg}`}
	>
		홈
	</button>
	<button
	on:click={onNavigateToConversation}
		class={`${pageName === "/conversation" ? selectedBg : normalBg}`}
	>
		대화
	</button>
	<button
		on:click={onNavigateToExample}
		class={`${pageName === "/example" ? selectedBg : normalBg}`}
	>
		예시
	</button>
</div>
