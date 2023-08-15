
export default (currentList: string[], itemFrom: string[]) => {
    if(currentList.length > itemFrom.length) 
        throw new Error('itemFrom count should be large then currentList');

    let index = -1;
    let item: string = '';

    do{
        index = Math.abs(Math.round(Math.random() * (itemFrom.length - 1)));
        item = itemFrom[index];
    }
    while(currentList.includes(item));

    return item;
};