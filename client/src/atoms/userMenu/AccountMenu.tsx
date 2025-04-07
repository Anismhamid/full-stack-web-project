import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {fontAwesomeIcon} from "../../FontAwesome/Icons";
import {Fragment, FunctionComponent, useState} from "react";
import {useUser} from "../../context/useUSer";
import {useNavigate} from "react-router-dom";
import {path} from "../../routes/routes";

interface AccountMenuProps {
	logout: Function;
}

const AccountMenu: FunctionComponent<AccountMenuProps> = ({logout}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const {auth} = useUser();
	const navigate = useNavigate();

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<Fragment>
			<Box sx={{display: "flex", alignItems: "center", textAlign: "center"}}>
				<Tooltip title='הגדרות חשבון'>
					<IconButton
						onClick={handleClick}
						size='small'
						sx={{ml: 2, width: "40px"}}
						aria-controls={open ? "account-menu" : undefined}
						aria-haspopup='true'
						aria-expanded={open ? "true" : undefined}
					>
						<Avatar
							className=' text-light bg-success'
							sx={{width: 40, height: 40}}
							src={auth && auth.image.url ? auth.image.url : "/svg/add.svg"}
						></Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id='account-menu'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				slotProps={{
					paper: {
						elevation: 0,
						sx: {
							overflow: "visible",
							filter: "drop-shadow(0px 2px 8px rgba(255, 255, 255, 0.32))",
							mt: 1.5,
							"& .MuiAvatar-root": {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							"&::before": {
								content: '""',
								display: "block",
								position: "absolute",
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: "background.paper",
								transform: "translateY(-50%) rotate(45deg)",
								zIndex: 0,
							},
						},
					},
				}}
				transformOrigin={{horizontal: "right", vertical: "top"}}
				anchorOrigin={{horizontal: "right", vertical: "bottom"}}
			>
				<MenuItem onClick={() => navigate(path.Profile)}>
					<Avatar
						src={auth && auth.image.url ? auth.image.url : "/svg/add.svg"}
					/>
					פרופיל
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<Avatar /> חשבון שלי
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleClose}>
					<ListItemIcon>{fontAwesomeIcon.addPerson}</ListItemIcon>
					Add another account
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon>{fontAwesomeIcon.setting}</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem onClick={() => logout()}>
					{fontAwesomeIcon.LogOut} Logout
				</MenuItem>
			</Menu>
		</Fragment>
	);
};

export default AccountMenu;
