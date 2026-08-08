import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "DummyJSON",

      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        console.log("AUTHORIZE CALLED");

        if (!credentials?.username || !credentials?.password) {
          console.log("Credentials missing");
          return null;
        }

        try {
          const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          console.log("DummyJSON status:", response.status);
          console.log("DummyJSON data:", data);

          if (!response.ok) {
            return null;
          }

          return {
            id: String(data.id),
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            accessToken: data.accessToken,
          };
        } catch (error) {
          console.error("DummyJSON error:", error);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };