import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { FaPizzaSlice, FaUser } from "react-icons/fa";
import { useUserValue } from "../context";
import { firebaseAuth } from "../firebase";
import AddTasks from "./Tasks/AddTasks";
type Props = {
	darkMode: boolean;
	setDarkMode: Dispatch<SetStateAction<boolean>>;
};
const Header: FC<Props> = ({ darkMode, setDarkMode }) => {
	const [showQuickAddTask, setShowQuickAddTask] = useState<boolean>(false);
	const [showSidebar, setShowSidebar] = useState<boolean>(true);
	const router = useRouter();
	const { user, setUser } = useUserValue();
	const logoutButton = () => {
		signOut(firebaseAuth)
			.then(() => {
				setUser(undefined);
				router.push("/login");
			})
			.catch((err) => {
				console.log(err.message);
			});
	};
	useEffect(() => {
		if (!user) router.push("/login");
	}, [user, router]);

	return (
		<header className="header" data-testid="header">
			<button className="logo__handle" onClick={() => setShowSidebar(!showSidebar)} aria-label="Show Sidebar">
				{showSidebar ? (
					<svg className="hamburger" fill="#000" viewBox="0 0 100 80" width="40" height="25">
						<rect width="100" height="10"></rect>
						<rect y="30" width="100" height="10"></rect>
						<rect y="60" width="100" height="10"></rect>
					</svg>
				) : (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
						className="cross"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				)}
			</button>
			<nav>
				<div className="logo">
					<Link href="/">
						<a>
							<Image
								src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL}/todo?tr=w-30,h-30`}
								width={30}
								height={30}
								alt="todo list logo"
							/>
						</a>
					</Link>
				</div>
				<div className="settings">
					<ul>
						<li className="settings__add">
							<button
								data-test-id="quick-add-task-action"
								aria-label="Quick Add Task"
								onClick={() => setShowQuickAddTask(!showQuickAddTask)}
								onKeyDown={() => setShowQuickAddTask(!showQuickAddTask)}
							>
								+
							</button>
						</li>
						<li className="settings__dark-mode">
							<button
								aria-label="Change Theme"
								data-test-id="dark-mode-action"
								onClick={() => setDarkMode(!darkMode)}
								onKeyDown={() => setDarkMode(!darkMode)}
							>
								<FaPizzaSlice />
							</button>
						</li>
						<li className="settings__user">
							<button
								aria-label="Logout User"
								data-test-id="logout-button"
								onClick={logoutButton}
								onKeyDown={logoutButton}
							>
								<FaUser />
							</button>
						</li>
					</ul>
				</div>
			</nav>
			<AddTasks
				showAddTaskMain={false}
				showQuickAddTask={showQuickAddTask}
				setShowQuickAddTask={setShowQuickAddTask}
			/>
		</header>
	);
};

export default Header;
