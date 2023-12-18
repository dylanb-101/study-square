<script>
	import "../app.css";
	import Nav from "$lib/components/nav.svelte";
    /** @type {import('./$types').PageData} */
    export let data;


</script>

<Nav data={data}/>

<slot/>

<style>

:root::-webkit-scrollbar {
    width: 0.25rem
}

:root::-webkit-scrollbar-track {
    background: #1e1e24;
}

:root::-webkit-scrollbar-thumb {
    color: #93CAED
}

</style>