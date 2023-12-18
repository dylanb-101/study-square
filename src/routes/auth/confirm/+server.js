import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
    const {
        url, 
        locals: { supabase }
    } = event;
    const token_hash = url.searchParams.get('token_hash');
    const type = url.searchParams.get('type');
    const next = url.searchParams.get('next') ?? '/';

    if(token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({ token_hash, type});
        if(!error) {
            throw redirect(303, `/${next.slice(1)}`);
        }
    }

    throw redirect(303, '/auth/auth-code-error');

}