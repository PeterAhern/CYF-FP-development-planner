import classes from "./Navbar.module.css";



const Navbar = (props) => {
    return (
			<nav className={classes.navbar}>
				<ul className={classes.navbarNav}>
                    {props.children}
				</ul>
			</nav>
		);
};

export default Navbar;