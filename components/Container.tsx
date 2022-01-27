import type { FC } from "react";
import { Sidebar, Tasks } from ".";

const Container: FC = () => {
	return (
		<div className="content">
			<Sidebar />
			<Tasks />
		</div>
	);
};

export default Container;
