import {FunctionComponent, useEffect, useState} from "react";
import {UserRegister} from "../interfaces/User";
import {getAllUsers, patchUserRole} from "../services/usersServices";

interface UersManagementProps {}

const UersManagement: FunctionComponent<UersManagementProps> = () => {
	const [users, setUsers] = useState<UserRegister[]>([]);
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		getAllUsers()
			.then((res) => {
				setUsers(res);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const filteredUsers = (users || []).filter(
		(user) =>
			user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	// Update user status
	const toggleStatus = (_id: string) => {
		setUsers(
			users.map((user) =>
				user._id === _id
					? {...user, status: user.status === "Active" ? "Inactive" : "Active"}
					: user,
			),
		);
	};

	// Change role
	const changeRole = (_id: string, newRole: string) => {
		setUsers(
			users.map((user) => (user._id === _id ? {...user, role: newRole} : user)),
		);
		console.log(`Id:${_id}, role:${newRole}`);
		patchUserRole(_id, newRole);
	};

	return (
		<main className='gradient min-vh-100 bg-light py-5'>
			<div className='container'>
				<h1 className='text-center bg-primary text-white rounded p-3 mb-4'>
					ניהול משתמשים
				</h1>

				{/* Search Form */}
				<div className='d-flex justify-content-center mb-4'>
					<div className='col-md-6'>
						<div className='input-group'>
							<input
								autoComplete='on'
								className='form-control border border-success'
								type='search'
								placeholder='חפש לפי שם או אימייל'
								aria-label='חפש לפי שם או אימייל'
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
					</div>
				</div>
				{/* User Management Table */}
				<div className='table-responsive'>
					<table className='table table-hover table-bordered table-striped'>
						<thead className='table-light text-center'>
							<tr>
								<th>שם</th>
								<th>אימייל</th>
								<th>תפקיד</th>
								<th>סטטוס</th>
								<th>פעולות</th>
							</tr>
						</thead>
						<tbody className='text-center'>
							{filteredUsers.length > 0 ? (
								filteredUsers.map((user) => (
									<tr key={user._id}>
										<td>{user.name.first}</td>
										<td>{user.email}</td>
										<td>
											<select
												className='form-select'
												value={user.role}
												onChange={(e) =>
													changeRole(
														user.email as string,
														e.target.value,
													)
												}
											>
												<option value='Admin'>מנהל</option>
												<option value='Moderator'>מודרטור</option>
												<option value='Client'>משתמש</option>
											</select>
										</td>
										<td>
											<button
												className={`btn ${
													user.status === "Active"
														? "btn-danger"
														: "btn-success"
												}`}
												onClick={() =>
													toggleStatus(user._id as string)
												}
											>
												{user.status === "Active"
													? "חסום"
													: "הפעל"}
											</button>
										</td>
										<td>
											<button className='btn btn-warning me-2'>
												ערוך
											</button>
											<button className='btn btn-danger'>
												מחק
											</button>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={5}>לא נמצאו משתמשים תואמים</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	);
};

export default UersManagement;
