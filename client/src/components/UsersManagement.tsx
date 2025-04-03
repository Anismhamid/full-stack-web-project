import {FunctionComponent, useEffect, useState} from "react";
import {UserRegister} from "../interfaces/User";
import {getAllUsers} from "../services/usersServices";

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

	// חיפוש משתמשים לפי שם או אימייל
	const filteredUsers = users.filter(
		(user) =>
			user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) ||
			user.email.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	// פונקציה לעדכון סטטוס של משתמש
	const toggleStatus = (_id: string) => {
		setUsers(
			users.map((user) =>
				user._id === _id
					? {...user, status: user.status === "Active" ? "Inactive" : "Active"}
					: user,
			),
		);
	};

	// פונקציה לשינוי תפקיד
	const changeRole = (_id: string, newRole: string) => {
		setUsers(
			users.map((user) => (user._id === _id ? {...user, role: newRole} : user)),
		);
	};

	return (
		<main className='login min-vh-100'>
			<h1 className='text-center bg-light rounded p-2'>ניהול משתמשים</h1>

			{/* שדה חיפוש */}
			<form className='text-center text-light' role='search'>
				<h3>חיפוש</h3>
				<input
					autoComplete='on'
					className='form-control me-2 w-100 mb-5 mt-3 border border-success'
					type='search'
					placeholder='חפש לפי שם או אימייל'
					aria-label='חפש לפי שם או אימייל'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</form>

			{/* רשימת משתמשים */}
			<table className='table table-hover table-responsive-sm table-dark'>
				<thead className=' text-center'>
					<tr>
						<th>שם</th>
						<th>אימייל</th>
						<th>תפקיד</th>
						<th>סטטוס</th>
						<th>פעולות</th>
					</tr>
				</thead>
				<tbody className=' text-center'>
					{filteredUsers.length > 0 ? (
						filteredUsers.map((user) => (
							<tr key={user._id}>
								<td>{user.name.first}</td>
								<td>{user.email}</td>
								<td>
									<select
										className='form-select'
										value={user.isAdmin == true ? "Admin" : ""}
										onChange={(e) =>
											changeRole(user._id as string, e.target.value)
										}
									>
										<option value='Admin'>מנהל</option>
										<option value='Moderator'>מודרטור</option>
										<option value='Client'>משתמש</option>
									</select>
								</td>
								<td>
									<button
										className={`btn btn-primary ${
											user.status === "Active" ? "btn-danger" : ""
										}`}
										onClick={() => toggleStatus(user._id as string)}
									>
										{user.status === "Active" ? "חסום" : "הפעל"}
									</button>
								</td>
								<td>
									<button className='btn btn-warning me-2'>ערוך</button>
									<button className='btn btn-danger'>מחק</button>
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
		</main>
	);
};

export default UersManagement;
