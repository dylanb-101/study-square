import { fail, redirect } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";

/** @type {import('./$types').Actions} */
export const actions = {
    login: async (event) => {

        // console.log(event)

        const { request, urls, locals: { supabase } } = event
            const formData = await request.formData();
            const email = formData.get('email');
            const password = formData.get('password');

        const { data, error: err } = await  supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        
        if(err) {
            if(err instanceof AuthApiError && err.status === 400) {

                return fail(400, {
                    error: "Invalid credentials", email: email, invalid: true, message: err.message
                })
            }
            return fail(500, {
                message: "Server error. Try again later.",
            })
        }
        throw redirect(303, "/")
    },

    logout: async ({locals}) => {

        await locals.supabase.auth.signOut();
        throw redirect(303, "/")
    }
}

/** @type {import('./$types').PageServerLoad} */
export async function load({ data, event,  locals: { getSession } }) {

    console.log(`this is data: ${await data}`)
    const session = await getSession();

    if(session) {
            throw redirect(303, "/");
    }
}