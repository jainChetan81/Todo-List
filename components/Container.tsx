import type { FC } from "react";
import { Sidebar, Tasks } from ".";

const Container: FC = () => {
	return (
		<div>
			<Sidebar />
			<Tasks />
		</div>
	);
};

export default Container;
