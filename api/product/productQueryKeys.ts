const productQueryKeys = {
    all:['product'],
    detail: (id: string) => [...productQueryKeys.all, id],
};

export default productQueryKeys;
