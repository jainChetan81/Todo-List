import type { NextPage } from "next";
import { Layout, Sidebar, Tasks } from "../components";

const Home: NextPage = () => (
	<Layout title="Home">
		<Sidebar />
		<Tasks />
	</Layout>
);

export default Home;
