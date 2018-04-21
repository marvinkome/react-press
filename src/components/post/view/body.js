/**
 * ./src/components/post/view/body
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { PostID } from '../index';
import PostCard from './post-card';
import AuthorInfo from './author-info';
import Comment from './comment';
import Preloader from './preloader';
import FAB from '../../helpers/fab';

class InnerBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            claps: 0
        };
        this.fabRef = React.createRef();
    }
    componentDidMount() {
        const fab = this.fabRef.current;
        window.M.FloatingActionButton.init(fab);
    }
    onClap = () => {
        this.setState({
            claps: this.state.claps + 1
        });
    };
    render() {
        const { value } = this.props;
        const post = value.data.find(obj => obj.id == value.id);
        return (
            <div className="post-body section container">
                <div className="row">
                    {value.isFetching ? (
                        <div className="col m12 center-align preloader-cont circle">
                            <Preloader />
                        </div>
                    ) : (
                        post && (
                            <div>
                                <div className="col m12">
                                    <AuthorInfo data={post} />

                                    <PostCard data={post} />

                                    <Comment data={post.comments} />
                                </div>
                                <FAB claps_count={post.claps.edges.length} />
                            </div>
                        )
                    )}
                </div>
            </div>
        );
    }
}

const Body = props => (
    <PostID.Consumer>
        {value => <InnerBody {...props} value={value} />}
    </PostID.Consumer>
);

InnerBody.propTypes = {
    value: PropTypes.object.isRequired,
    children: PropTypes.node
};

export default Body;
