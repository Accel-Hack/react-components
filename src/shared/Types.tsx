type PartialPromise<T> = T | (() => Promise<T>)

function ResultOf<T>(partialPromise: PartialPromise<T>, success: (_: T) => void, error?: (_: any) => void) {
  Promise.resolve(partialPromise instanceof Function ? partialPromise() : partialPromise)
    .then(success)
    .catch((err) => error?.(err))
}

export { PartialPromise, ResultOf }
