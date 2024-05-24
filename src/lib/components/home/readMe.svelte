<script>
import SvelteMarkdown from "svelte-markdown";
import markdown from "./readMeBody.md?raw";
import "./readMe.scss";
</script>

<div class="readme-body text-left space-y-4">
	<SvelteMarkdown source={markdown} />
</div>
