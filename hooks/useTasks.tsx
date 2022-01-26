import { useEffect, useState } from "react";
import type { Tasks } from "../@types";
import { taskCollectionRef } from "../firebase";
import { getDocs, query, QueryConstraint, where } from "firebase/firestore";
import type { DocumentData, QuerySnapshot } from "firebase/firestore";
import moment from "moment";
import { collatedTaskExist } from "../helpers";

const useTasks = (selectedProject: string | number) => {
	const [tasks, setTasks] = useState<Tasks[] | []>([]);
	const [archivedTasks, setArchivedTasks] = useState<Tasks[] | []>([]);
	useEffect(() => {
		const fetchTasks = async () => {
			const queryConsUserId: QueryConstraint = where("userId", "==", "UESs1wMq3aMShh6543F9");
			const queryConsProjectId: QueryConstraint = where("projectId", "==", "G3eOFfoP0iZAAzsFdQe5");
			const queryConsDate: QueryConstraint = where("date", "==", moment().format("DD/MM/YYYY"));
			let unsubscribe: QuerySnapshot<DocumentData> = await getDocs(query(taskCollectionRef, queryConsUserId));
			if (selectedProject && !collatedTaskExist(selectedProject)) {
				unsubscribe = await getDocs(query(taskCollectionRef, queryConsUserId, queryConsProjectId));
			}
			if (selectedProject == "TODAY") {
				unsubscribe = await getDocs(query(taskCollectionRef, queryConsUserId, queryConsDate));
			} else if (selectedProject == "INBOX" || selectedProject === 0) {
				unsubscribe = await getDocs(query(taskCollectionRef, queryConsUserId, where("date", "==", "")));
			}
			return unsubscribe;
		};

		const unsubscribe: Promise<QuerySnapshot<DocumentData>> = fetchTasks();
		unsubscribe.then((snapshot) => {
			const newTasks: Tasks[] = [];
			snapshot.forEach((doc) => {
				newTasks.push({ ...doc.data(), id: doc.id } as Tasks);
			});
			setTasks(
				selectedProject === "NEXT_7"
					? newTasks.filter(
							(task) =>
								moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 && task.archived !== true
					  )
					: newTasks.filter((task) => task.archived !== true)
			);
			setArchivedTasks(newTasks.filter((task) => task.archived !== false));
		});
		return () => {
			unsubscribe.then(() => {
				console.log("unsubscribed");
			});
		};
	}, [selectedProject]);
	return { tasks, archivedTasks };
};

export default useTasks;
