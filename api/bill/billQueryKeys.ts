const billQueryKeys = {
    all: ['bill'],
    detail: (id: string) => [...billQueryKeys.all, id],
} 

export default billQueryKeys;
