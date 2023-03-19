type PartialPromise<Req, Res> = Res | ((request?: Req) => Promise<Res>)

interface IResultOf<Req, Res> {
  partialPromise: PartialPromise<Req, Res>
  request?: Req
  success: (_: Res) => void
  failure?: (_: any) => void
}

function ResultOf<Req, Res>(props: IResultOf<Req, Res>) {
  const promise: Promise<Res> =
    props.partialPromise instanceof Function
      ? props.partialPromise(props.request)
      : Promise.resolve(props.partialPromise)

  promise.then((op) => props.success(op)).catch((err) => props.failure?.(err))
}

export { PartialPromise, ResultOf }
