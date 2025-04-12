import {FunctionComponent, useEffect, useState} from "react";
import {getUserById} from "../services/usersServices";
import {useUser} from "../context/useUSer";
import RoleType from "../interfaces/UserType";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	const {auth} = useUser();
	const [user, setUser] = useState<{
		_id: string;
		name: {
			first: string;
			last: string;
		};
		phone: {
			phone_1: string;
			phone_2: string;
		};
		address: {
			city: string;
			street: string;
			houseNumber?: string;
		};
		email: string;
		image: {
			url: string;
			alt: string;
		};
		role: string;
		status: string;
	}>({
		_id: "",
		name: {
			first: "",
			last: "",
		},
		phone: {
			phone_1: "",
			phone_2: "",
		},
		address: {
			city: "",
			street: "",
			houseNumber: "",
		},
		email: "",
		image: {
			url: "",
			alt: "",
		},
		role: "",
		status: "",
	});

	useEffect(() => {
		const get = async () => {
			await getUserById(auth._id).then((user) => setUser(user));
		};
		get();
	}, [auth]);

	return (
		<main className='min-vh-100 bg-dark'>
			<div className='container-fluid h-100 position-relative profile'>
				<div className='d-flex align-items-center' style={{height: "350px"}}>
					<Link to={""}>
						<img
							className=' border border-light rounded-4'
							src={user.image?.url || "/Logo.png"}
							alt={`${user.image?.alt}'s avatar`}
							style={{
								width: 200,
								height: 200,
								position: "absolute",
								left: 50,
								bottom: 5,
							}}
						/>
					</Link>
					<hr />
				</div>
			</div>
			<div className='table-responsive m-auto text-center my-5 rounded p-3 bg-gradient'>
				<div className=' fw-bold display-6 text-light p-2'>פרים אישיים</div>
				<table className='table table-striped-columns'>
					<tbody>
						<tr>
							<th>שם מלא</th>
							<td>
								{user.name?.first} {user.name?.last}
							</td>
						</tr>
						<tr>
							<th>טלפון ראשי</th>
							<td>{user.phone?.phone_1}</td>
						</tr>
						<tr>
							<th>טלפון נוסף</th>
							<td>{user.phone?.phone_2 || "אין"}</td>
						</tr>
						<tr>
							<th>דו"אל</th>
							<td>{user.email}</td>
						</tr>
						<tr>
							<th>סוג חשבון</th>
							<td className='text-success fw-bold'>
								{user.role === RoleType.Admin ? "מנהל ומנחה" : user.role}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className='row m-auto text-center mt-5'>
				<div className='table-responsive m-auto text-center my-5 rounded p-3 bg-gradient'>
					<div className=' fw-bold display-6 text-light p-2'>הזמנות קודמות</div>
					<table className='table table-striped-columns'>
						<tbody>
							<tr className=' bg-danger-subtle'>
								<th>מ"ס הזמנות</th>
								<td>
									<span className='fw-bold'>10</span>
									<Button className='ms-5 border border-info'>
										פרטים נוספים
									</Button>
								</td>
							</tr>
							<tr>
								<th>ס"כ קניות באתר</th>
								<td>
									{(2500).toLocaleString("he-IL", {
										style: "currency",
										currency: "ILs",
									})}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div className='row m-auto text-center'>
				<div className='col-6 bg-dark'>1</div>
				<div className='col-6 bg-light'>2</div>
			</div>
			<div className='row m-auto text-center'>
				<div className='col bg-success'>1</div>
				<div className='col bg-primary'>2</div>
				<div className='col bg-warning'>1</div>
				<div className='col bg-opacity-75 bg-warning-subtle'>2</div>
			</div>
		</main>
	);
};

export default Profile;
