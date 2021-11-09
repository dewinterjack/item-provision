const axios = require('axios');

const getItemIds = (items) => {
    return Promise.all(items.map(getItemId)).then((searchResults) => {
        const combinedItemDetails = addToMap(searchResults);
        return combinedItemDetails;
    }, (reason) => {
        throw `Failed to retrieve item from XIV API: ${reason}`
    })
}

const addToMap = (allSearchResults) => {
    const itemMap = new Map();
    allSearchResults.forEach(searchResults => {
        let results = searchResults.data.Results;
        if(results.length === 0)
        {
            throw "No results found from XIV API";
        }
        if(results.length > 1) {
            console.log(`More than one result found, using first result: ${results[0].Name}`);
        }

        itemMap.set(results[0].ID, results[0].Name);
    });
    return itemMap;
}

const getItemId = (item) => axios.get(`https://xivapi.com/search?indexes=Item&string=${item}`);

const getCustomData = async (itemIds) => {
    const server = "Twintania";

    let ids = [ ...itemIds.keys() ];
    const marketResponse = await axios.get(`https://universalis.app/api/v2/${server}/${ids.join()}`);
    return createCustomData(marketResponse, itemIds);
}

const createCustomData = (marketResponse, itemIds) => {
    const marketData = marketResponse.data;
    const items = [];
    [ ...itemIds.keys() ].forEach(item => {
        if(!marketData.unresolvedItems.includes(item)) {
            let currentItem = marketData.items[item];
            items.push({
                name: itemIds.get(item),
                id: item,
                minPrice: currentItem.minPrice,
                recentSale: currentItem.recentHistory[0]
            });
        }
    });
    console.log(items);
}

module.exports = {
    getItemIds,
    getCustomData
}