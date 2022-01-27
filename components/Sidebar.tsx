import { FC, useState } from "react";
import { FaChevronDown, FaInbox, FaRegCalendar, FaRegCalendarAlt } from "react-icons/fa";
import { Projects } from ".";
import { useSelectedProjectValue } from "../context";
import AddProjects from "./Projects/AddProjects";

const Sidebar: FC = () => {
	const { setSelectedProject } = useSelectedProjectValue();
	const [active, setActive] = useState<string>("inbox");
	const [showProjects, setShowProjects] = useState<boolean>(true);
	return (
		<aside className="sidebar" data-testid="sidebar">
			<ul className="sidebar__generic">
				<li
					data-testid="inbox"
					className={active === "inbox" ? "active" : undefined}
					onClick={() => {
						setActive("inbox");
						setSelectedProject("INBOX");
					}}
				>
					<span>
						<FaInbox />
					</span>
					<span>Inbox</span>
				</li>
				<li
					data-testid="today"
					className={active === "today" ? "active" : undefined}
					onClick={() => {
						setActive("today");
						setSelectedProject("TODAY");
					}}
				>
					<span>
						<FaRegCalendar />
					</span>
					<span>Today</span>
				</li>
				<li
					data-testid="next_7"
					className={active === "next_7" ? "active" : undefined}
					onClick={() => {
						setActive("next_7");
						setSelectedProject("NEXT_7");
					}}
				>
					<span>
						<FaRegCalendarAlt />
					</span>
					<span>Next 7 days</span>
				</li>
			</ul>
			<div className="sidebar__middle" onClick={() => setShowProjects(!showProjects)}>
				<span>
					<span>
						<FaChevronDown className={!showProjects ? "hidden-projects" : undefined} />
					</span>
					<h2>Projects</h2>
				</span>
			</div>
			<ul className="sidebar__projects">{showProjects && <Projects />}</ul>
			<AddProjects />
		</aside>
	);
};

export default Sidebar;
