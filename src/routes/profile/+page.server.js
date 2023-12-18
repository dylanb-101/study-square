import { redirect } from "@sveltejs/kit";



export async function load({ locals: { getSession } }) {

    const session = await getSession();

    if(!session) {
        throw redirect(303, '/');
    }

}