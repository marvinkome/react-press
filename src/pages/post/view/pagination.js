import React from 'react';
import types from 'prop-types';
import Link from 'next/link';
import { get_page_link } from '../../../lib/helpers';

const Pagination = ({ nextTitle, prevTitle }) => {
    const prevLink = prevTitle ? get_page_link(prevTitle) : '';
    const nextLink = nextTitle ? get_page_link(nextTitle) : '';

    return (
        <div className="pagination">
            {prevTitle && (
                <div className="pager prev">
                    <div>previous post</div>
                    <h5>
                        <Link href={`/p/${prevLink}`}>
                            <a rel="prev">{prevTitle}</a>
                        </Link>
                    </h5>
                </div>
            )}
            {nextTitle && (
                <div className="pager next">
                    <div>next post</div>
                    <h5>
                        <Link href={`/p/${nextLink}`}>
                            <a rel="next">{nextTitle}</a>
                        </Link>
                    </h5>
                </div>
            )}
        </div>
    );
};

Pagination.propTypes = {
    nextTitle: types.string,
    prevTitle: types.string
};

export default Pagination;
