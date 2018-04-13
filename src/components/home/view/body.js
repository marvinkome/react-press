/**
 * ./src/components/home/view/body
 */

import React from 'react';

const Body = () => {
    return (
        <div className="body section container">
            <div className="row">
                <div className="col l4 m6">
                    <div className="card">
                        <div className="card-image">
                            <img src="./src/img/card.jpg" />
                        </div>
                        <div className="card-content">
                            <a>
                                <span className="card-title">
                                    Use matchPath to Match Nested Route Paths in
                                    Parent Routes with React-Router.
                                </span>
                            </a>
                            <p>
                                If you have ever visited a sit-down restaurant,
                                then you can understand the difference between
                                front-end and back-end in web
                            </p>
                        </div>
                        <div className="card-action">
                            <div className="author">
                                <div className="author-image">
                                    <img
                                        className="circle"
                                        src="./src/img/pp.jpg"
                                    />
                                </div>
                                <div className="info">
                                    <span className="name">Gary Hills</span>
                                    <span className="date">12/01/2016 </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Body;
