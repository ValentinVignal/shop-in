import React, { Dispatch } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from './StateProvider';
import { UserState, UserAction } from './reducer';
import { auth } from './firebase';

function Header() {

    const [userState, dispatch]: [UserState, Dispatch<UserAction>] = useStateValue();

    function handleAuthentication(): void {
        if (userState.user) {
            auth.signOut();
            // dispatch({
            //     type: 'SET_USER',
            //     user: null
            // });
        }
    }

    return (
        <nav className='header'>
            <Link to="/">
                <img
                    className="header__logo"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt=''
                />
            </Link>
            <div className="header__search">
                <input type="text" className="header__searchInput" />
                <SearchIcon className="header__searchIcon" />
            </div>

            <div className="header__nav">
                <Link to={userState.user ? '/' : "/login"} className="header__link">
                    <div className="header__option" onClick={handleAuthentication}>
                        <span className='header__optionLineOne'>Hello {!userState.user ?
                            'Guest' : userState.user.email}</span>
                        <span className='header__optionLineTwo'>
                            {userState.user ? 'Sign Out' : 'Sign In'}
                        </span>
                    </div>
                </Link>

                <Link to="/orders" className="header__link">
                    <div className="header__option">
                        <span className='header__optionLineOne'>Returns</span>
                        <span className='header__optionLineTwo'>& Orders</span>
                    </div>
                </Link>

                <Link to="/login" className="header__link">
                    <div className="header__option">
                        <span className='header__optionLineOne'>Your</span>
                        <span className='header__optionLineTwo'>Prime</span>
                    </div>
                </Link>


                <Link to='/checkout' className='header__link'>
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header__optionLineTwo header__basketCount">{userState.basket?.length}</span>
                    </div>
                </Link>
            </div>

        </nav>
    )
}

export default Header
