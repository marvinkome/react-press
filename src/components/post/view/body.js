/**
 * ./src/components/post/view/body
 */

import React, { Component } from 'react';

class Body extends Component {
    constructor(props) {
        super(props);
        this.fabRef = React.createRef();
    }
    componentDidMount() {
        const fab = this.fabRef.current;
        window.M.FloatingActionButton.init(fab);
    }
    render() {
        return (
            <div className="post-body section container">
                <div className="row">
                    <div className="col m12">
                        <div className="author-info">
                            <div className="author-image col s3">
                                <img
                                    src="./src/img/pp.jpg"
                                    className="responsive-img circle"
                                />
                            </div>
                            <div className="author-details col s9">
                                <p className="author-name">
                                    Kiko Krachen
                                    <a
                                        title="follow"
                                        className="btn-small btn follow"
                                    >
                                        follow
                                    </a>
                                </p>
                                <p className="author-desc">
                                    Founder of CodeAnalogies
                                    (www.codeanalogies.com). Self-taught web
                                    developer. Passionate about not making same
                                    mistakes twice. Only new mistakes!
                                </p>
                                <p className="post-meta">
                                    Apr 10 2018 - 10 mins read
                                </p>
                            </div>
                        </div>
                        <div className="post">
                            <div className="post-image">
                                <img
                                    src="./src/img/card.jpg"
                                    className="responsive-img"
                                />
                            </div>
                            <div className="post-content">
                                <h2 className="post-title">
                                    Front End v. Back End Explained by Waiting
                                    Tables At A Restaurant
                                </h2>
                                <div className="content">
                                    If you have ever visited a sit-down
                                    restaurant, then you can understand the
                                    difference between front-end and back-end in
                                    web development. When you are just getting
                                    started with learning web development, you
                                    encounter a series of concepts that
                                    completely overwhelm you. Databases?
                                    Servers? Client-side? Server-side? AJAX?
                                    Fortunately, you only need to understand
                                    HTML and CSS to build your first website,
                                    and you can do it locally on your computer.
                                    But if you want to understand how your site
                                    can eventually go live on the web, you need
                                    to understand the concept of front-end vs.
                                    back-end. Here’s the general idea: just like
                                    there is a waitstaff and kitchen staff in a
                                    restaurant, front-end and back-end divides
                                    the functionality of your site. It allows
                                    each side to do what they are good at. In
                                    the case of kitchen staff, that means
                                    cranking out high-quality food efficiently.
                                    The waitstaff are experts at working with
                                    customers and creating a customer
                                    experience.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref={this.fabRef} className="fixed-action-btn">
                    <a className="btn-floating btn-large">
                        <i className="fa fa-thumbs-up" />
                    </a>
                    <ul>
                        <li>
                            <a className="btn-floating btn-num">12</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default Body;
