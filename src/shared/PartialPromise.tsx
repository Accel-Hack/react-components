type PartialPromise<T> = T | (() => Promise<T>)

function ResultOf<T>(partialPromise: PartialPromise<T>, success: (_: T) => void, failure?: (_: any) => void) {
  Promise.resolve(partialPromise instanceof Function ? partialPromise() : partialPromise)
    .then(success)
    .catch((err) => {
      console.log('err was thrown', err)
      console.log('failure', failure)
      failure?.(err)
    })
}

export { PartialPromise, ResultOf }
