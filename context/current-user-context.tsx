import { onAuthStateChanged, User } from "firebase/auth";
import { Context, createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { firebaseAuth } from "../firebase";
export type UserContextType = {
	user: User | null;
	setUser: Dispatch<SetStateAction<User | null>>;
};
export const UserContext: Context<any> = createContext(["", () => {}]);
export const UserProvider = ({ children }: any): JSX.Element => {
	const [user, setUser] = useState<User | null>();
	onAuthStateChanged(firebaseAuth, (cred) => {
		if (cred) {
			setUser(cred);
		} else {
			setUser(null);
		}
	});

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
export const useUserValue = () => useContext(UserContext) as UserContextType;
