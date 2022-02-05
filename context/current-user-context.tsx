import type { User } from "firebase/auth";
import { Context, createContext, Dispatch, SetStateAction, useContext, useState } from "react";
export type UserContextType = {
	user: User | undefined;
	setUser: Dispatch<SetStateAction<User | undefined>>;
};

export const UserContext: Context<any> = createContext(["", () => {}]);
export const UserProvider = ({ children }: any): JSX.Element => {
	const [user, setUser] = useState<User | undefined>();
	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
export const useUserValue = () => useContext(UserContext) as UserContextType;
