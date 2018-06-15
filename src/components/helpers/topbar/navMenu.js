import React from 'react';
// import types from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';

const menu_items = [
    'home',
    'trust',
    'culture',
    'tech',
    'entreprenuership',
    'self',
    'politics',
    'media',
    'design',
    'programming',
    'art',
    'science',
    'popular'
];

export default class NavMenu extends React.Component {
    render() {
        return (
            <div>
                <Scrollbars style={{ height: 30 }} autoHide autoHideTimeout={1000}>
                    <section>
                        {menu_items.map((item, id) => (
                            <span key={id}>
                                <a>{item}</a>
                            </span>
                        ))}
                    </section>
                </Scrollbars>
            </div>
        );
    }
}
