interface ObjectPagination {
    currentPage: number,
    limitItems: number,
    skip?: number,
    totalPage?: number
}

const paginationHelper = (objectPagination: ObjectPagination, query: Record<string, any>, countRecord: number) => {
    if(query.page){
        objectPagination.currentPage=parseInt(query.page);
    }

    if(query.limit){
        objectPagination.limitItems=parseInt(query.limit);
    }

    objectPagination.skip=(objectPagination.currentPage-1) * objectPagination.limitItems;
    // console.log(objectPagination.skip);

    const totalPage = Math.ceil(countRecord/objectPagination.limitItems);
    // console.log(totalPage);
    objectPagination.totalPage = totalPage;

    return objectPagination
};

export default paginationHelper;