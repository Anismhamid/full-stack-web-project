import {FunctionComponent, useEffect, useState} from "react";
import {getUserById} from "../services/usersServices";
import RoleType from "../interfaces/UserType";
import {Link, useNavigate} from "react-router-dom";
import {
	Accordion,
	Button,
	AccordionSummary,
	AccordionDetails,
	Typography,
} from "@mui/material";
import {path} from "../routes/routes";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import useToken from "../hooks/useToken";

interface ProfileProps {}
/**
 * profile
 * @returns auth profile
 */
const Profile: FunctionComponent<ProfileProps> = () => {
	const navigate = useNavigate();
	const {decodedToken} = useToken();
	const [user, setUser] = useState<
		Partial<{
			_id: string;
			name: {first: string; last: string};
			phone: {phone_1: string; phone_2: string};
			address: {city: string; street: string; houseNumber?: string};
			email: string;
			image: {url: string; alt: string};
			role: string;
			status: string;
			activity: string[];
		}>
	>({
		_id: "",
		name: {first: "", last: ""},
		phone: {phone_1: "", phone_2: ""},
		address: {city: "", street: "", houseNumber: ""},
		email: "",
		image: {url: "", alt: ""},
		role: "",
		status: "",
		activity: [],
	});

	const isGoogleUser = !!decodedToken?.sub && !decodedToken?._id;

	useEffect(() => {
		const fetchUser = async () => {
			try {
				// משתמש גוגל
				if (decodedToken?.sub) {
					setUser({
						_id: decodedToken.sub,
						name: {
							first: decodedToken.given_name || "",
							last: decodedToken.family_name || "",
						},
						email: decodedToken.email,
						image: {
							url: decodedToken.picture || "",
							alt: "Google Profile",
						},
						role: "Client",
						phone: {
							phone_1: "",
							phone_2: "",
						},
						address: {
							city: "",
							street: "",
							houseNumber: "",
						},
						status: "active",
						activity: [],
					});
				}

				// משתמש רגיל
				else if (decodedToken?._id) {
					const userFromDb = await getUserById(decodedToken._id);
					setUser(userFromDb);
				}
			} catch (err) {
				console.error("Error fetching user:", err);
			}
		};

		if (decodedToken) {
			fetchUser();
		}
	}, [decodedToken]);

	return (
		<main className='min-vh-100 bg-dark'>
			<div className='container-fluid h-100 position-relative profile'>
				<div className=' d-flex align-items-center' style={{height: "350px"}}>
					<Link to={""}>
						<img
							className='border border-light rounded-4'
							src={
								user.image?.url ||
								"https://media2.giphy.com/media/l0MYO6VesS7Hc1uPm/200.webp?cid=ecf05e47hxvvpx851ogwi8s26zbj1b3lay9lke6lzvo76oyx&ep=v1_gifs_search&rid=200.webp&ct=g"
							}
							alt={`${user.image?.alt}'s avatar` || "User image"}
							style={{
								width: 200,
								height: 200,
								position: "absolute",
								left: 50,
								bottom: 5,
							}}
						/>
					</Link>
					{!isGoogleUser && (
						<div className='text-center my-4'>
							<Button
								variant='contained'
								color='warning'
								// Edit Profile
								onClick={() => navigate(path.CompleteProfile)}
							>
								עריכת פרטים אישיים
							</Button>
						</div>
					)}
					<hr />
				</div>
			</div>
			<div className='container table-responsive m-auto text-center my-5 rounded p-3 bg-gradient'>
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
								{user.role === RoleType.Admin
									? "מנהל ומנחה"
									: user.role === RoleType.Moderator
										? "מנחה"
										: "לקוח"}
							</td>
						</tr>
					</tbody>
				</table>

				<div className='row m-auto text-center mt-5'>
					<div className='table-responsive m-auto text-center my-5 rounded p-3 bg-gradient'>
						<div className=' fw-bold display-6 text-light p-2'>
							הזמנות קודמות
						</div>
						<table className='table table-striped-columns'>
							<tbody>
								<tr className=' bg-danger-subtle'>
									<th>מ"ס הזמנות</th>
									<td>
										<span className='fw-bold'>10</span>
										<Button
											onClick={() => {
												navigate(`${path.MyOrders}`);
											}}
											className='ms-5 border border-info'
										>
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
			</div>
			<div className='row m-auto text-center'>
				<div className='col bg-success'>1</div>
				<div className='col bg-primary'>2</div>
				<div className='col bg-warning'>1</div>
				<div className='col bg-opacity-75 bg-warning-subtle'>2</div>
			</div>

			<div className='row m-auto text-center py-5'>
				{/* 1 */}
				<div className='row'>
					<div className='col-6'>
						<Accordion
							sx={{
								color: "CaptionText",
								bgcolor: "AppWorkspace",
							}}
						>
							<AccordionSummary
								expandIcon={<ArrowDownwardIcon />}
								aria-controls='panel1-content'
								id='panel1-header'
							>
								<Typography component='span'>
									היסטורייה התחברות
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography style={{whiteSpace: "pre-line"}}>
									{user.activity
										? user.activity
												.map((timestamp) =>
													new Date(timestamp).toLocaleString(
														"he-IL",
														{
															year: "numeric",
															month: "long",
															day: "numeric",
															hour: "2-digit",
															minute: "2-digit",
														},
													),
												)
												.join("\n")
										: []}
								</Typography>
							</AccordionDetails>
						</Accordion>
					</div>
					{/* 2 */}
					<div className='col-6'>
						<Accordion
							sx={{
								color: "CaptionText",
								bgcolor: "AppWorkspace",
							}}
						>
							<AccordionSummary
								expandIcon={<ArrowDownwardIcon />}
								aria-controls='panel1-content'
								id='panel1-header'
							>
								<Typography component='span'>הזמנות קודמות</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography style={{whiteSpace: "pre-line"}}>
									{user._id}
								</Typography>
							</AccordionDetails>
						</Accordion>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Profile;
