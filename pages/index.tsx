import type { NextPage } from "next";
import { Layout, Sidebar, Tasks } from "../components";

const Home: NextPage = () => (
	<Layout title="Home | Todo List">
		<Sidebar />
		<Tasks />
	</Layout>
);

export default Home;
