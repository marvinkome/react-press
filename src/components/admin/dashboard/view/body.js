/**
 * ./src/components/admin/dashboard
 */

import React from 'react';

const Body = () => {
    return (
        <div className="main dashboard">
            <div className="welcome-card dash-card z-depth-1">
                <h5>Welcome to your Dashboard!</h5>
                <p>Here are some quick actions</p>

                <div className="actions-sec">
                    <div className="row">
                        <div className="col s12 ">
                            <p>
                                <i className="fa fa-newspaper-o" />
                                <a title="Create a post"> Create post</a>
                            </p>
                            <p>
                                <i className="fa fa-commenting-o" />
                                <a title="Moderate comments">
                                    Moderate comments
                                </a>
                            </p>
                            <p>
                                <i className="fa fa-cog" />
                                <a title="Manage blog settings">
                                    Manage blog settings
                                </a>
                            </p>
                            <p>
                                <i className="fa fa-eye" />
                                <a title="View blog">View blog</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="stats-card dash-card z-depth-1">
                <h5>Quick stats</h5>

                <div className="actions-sec">
                    <div className="row">
                        <div className="col m4 l3">
                            <p>
                                <i className="fa fa-newspaper-o" />
                                15 blog posts
                            </p>
                        </div>
                        <div className="col m4 l3">
                            <p>
                                <i className="fa fa-commenting-o" />
                                6 comments
                            </p>
                        </div>
                        <div className="col m4 l3">
                            <p>
                                <i className="fa fa-info-circle" />
                                Running Med-blog 1.0.0
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Body;
