import {Avatar} from "@mui/material";
import {FunctionComponent} from "react";
import {useUser} from "../context/useUSer";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
	const {auth} = useUser();
	return (
		<main className=' min-vh-100'>
			<div className='container h-100'>
				<div className=' d-flex align-items-center justify-content-center'>
					<Avatar
						src={auth?.image.url}
						alt={`${auth?.image.alt}'s avatar`}
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
							<th>שם משתמש</th>
							<th>שם משפחה</th>
							<th>דו"אל</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>1</td>
							<td>2</td>
							<td>3</td>
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
			{/* <div className='text-center'>
					<Avatar
						src={auth?.image.url}
						alt={`${auth?.image.alt}'s avatar`}
						sx={{width: 100, height: 100, marginBottom: 2,textAlign: "center"}}
					/>
					<Typography variant='h5'>
						{auth?.name.first} {auth?.name.last}
					</Typography>
					<Typography variant='body1' color='textSecondary'>
						<strong>Age:</strong> {"age"}
					</Typography>
					<Typography variant='body1' color='textSecondary'>
						<strong>Location:</strong> {"location"}
					</Typography>
					<Typography variant='body1' color='textSecondary'>
						<strong>Bio:</strong> {"bio"}
					</Typography>
				</div> */}
		</main>
	);
};

export default Profile;
