export function entryValueFilter (filter) {
  return function valueFilter ([_, v]) {
    return filter(v)
  }
}

export function entryKeyFilter (filter) {
  return function keyFilter ([k]) {
    return filter(k)
  }
}

export function entryValueMap (mapper) {
  return function keyMapper ([k, v]) {
    return [mapper(k), v]
  }
}

export function entryKeyMap (mapper) {
  return function valueMapper ([k, v]) {
    return [k, mapper(v)]
  }
}

export function entryReducer (json, [k, v]) {
  json[k] = v
  return json
}
