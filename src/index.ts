
export function createProxy<T>(prototype: any, interceptor: (method: string, args: IArguments) => any){
    let proxy = {};
    const prototypeNames = Object.getOwnPropertyNames(prototype.prototype).filter(q => q !== "constructor") as string[];

    const prototypeNamesFuncOnly = prototypeNames.filter(q => typeof prototype.prototype[q] === "function")
    prototypeNamesFuncOnly.forEach(p => proxy[p] = function() { return interceptor.bind(this)(p, arguments); });
    return proxy;
}
