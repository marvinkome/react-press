import React from 'react';
// import types from 'prop-types';

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

export const NavMenu = () => (
    <div>
        <section>
            {menu_items.map((item, id) => (
                <span key={id}>
                    <a>{item}</a>
                </span>
            ))}
        </section>
    </div>
);
