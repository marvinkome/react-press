/**
 * ./src/js/redux/initialState.js
 */

const state = {
    isFetching: false,
    lastFetch: 0,
    data: {
        posts: [
            {
                uuid: 1,
                title: 'Hello World redux',
                body: `If you have ever visited a sit-down restaurant, then you
                    can understand the difference between front-end and
                    back-end in web development. When you are just getting
                    started with learning web development, you encounter a
                    series of concepts that completely overwhelm you.
                    Databases? Servers? Client-side? Server-side? AJAX?
                    Fortunately, you only need to understand HTML and CSS to
                    build your first website, and you can do it locally on
                    your computer. But if you want to understand how your
                    site can eventually go live on the web, you need to
                    understand the concept of front-end vs. back-end. Here’s
                    the general idea: just like there is a waitstaff and
                    kitchen staff in a restaurant, front-end and back-end
                    divides the functionality of your site. It allows each
                    side to do what they are good at. In the case of kitchen
                    staff, that means cranking out high-quality food
                    efficiently. The waitstaff are experts at working with
                    customers and creating a customer experience.`,
                timestamp: '2018',
                author: {
                    fullName: 'Kilo redux'
                }
            },
            {
                uuid: 2,
                title: 'Hello World 2 redux',
                body: 'Hello Kitty 2 redux',
                timestamp: '2018',
                author: {
                    fullName: 'Kilo redux'
                }
            }
        ]
    }
};

export default state;
