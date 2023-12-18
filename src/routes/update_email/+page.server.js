import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').Actions} */
export const actions =  {

    /** @type {import('@sveltejs/kit').Action} */
    update_email: async ({ request, locals }) => {
        const formData = await request.formData();
        const email = formData.get('email');

        const { data, error: err } = await locals.supabase.auth.updateUser({
            email
        })

        if(err) {
            if(err instanceof AuthApiError && err.status >= 400 && err.status < 500) {
                return fail(400, {
                    error: "invalidCredentials", invalid: true, message: err.message
                })
            }
            return fail(500, {
                error: "Server error. Please try again later."
            })
        }

        throw redirect(303, '/check_email');
    },
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals: { getSession } }) {

    const session = await getSession();

    if(!session) {
        throw redirect(303, "/");
    }

}