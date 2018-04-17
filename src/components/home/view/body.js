/**
 * ./src/components/home/view/body
 */

import React from 'react';
import { PostID } from '../index';
import PostCard from './post-card';
import Preloader from './preloader';

const Body = () => {
    return (
        <PostID.Consumer>
            {value => (
                <div className="body section container">
                    <div className="row">
                        {value.isFetching ? (
                            <div className="col m12 center-align preloader-cont circle">
                                <Preloader />
                            </div>
                        ) : (
                            value.data.map(obj => (
                                <div key={obj.uuid} className="col l4 m6">
                                    <PostCard post={obj} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </PostID.Consumer>
    );
};

export default Body;
