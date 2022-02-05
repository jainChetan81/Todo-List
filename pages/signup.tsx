import { createUserWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Layout } from "../components";
import { useUserValue } from "../context";
import { firebaseAuth } from "../firebase";
type SignUp = {
	email: string;
	password: string;
	remember: boolean;
};
const Signup = () => {
	const router = useRouter();
	const [values, setValues] = useState<SignUp>({
		email: "",
		password: "",
		remember: false,
	});
	const [error, setError] = useState("");
	const { user, setUser } = useUserValue();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createUserWithEmailAndPassword(firebaseAuth, values.email, values.password)
			.then((cred) => {
				setUser(cred.user);
				setValues({
					email: "",
					password: "",
					remember: false,
				});
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	useEffect(() => {
		if (user) router.push("/");
	}, [user, router]);
	return (
		<Layout title="Sign Up | TodoList">
			<form className="auth" onSubmit={handleSubmit}>
				<div className="imgcontainer">
					<Image
						src="https://doodleipsum.com/250x250/avatar-5?bg=63C8D9&i=08f9c49b3e47bc26b662d3fa03cfdb1b"
						height={250}
						width={250}
						alt="Avatar"
						className="avatar"
					/>
				</div>
				<div className="container">
					<label htmlFor="email">
						<b>Email</b>
					</label>
					<input
						type="email"
						placeholder="Enter Email"
						value={values.email}
						name="email"
						required
						onChange={handleChange}
					/>
					<label htmlFor="psw">
						<b>Password</b>
					</label>
					<input
						type="password"
						placeholder="Enter Password"
						value={values.password}
						name="password"
						required
						onChange={handleChange}
					/>
					<button type="submit">Sign Up</button>
					<label>
						<input type="checkbox" checked={values.remember} name="remember" onChange={handleChange} />{" "}
						Remember me
					</label>
					{error && <p className="error">{error}</p>}
					<div className="container" style={{ backgroundColor: "#f1f1f1" }}>
						<button type="button" className="cancelbtn">
							Cancel
						</button>
						<span className="psw">
							Switch to{" "}
							<Link href="/login">
								<a>Log In?</a>
							</Link>
						</span>
					</div>
				</div>
			</form>
		</Layout>
	);
};

export default Signup;
