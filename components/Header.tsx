import Image from "next/image";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { FaPizzaSlice } from "react-icons/fa";
import AddTasks from "./Tasks/AddTasks";
type Props = {
	darkMode: boolean;
	setDarkMode: Dispatch<SetStateAction<boolean>>;
};
const Header: FC<Props> = ({ darkMode, setDarkMode }) => {
	const [showQuickAddTask, setShowQuickAddTask] = useState<boolean>(false);
	const [showSidebar, setShowSidebar] = useState<boolean>(true);
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
					<Image
						src={`${process.env.NEXT_PUBLIC_IMAGEKIT_URL}/todo?tr=w-30,h-30`}
						width={30}
						height={30}
						alt="todo list logo"
					/>
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
