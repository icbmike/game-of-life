export function count<T>(arr: T[], predicate: (t: T) => boolean): number {
    return arr.filter(predicate).length;
}
