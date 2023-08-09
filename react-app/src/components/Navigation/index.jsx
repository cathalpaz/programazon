import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CategoryHeader from './CategoryHeader';
import Account from './Account';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	console.log(sessionUser)

	const [showComponent, setShowComponent] = useState(false);



	const handleMenu = () => {
		setShowComponent(!showComponent);
	}

	console.log(showComponent)

	return (
		<div className='nav__wrapper'>
			<div className='nav__container'>
				<NavLink exact to="/" className='nav__logo'>
					<img src='/images/programazon.png'></img>
				</NavLink>
				<div className='nav__selling'>
					<p>Selling items?</p>
					{sessionUser ? <span>Click to start</span> : <span>Sign in to start</span>}
				</div>
				<div className='nav__search-bar'>
					<div>All</div>
					<input
						className='search-input'
						placeholder='Search Programazon'
						// set up useStates
					/>
					<i class="fa-solid fa-magnifying-glass search-icon"></i>
				</div>
				<div className='nav__lang'>
					<img src='/images/flag.png' />
					<span>EN</span>
				</div>
				{sessionUser ? (
					<div className='nav__box account__sec' onClick={handleMenu}>
						<p>Hello, {sessionUser.username}</p>
						<span>Account & Lists <i className="fa-solid fa-caret-down" /></span>
						{showComponent && <Account user={sessionUser} />}
					</div>
				) : (
					<div className='nav__box account__sec' onClick={handleMenu}>
						<p>Hello, sign in</p>
						<span>Account & Lists <i className="fa-solid fa-caret-down" /></span>
						{showComponent && <Account user={sessionUser} />}
					</div>
				)}
				<div className='nav__box'>
					<p>Returns</p>
					<span>& Orders</span>
				</div>
				<div className='nav__cart'>
					<p>0</p>
					<span>Cart</span>
				</div>

				{/* {isLoaded && (
					<div>
						<ProfileButton user={sessionUser} />
					</div>
				)} */}
			</div>
			<div className='nav__cat-header'>
				<CategoryHeader />
			</div>
		</div>
	);
}

export default Navigation;
