// Utility functions
export const updateObject = (oldObj, newValues) => {
    return Object.assign({}, oldObj, newValues);
};

export const updateNestedItemArray = (array, itemId, callback, key = 'id') => {
    const updatedItems = array.map((item) => {
        if (item['node'][key] !== itemId) {
            return item;
        }

        const updatedItem = callback(item);
        return updatedItem;
    });

    return updatedItems;
};

export const removeItemInNestedArray = (array, itemId, key = 'id') => {
    let selected_item = array.find((item) => item['node'][key] == itemId);

    return array.filter((item) => item !== selected_item);
};

export const removeDuplicateInArray = (propertyName, inputArray, duplicateKey) => {
    let duplicate = false;

    inputArray.map((item) => {
        if (item[propertyName] === duplicateKey) {
            delete item[propertyName];
            duplicate = true;
        }
    });

    return duplicate;
};
