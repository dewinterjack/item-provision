const axios = require('axios');

const getItemIds = (items) => {
    return Promise.all(items.map(getItemId)).then((searchResults) => {
        const ids = searchResults.map(result => getFirstItemId(result.data.Results));
        return ids;
    }, (reason) => {
        throw `Failed to retrieve item from XIV API: ${reason}`
    })
}

const getFirstItemId = (results) => {
    if(results.length === 0)
    {
        throw "No results found from XIV API";
    }
    if(results.length > 1) {
        console.log(`More than one result found, using first result: ${results[0].Name}`);
    }

    return results[0].ID;
}

const getItemId = (item) => axios.get(`https://xivapi.com/search?indexes=Item&string=${item}`);

module.exports = {
    getItemIds
}