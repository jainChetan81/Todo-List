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
				<li className={active === "inbox" ? "active" : undefined}>
					<button
						data-testid="inbox"
						onClick={() => {
							setActive("inbox");
							setSelectedProject("INBOX");
						}}
						onKeyDown={() => {
							setActive("inbox");
							setSelectedProject("INBOX");
						}}
						aria-label="Show Inbox Tasks"
					>
						<span>
							<FaInbox />
						</span>
						<span>Inbox</span>
					</button>
				</li>
				<li className={active === "today" ? "active" : undefined}>
					<button
						data-testid="today"
						onClick={() => {
							setActive("today");
							setSelectedProject("TODAY");
						}}
						onKeyDown={() => {
							setActive("today");
							setSelectedProject("TODAY");
						}}
						aria-label="Show Today Tasks"
					>
						<span>
							<FaRegCalendar />
						</span>
						<span>Today</span>
					</button>
				</li>
				<li className={active === "next_7" ? "active" : undefined}>
					<button
						data-testid="next_7"
						onClick={() => {
							setActive("next_7");
							setSelectedProject("NEXT_7");
						}}
						onKeyDown={() => {
							setActive("next_7");
							setSelectedProject("NEXT_7");
						}}
						aria-label="Show Next 7 Days Tasks"
					>
						<span>
							<FaRegCalendarAlt />
						</span>
						<span>Next 7 days</span>
					</button>
				</li>
			</ul>
			<div className="sidebar__middle">
				<button
					onClick={() => setShowProjects(!showProjects)}
					onKeyDown={() => setShowProjects(!showProjects)}
					aria-label="Show Custom Projects"
				>
					<span>
						<FaChevronDown className={!showProjects ? "hidden-projects" : undefined} />
					</span>
					<h2>Projects</h2>
				</button>
			</div>
			<ul className="sidebar__projects">{showProjects && <Projects />}</ul>
			<AddProjects />
		</aside>
	);
};

export default Sidebar;
