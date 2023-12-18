/** @type {import('./$types').LayoutServerLoad} */
export const load = async (event) => {

    let session = await event.locals.getSession();

    if(session === null) {

        event.cookies.delete(event.locals.supabase.storageKey);

    }

    return {
        session: session
    };

}