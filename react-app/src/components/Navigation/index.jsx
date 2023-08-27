import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CategoryHeader from './CategoryHeader';
import Account from './Account';
import { useHistory } from 'react-router-dom';
import { thunkGetCart } from '../../store/cart';
import './Navigation.css';

function Navigation(){
	const history = useHistory()
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const cartItems = useSelector(state => (Object.values(state.cart.items)));
	const componentRef = useRef(null);

	const [showComponent, setShowComponent] = useState(false);

	const handleClickOutside = (event) => {
		if (componentRef.current && !componentRef.current.contains(event.target)) {
		setShowComponent(false);
		}
	};

	const handleMenu = () => {
		setShowComponent(!showComponent);
	}
	const sendToLogin = () => {
		history.push('/login')
	}
	const sendToPostProduct = () => {
		history.push('/products/new')
	}
	const sendToCart = () => {
		history.push('/cart')
	}

	const [searchFilter, setSearchFilter] = useState('')

	const handleSubmitSearch = () => {
		history.push(`/products?q=${searchFilter}`)
		window.location.reload();
	}
	const handleEnterSearch = (event) => {
		if (event.key === 'Enter') {
			history.push(`/products?q=${searchFilter}`)
			window.location.reload();
		}
	}
	const comingSoon = () => {
		alert('Coming soon!')
	}

	useEffect(() => {
		dispatch(thunkGetCart())
	}, [dispatch])

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
		document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div className='nav__wrapper'>
			<div className='nav__container'>
				<NavLink exact to="/" className='nav__logo'>
					<img src='/images/programazon.png' alt='logo'></img>
				</NavLink>
				<div className='nav__selling'>
					<p>Looking to sell?</p>
					{sessionUser ? <span onClick={sendToPostProduct}>Click to start</span> : <span onClick={sendToLogin}>Sign in to start</span>}
				</div>
				<div className='nav__search-bar'>
					<div>All</div>
					<input
						className='search-input'
						placeholder='Search Programazon'
						// set up useStates
						value={searchFilter}
						onChange={e => setSearchFilter(e.target.value)}
						onKeyPress={handleEnterSearch}
					/>
					<i className="fa-solid fa-magnifying-glass search-icon" onClick={handleSubmitSearch}></i>
				</div>
				<div className='nav__lang'>
					<img src='/images/flag.png' alt='lang'/>
					<span>EN</span>
				</div>
				{sessionUser ? (
					<div className='nav__box account__sec' onClick={handleMenu} ref={componentRef}>
						<p>Hello, {sessionUser.username}</p>
						<span>Account & Lists <i className="fa-solid fa-caret-down" /></span>
						{showComponent && <Account user={sessionUser} />}
					</div>
				) : (
					<div className='nav__box account__sec' onClick={handleMenu} ref={componentRef}>
						<p>Hello, sign in</p>
						<span>Account & Lists <i className="fa-solid fa-caret-down" /></span>
						{showComponent && <Account user={sessionUser} />}
					</div>
				)}
				<div className='nav__box' onClick={comingSoon}>
					<p>Returns</p>
					<span>& Orders</span>
				</div>
				<div className='nav__cart' onClick={sendToCart}>
					{sessionUser ? (
						<p>{cartItems ? cartItems.length : "0"}</p>
					) : (
						<p>0</p>
					)}
					<span>Cart</span>
				</div>
			</div>
			<div className='nav__cat-header'>
				<CategoryHeader />
			</div>
		</div>
	);
}

export default Navigation;
