const PoolQueryKeys = {
    all:['pool'],
    detail:(id:string) => [PoolQueryKeys.all, id],
}
 
export default PoolQueryKeys;