import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	console.log(sessionUser)

	const handleMenu = () => {
		console.log('open menu')
	}


	return (
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
				* EN
			</div>
			{sessionUser ? (
				<div className='nav__box'>
					<p>Hello, {sessionUser.username}</p>
					<span>Account & Lists</span>
				</div>
			) : (
				<div className='nav__box' onClick={handleMenu}>
					<p>Hello, sign in</p>
					<span>Account & Lists <i class="fa-solid fa-caret-down"></i></span>
				</div>
			)}
			<div className='nav__box'>
				<p>Returns</p>
				<span>& Orders</span>
			</div>
			<div className='nav__cart'>
				Cart
			</div>

			{/* {isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)} */}
		</div>
	);
}

export default Navigation;
