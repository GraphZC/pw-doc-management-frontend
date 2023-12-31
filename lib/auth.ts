import type { AuthOptions, Session, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "@/lib/axios.config";
import { JWT } from "next-auth/jwt";
export const authOptions: AuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials, req) {
				try {
                	const res = await axios.post("/auth/login", {
                	    username: credentials?.username,
                	    password: credentials?.password,
               		});
					
					if (res.status === 200) {
                		return res.status === 200 ? res.data : null;
					}
				} catch (error) {
					return null;
				}
            },
        }),
    ],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }: { token: JWT, user?: User }) {
			if (user?.username) {
				return { ...token, ...user }	
			}

			if (token?.accessTokenExpires) {
				if (Date.now() < token.accessTokenExpires) {
					return { ...token, ...user };
				}
			}
			if (token?.refreshToken) {
				try {
					const res = await axios.post("/auth/refresh", {
						refreshToken: token.refreshToken,
					});

					if (res.status === 200) {
						return { ...token, ...res.data };
					}
				} catch (error) {
					return { ...token, ...user };
				}
			}
			return { ...token, ...user };
		},
		async session({ session, token }: { session: Session, token: JWT }): Promise<Session> {
			if (Date.now() / 1000 > token?.accessTokenExpires! && token?.refreshTokenExpires && Date.now() / 1000 > token?.refreshTokenExpires) {
				return Promise.reject({
				  error: new Error("Refresh token has expired. Please log in again to get a new refresh token."),
				});
			  }
			  const accessTokenData = JSON.parse(atob(token?.accessToken!.split(".")[1]));
			  session.user = accessTokenData;
			  token.accessTokenExpires = accessTokenData.exp;
			
			  session.accessToken = token?.accessToken;
			
			  return Promise.resolve(session);
		},
	},
	pages: {
		signIn: "/login",
	}
};