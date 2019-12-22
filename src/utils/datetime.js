export function today (now = new Date()) {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

export function tomorrow (now = new Date()) {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
}
