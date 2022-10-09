import NextAuth from "next-auth";
import Provider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        Provider({
            name: "Credentials",
            id: "login",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize(credentials, req) {
                if (credentials!.username === process.env.NEXT_PUBLIC_USERNAME && credentials!.password === process.env.NEXT_PUBLIC_PASSWORD) {
                    return { username: process.env.NEXT_PUBLIC_USERNAME };
                } else {
                    return null
                }
            }
        })
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.username = user.username;
            }
            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.username = token.username;
            }
            return session;
        },
    },
    secret: process.env.NEXT_PUBLIC_PASSWORD,
})
