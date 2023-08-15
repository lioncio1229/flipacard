
export default (notListedFrom: string[], generatorSource: string[]) => {
    if(notListedFrom.length > generatorSource.length) 
        throw new Error('itemFrom count should be large then currentList');

    let index = -1;
    let item: string = '';

    do{
        index = Math.abs(Math.round(Math.random() * (generatorSource.length - 1)));
        item = generatorSource[index];
    }
    while(notListedFrom.includes(item));

    return item;
};