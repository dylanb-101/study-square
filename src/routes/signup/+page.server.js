import { fail, redirect } from "@sveltejs/kit";
import { AuthApiError } from "@supabase/supabase-js";


export const actions = {

    register: async (event) => {
        const { request, locals } = event
            const formData = await request.formData();
            const email = formData.get('email');
            const password = formData.get('password');
            const password_check = formData.get('confirm-password');
            
            console.log(`email: ${email}, password: ${password}, password_check: ${password_check}`)


            if(password !== password_check) {
                return fail(400, {
                    error: "invalidCredentials", email: email, invalid: true, message: "Passwords must match"
                })
            }


            const { data, error: err} = await locals.supabase.auth.signUp({
                email: email,
                password: password
            })

            if(err) {

                console.log(err.status)
                if(err instanceof AuthApiError && err.status >= 400 && err.status < 500) {
                    console.log(err.message)
                    return fail(400, {
                        error: "invalidCredentials", email: email, invalid: true, message: err.message
                    })
                }
                return fail(500, {
                    error: "Server error. Please try again later."
                })
            }

            if(!err && !!data.user && !data.user.identities.length) {
                return fail(409, {
                    error: "User already exists", email: email, invalid: true, message: "User already exists. Please login."
                })
            }
            throw redirect(303, "/check_email");
    },

    googleAuth: async (event) => {

        console.log('attemping log in with google....')

        const { request, locals } = event;


        const { data, error: err } = await locals.supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
              queryParams: {
                access_type: 'offline',
                prompt: 'consent',
                redirectTo: `http://localhost:5173/auth/callback`
              },
            },
          })
          
          

        if(err) {
            
            console.log(err.status);
            if(err instanceof AuthApiError && err.status >= 400 && err.status < 500) {
                console.log(err.message);
                return fail(400, {
                    error: "invalidCredentials", invalid: true, message: err.message
                })
            }
            return fail(500, {
                error: "Server error. Try again later", invalid: true, message: err.message
            })
        }


    }



}

/** @type {import('./$types').PageServerLoad} */
export async function load({locals: { getSession } }) {
    const session = await getSession();

    if(session) {
        throw redirect(303, "/");
    }
}
