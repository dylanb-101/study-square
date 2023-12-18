<script>
    import { enhance } from '$app/forms';

    /** @type {import('./$types').ActionData} */
    export let form;
</script>

<h2>What email is your password under?</h2>
<form action="?/reset_password" method="POST" use:enhance>

    <label for="email">email</label>
    <input type="email" name="email" placeholder="jimmybob420@gmail.com" required/>
    <button type="submit">Reset Password</button>

</form>

{#if form?.invalid}<mark>{form?.message}!</mark>{/if}