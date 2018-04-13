/**
 * ./src/components/home/view/topbar
 */

import React from 'react';

const TopBar = () => {
    return (
        <nav className="topbar nav-extended">
            <div className="nav-wrapper">
                <a className="brand-logo">
                    <i className="fa fa-codiepie" />
                </a>
                <ul className="right">
                    <li>
                        <a title="Search">
                            <i className="fa fa-search" />
                        </a>
                    </li>
                    <li>
                        <a title="Notification">
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
                <div className="col l3 m4">
                    <span className="nav-title"> freeCodeCamp </span>
                </div>
                <div className="col l6 m7">
                    <div className="col s6 nav-menu">
                        <div className="menu">
                            <div className="item">
                                <h5>
                                    <a title="Web development"> Dev </a>
                                </h5>
                            </div>
                            <div className="item">
                                <h5>
                                    <a title="Web design"> Design </a>
                                </h5>
                            </div>
                            <div className="item">
                                <h5>
                                    <a title="Data Science"> Data </a>
                                </h5>
                            </div>
                            <div className="item">
                                <h5>
                                    <a title="Write for us"> Write for us </a>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col s6 nav-cta">
                        <h5>
                            <a title="Learn to code"> Learn to code </a>
                        </h5>
                    </div>
                </div>
                <div className="col l3 m12">
                    <div className="social">
                        <a title="Twitter">
                            <i className="fa fa-twitter" />
                        </a>
                        <a title="Facebook">
                            <i className="fa fa-facebook" />
                        </a>
                        <a className="btn"> following </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default TopBar;
