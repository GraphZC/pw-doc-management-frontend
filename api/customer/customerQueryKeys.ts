const customerQueryKeys = {
    all: ['customer'],
    detial: (id: number) => [...customerQueryKeys.all, id],

}

export default customerQueryKeys;