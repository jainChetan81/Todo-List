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
	return (
		<header className="header" data-testid="header">
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
								onClick={() => setShowQuickAddTask(!showQuickAddTask)}
								onKeyDown={() => setShowQuickAddTask(!showQuickAddTask)}
							>
								+
							</button>
						</li>
						<li className="settings__dark-mode">
							<button
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
