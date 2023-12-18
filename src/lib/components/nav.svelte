<script>

    export let data;

</script>

<div>

    <nav class="h-12 bg-gray-400 flex items-center space-x-4 p-4">

        <a href="/" class="font-bold">Wowsers a Temp Header!</a>
        <a href="/">Home</a>

        <span>

            {#if !data.session} 

                <a href="/login">Log In</a>

            {:else}

                <a href="/profile">Profile</a>
            

            {/if}

        </span>
        <a href="/signup">Sign Up</a>
    
    </nav>

</div>

