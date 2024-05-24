<script lang="ts">
export let file: File | null;

const onUpload = (
	e: Event & { currentTarget: EventTarget & HTMLInputElement },
) => {
	const curFile = e.currentTarget.files?.[0];
	if (curFile) {
		file = curFile;
	}
};
</script>

<input 
    type="file"
    on:change={onUpload}
/>
