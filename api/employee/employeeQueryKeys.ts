const employeeQueryKeys = {
    all:['employee'],
    detail: (id: string) => [...employeeQueryKeys.all, id],
};

export default employeeQueryKeys;