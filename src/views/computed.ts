import { effect, reactive, jobQueue, flushJob } from './effect'

export function computed(options) {
  let res
  let dirty = true
  let setter = () => { }
  let getter = () => { }
  if (typeof options === 'function') {
    getter = options
  } else {
    getter = options.get
    setter = options.set
  }
  const effectFn = effect(() => getter(), {
    lazy: true
  })
  const obj = {
    get value() {
      if (dirty) {
        res = effectFn()
        dirty = false
      }
      return res
    },
    set value(val) {
      setter(val)
    }
  }
  return obj
}