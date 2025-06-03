interface ObjectSearch {
    keyword: string,
    regex?: RegExp,
}

const searchHelper = (query) =>{
    let objectSearch: ObjectSearch;

    if(query.keyword){
        objectSearch.keyword= query.keyword;
        const regex = new RegExp(objectSearch.keyword, "i");
        objectSearch.regex = regex;
    }

    return objectSearch;
};

export default searchHelper;