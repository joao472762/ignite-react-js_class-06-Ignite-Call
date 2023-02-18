import 'next-auth';

declare module 'next-auth' {
    interface User {
        id: string,
        name: string,
        avatar_url: string,
        email: string,
        userName: string,

    }
    
    interface Session {
        user: User
    }
}