export function pagination(items, pageSize, pageNumber) {
    const startIndex = pageSize * (pageNumber - 1);

    return [...items].splice(startIndex, pageSize);
}
