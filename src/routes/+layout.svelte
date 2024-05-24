<script>
// 최대한 Dom트리를 얕게 유지해야 많은 돔요소를 생성할 때 부하가 적음
import "../app.css";
import NavBar from "$lib/components/navBar/navBar.svelte";
</script>
  
<slot />
<NavBar />

