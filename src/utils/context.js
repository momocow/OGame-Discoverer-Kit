export const ENTER = Symbol.for('__enter__')
export const EXIT = Symbol.for('__exit__')

export async function using (manager, executor) {
  const res = typeof manager[ENTER] === 'function'
    ? await manager[ENTER]() : undefined
  let error = null
  let ret = null
  try {
    ret = await executor(res)
  } catch (e) {
    error = e
  } finally {
    if (typeof manager[EXIT] === 'function') {
      await manager[EXIT](error, res)
    }
  }
  return ret
}
