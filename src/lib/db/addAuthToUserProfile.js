export default async function addAuthToUserProfile(session, supabase) {

    if(session) {

        let { data, error } = await supabase
            .from('profile')
            .select('*')
            .eq('auth_id', session.user.id)
            .single()
        session.user.profile = data;

    }

}