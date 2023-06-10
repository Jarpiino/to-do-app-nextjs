import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/user";
import bcrypt from "bcryptjs";
import dbConnect from "@utils/dbConnect";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        //Check if the user exists.
        await dbConnect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
});

export { handler as GET, handler as POST };
// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//     // ...add more providers here
//   ],
// };

// export default NextAuth(authOptions);
