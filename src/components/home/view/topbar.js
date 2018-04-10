/**
 * ./src/components/home/view/topbar
 */

import React from 'react';

const TopBar = () => {
    return (
        <nav className="topbar green darken-3 nav-extended">
            <div className="nav-wrapper">
                <a className="brand-logo">
                    <i className="fa fa-codiepie" />
                </a>
                <ul className="right">
                    <li>
                        <a title='Search'>
                            <i className="fa fa-search" />
                        </a>
                    </li>
                    <li>
                        <a title='Notification'>
                            <i className="fa fa-bell-o" />
                        </a>
                    </li>
                    <li>
                        <a className="user-profile">
                            <img
                                className="user-image responsive-img circle"
                                src="./src/img/pp.jpg"
                            />
                        </a>
                    </li>
                </ul>
            </div>
            <div className="nav-content row">
                <div className="col m3">
                    <span className="nav-title">freeCodeCamp</span>
                </div>
                <div className="col m6">
                    <div className="col s6 nav-menu">
                        <div className="menu">
                            <div className="item">
                                <h5>Dev</h5>
                            </div>
                            <div className="item">
                                <h5>Design</h5>
                            </div>
                            <div className="item">
                                <h5>Data</h5>
                            </div>
                            <div className="item">
                                <h5>Write for us</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col s6 nav-cta">
                        <h5>Learn to code</h5>
                    </div>
                </div>
                <div className="col m3">
                    <div className="social">
                        <a title='Twitter'>
                            <i className="fa fa-twitter" />
                        </a>
                        <a title='Facebook'>
                            <i className="fa fa-facebook" />
                        </a>
                        <a className="btn">following</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default TopBar;
