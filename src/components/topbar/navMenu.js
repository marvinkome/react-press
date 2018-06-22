import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { all_tags } from '../../../js/helpers';

export default class NavMenu extends React.Component {
    render() {
        return (
            <div>
                <Scrollbars style={{ height: 30 }} autoHide autoHideTimeout={1000}>
                    <section>
                        {all_tags.map((item, id) => (
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
