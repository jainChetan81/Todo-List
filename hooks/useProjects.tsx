import { Unsubscribe } from "@firebase/util";
import {
	DocumentData,
	onSnapshot,
	orderBy,
	Query,
	query,
	QueryConstraint,
	QueryDocumentSnapshot,
	QuerySnapshot,
	where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Projects } from "../@types";
import { useUserValue } from "../context";
import { projectCollectionRef } from "../firebase";

const useProjects = () => {
	const [projects, setProjects] = useState<Projects[] | []>([]);
	const { user } = useUserValue();
	useEffect(() => {
		const queryConsUserId: QueryConstraint = where("userId", "==", user?.uid || "");
		const queryByProjects: QueryConstraint = orderBy("projectId", "asc");
		const finalQuery: Query<DocumentData> = query(projectCollectionRef, queryConsUserId, queryByProjects);
		const unsubscribe: Unsubscribe = onSnapshot(finalQuery, (snapshot: QuerySnapshot<DocumentData>) => {
			const docs: Projects[] = [];
			snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
				docs.push({ docId: doc.id, ...doc.data() } as Projects);
			});
			if (JSON.stringify(projects) !== JSON.stringify(docs) && user) {
				setProjects(docs);
			}
		});

		return () => {
			unsubscribe();
		};
	}, [projects, user]);
	return { projects, setProjects };
};

export default useProjects;
