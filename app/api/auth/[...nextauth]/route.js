import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions = {
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials) {
                try {

                    const { email, password } = credentials;
                    const response = await fetch("https://buildwise-three.vercel.app/api/login", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify({ email, password })
                    })
                    const finalResult = await response.json();
                    if (finalResult?.user) {
                        const user = {
                            name: finalResult.user.name,
                            email: finalResult.user.email,
                            gender: finalResult.user.gender
                        }
                        return user;
                    }
                    return null;

                } catch (err) {
                    console.log(err);
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            return token;
        },
        async signIn({ profile, account }) {
            try {
                
                const { name, picture, email, email_verified } = profile;
                if (account.provider === "google" || account.provider === "facebook") {

                    const response = await fetch('https://buildwise-three.vercel.app/api/signup',{
                        method : "POST",
                        headers : {
                            "Content-type" : "application/json"
                        },
                        body : JSON.stringify(profile)

                    });
                    return true;
                }
                return false;
            } catch (err) {
                console.log("Error at signIn next auth = ", err);
            }

        },
        async session({ session }) {
            return session;

        }
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login",
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }