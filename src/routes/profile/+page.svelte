<script>
	import { enhance } from '$app/forms';


/** @type {import('./$types').PageData} */
    export let data;

</script>

<h2>User Profile</h2>
{data.session.user.email}
<p><a href="/update_email">Change Email</a></p>
<p><a href="/update_password">Change Password</a></p>
<p><a href="/delete_user">Delete Account</a></p>

<form action="/auth/logout?/logout" method="POST" use:enhance>

    <button type="submit">Logout</button>

</form>

<p>profile page</p>