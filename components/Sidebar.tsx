import { FC, useState } from "react";
import { FaChevronDown, FaInbox, FaRegCalendar, FaRegCalendarAlt } from "react-icons/fa";
import { Projects } from ".";
import { useSelectedProjectValue } from "../context";
import AddProjects from "./Projects/AddProjects";

const Sidebar: FC = () => {
	const { setSelectedProject } = useSelectedProjectValue();
	const [active, setActive] = useState<string>("inbox");
	const [showSidebar, setShowSidebar] = useState<boolean>(true);
	const [showProjects, setShowProjects] = useState<boolean>(true);
	return (
		<aside className="sidebar" data-testid="sidebar">
			<button className="sidebar__handle" onClick={() => setShowSidebar(!showSidebar)}>
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
					>
						<span>
							<FaRegCalendarAlt />
						</span>
						<span>Next 7 days</span>
					</button>
				</li>
			</ul>
			<div className="sidebar__middle">
				<button onClick={() => setShowProjects(!showProjects)} onKeyDown={() => setShowProjects(!showProjects)}>
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
