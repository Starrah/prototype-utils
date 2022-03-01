// noinspection JSUnusedAssignment

export function insertPrototype<T>(obj: any, newProto: T): T {
    function getProtoChain(proto) {
        const result = []
        do {
            result.push(proto)
            proto = Object.getPrototypeOf(proto)
        } while (proto !== null) // Object.prototype.__proto__ = null
        return result
    }

    const baseProto = Object.getPrototypeOf(obj)
    const baseProtoChain = getProtoChain(baseProto), newProtoChain = getProtoChain(newProto)

    let i
    for (i = 0; i < newProtoChain.length; i++) {
        if (baseProtoChain.find(v => v === newProtoChain[i])) break
    }
    if (i === 0) return obj

    Object.setPrototypeOf(newProtoChain[i - 1], baseProto)
    Object.setPrototypeOf(obj, newProtoChain[i - 1])
    return obj
}

export function extendPrototype<T>(obj: any, objWithNewProto: T): T {
    Object.assign(obj, objWithNewProto)
    return insertPrototype(obj, Object.getPrototypeOf(objWithNewProto))
}

export function getParamsString(count: number): string {
    let r = []
    for (let i = 0; i < count; i++) r.push("p" + i)
    return r.join(",")
}

export function bindSelf<T extends Function>(fn: T): T {
    let fnObj
    const paramsString = getParamsString(fn.length)
    eval("fnObj=(" + paramsString + ",...args)=>fn.apply(fnObj,[" + paramsString + "].concat(args))")
    return fnObj
}
