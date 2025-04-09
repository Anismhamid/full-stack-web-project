import {Avatar, Button} from "@mui/material";
import {FunctionComponent, useEffect, useState} from "react";
import {getUserById} from "../services/usersServices";
import {fontAwesomeIcon} from "../FontAwesome/Icons";
import {useUser} from "../context/useUSer";

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
		getUserById(auth._id).then((user) => setUser(user));
	}, [auth]);

	return (
		<main className=' min-vh-100'>
			<div className='container h-100'>
				<div className=' d-flex align-items-center justify-content-center'>
					<Avatar
						src={user.image.url || "/Logo.png"}
						alt={`${user.image.alt}'s avatar`}
						sx={{
							width: 200,
							height: 200,
							marginTop: 10,
							marginBottom: 10,
							position: "relative",
							left: 0,
						}}
					/>
					<hr />
				</div>
			</div>
			<div className='container m-auto text-center'>
				<table className='table table-striped table-dark table-bordered'>
					<thead>
						<tr>
							<th>שם מלא</th>
							<th>דו"אל</th>
							<th>טלפון</th>
							<th>מחיקת חשבון</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{user.name.first}</td>
							<td>{user.email}</td>
							<td>{user.phone.phone_1}</td>
							<td><Button color="error">{fontAwesomeIcon.trash}</Button></td>
						</tr>
					</tbody>
				</table>
			</div>
			<hr />
			<div className='row m-auto text-center'>
				<div className='col-4 bg-info'>1</div>
				<div className='col-4 bg-danger'>2</div>
				<div className='col-4 bg-success'>3</div>
			</div>
		</main>
	);
};

export default Profile;
