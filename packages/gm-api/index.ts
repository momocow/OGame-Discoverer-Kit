declare function GM_getValue<T = any> (name: string, defaultValue?: T): T
export const getValue = GM_getValue

declare const GM_listValues: () => string[]
export const listValues = GM_listValues
