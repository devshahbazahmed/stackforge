import { IUser } from "@/database/user.model";
import { fetchHandler } from "@/lib/handlers/fetch";
import { IAccount } from "@/database/account.model";
import ROUTES from "@/constants/routes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export const api = {
  auth: {
    oAuthSignIn: ({ user, provider, providerAccountId }: SignInWithOAuthParams) =>
      fetchHandler(`${API_BASE_URL}/auth/${ROUTES.SIGN_IN_WITH_OAUTH}`, {
        method: "POST",
        body: JSON.stringify({ user, provider, providerAccountId }),
      }),
  },
  users: {
    getAllUsers: () => fetchHandler(`${API_BASE_URL}/users`),
    getUserById: (id: string) => fetchHandler(`${API_BASE_URL}/users/${id}`),
    getUserByEmail: (email: string) =>
      fetchHandler(`${API_BASE_URL}/users/${email}`, {
        method: "POST",
        body: JSON.stringify({ email }),
      }),
    createUser: (userData: Partial<IUser>) =>
      fetchHandler(`${API_BASE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(userData),
      }),
    updateUser: (id: string, userData: Partial<IUser>) =>
      fetchHandler(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
      }),
    deleteUser: (id: string) => fetchHandler(`${API_BASE_URL}/users/${id}`, { method: "DELETE" }),
  },
  accounts: {
    getAllAccounts: () => fetchHandler(`${API_BASE_URL}/accounts`),
    getAccountById: (id: string) => fetchHandler(`${API_BASE_URL}/accounts/${id}`),
    getAccountByProvider: (providerAccountId: string) =>
      fetchHandler(`${API_BASE_URL}/accounts/provider`, {
        method: "POST",
        body: JSON.stringify({ providerAccountId }),
      }),
    createAccount: (accountData: Partial<IAccount>) =>
      fetchHandler(`${API_BASE_URL}/accounts`, {
        method: "POST",
        body: JSON.stringify(accountData),
      }),
    updateAccount: (id: string, accountData: Partial<IAccount>) =>
      fetchHandler(`${API_BASE_URL}/accounts/${id}`, {
        method: "PUT",
        body: JSON.stringify(accountData),
      }),
    deleteAccount: (id: string) => fetchHandler(`${API_BASE_URL}/accounts/${id}`, { method: "DELETE" }),
  },
};
