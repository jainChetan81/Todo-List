import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Header, Layout, Sidebar, Tasks } from "../components";
import { useUserValue } from "../context";
import { ProjectsProvider, SelectedProjectProvider } from "../context";
const Home: NextPage = () => {
	const router = useRouter();
	const [darkMode, setDarkMode] = useState<boolean>(true);
	const { user } = useUserValue();
	useEffect(() => {
		if (!user) router.push("/login");
	}, [user, router]);
	return (
		<Layout title="Home | Todo List">
			<SelectedProjectProvider>
				<ProjectsProvider>
					<Header darkMode={darkMode} setDarkMode={setDarkMode} />
					{user && (
						<div className="content">
							<Sidebar />
							<Tasks />
						</div>
					)}
				</ProjectsProvider>
			</SelectedProjectProvider>
		</Layout>
	);
};

export default Home;
