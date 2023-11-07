const customerQueryKeys = {
    all: ['customer'],
    detial: (id: string) => [...customerQueryKeys.all, id],

}

export default customerQueryKeys;