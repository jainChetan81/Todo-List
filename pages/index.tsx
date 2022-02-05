import type { NextPage } from "next";
import { Layout, Sidebar, Tasks } from "../components";

const Home: NextPage = () => (
	<Layout title="Home | Todo List">
		<div className="content">
			<Sidebar />
			<Tasks />
		</div>
	</Layout>
);

export default Home;
