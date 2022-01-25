import { useSession } from "../src/helpers/hooks";
import Link from "next/link";
import CoreLayout from "../src/components/CoreLayout";
import Spinner from "@mui/material/CircularProgress";

const Home = () => {
	const session = useSession();

	// Render spinner while session is loading
	if (session.loading) return <Spinner />;

	return (
		<CoreLayout isLoggedIn={!!session.data}>
			<h1>Clothing Tracker</h1>
			{!session.data ? (
				<>
					<div>
						<Link href="/login">Log In</Link>
						<br />
						<Link href="/signup">Signup</Link>
					</div>
				</>
			) : (
				<div>
					<p>
						Go to <Link href="/add">Add</Link> page.
					</p>
					<p>
						Go to <Link href="/view">View</Link> page.
					</p>
				</div>
			)}
		</CoreLayout>
	);
};

export default Home;
