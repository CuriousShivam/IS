import NextAuth from 'next-auth';
import {authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import {z} from "zod";
import type {Admin} from '@/lib/definitions';
import prisma from './lib/prisma';
import bcrypt from 'bcryptjs';

const getUser = async(email:string): Promise<Admin | undefined> => {
    try {
        const admin = await prisma.admin.findUnique({where: {email}});
        // console.log('admin', admin);
        return admin;
    }catch(err) {
        console.error("Failed to fetch Admin : ", err);
        throw new Error("Failed to fetch ");
    }
}

export const { auth, signIn, signOut} = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials){
            const parsedCredentials = z
                .object({email:z.email(), password: z.string().min(6)})
                .safeParse(credentials);

            if(parsedCredentials.success){
                const {email, password } = parsedCredentials.data;
                const user = await getUser(email);
                if(!user) return null;
                const passwordsMatch = await bcrypt.compare(password, user.password);
                console.log("Invalid Credentials for user: ", email, passwordsMatch);
                if(passwordsMatch){
                    return user;
                }
                return null;
            }
        }
    })]
})