import React from 'react';
import types from 'prop-types';
import {withRouter} from 'next/router';
import pageWrapper from '../../components/app';

const About = (props) => (
    <div>
        <p>This is about {props.router.query.who}</p>
    </div>
);

About.propTypes = {
    router: types.object
};
  
export default pageWrapper(withRouter(About));