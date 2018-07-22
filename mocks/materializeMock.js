export default (name, mock) => {
    Object.defineProperty(window, 'M', {
        value: {
            [name]: {
                init: mock
            }
        }
    });
};
