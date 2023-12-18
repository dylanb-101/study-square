<script>
    import { enhance } from "$app/forms";
    
    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<h2>Change your password</h2>
{#if form?.invalid}<mark>{form?.message}!</mark>{/if}
<form action="?/update_password" method="POST" use:enhance> 
    <label for="new_password"> New Password</label>
    <input name="new_password" required/>

    <label for="password_confirm">Confirm new Password</label>
    <input name="password_confirm" required/>
    <button>Update Password</button>
</form>