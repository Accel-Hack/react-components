import { PartialPromise, ResultOf } from '../../src/shared/PartialPromise'
import { act } from 'react-dom/test-utils'

describe('PartialPromise', () => {
  it('object:success', async () => {
    const expectedInt = 100
    const partialPromise: PartialPromise<void, number> = expectedInt

    function success(_expectedInt: number) {
      expect(_expectedInt).toEqual(expectedInt)
    }

    ResultOf({ partialPromise, success })
  })
  it('object:error', async () => {
    const expectedInt = 100
    const partialPromise: PartialPromise<void, number> = expectedInt
    const success = (_expectedInt: number) => {
      expect(_expectedInt).toEqual(expectedInt)
      throw new Error()
    }
    const failure = jest.fn()
    await act(() => ResultOf({ partialPromise, success, failure }))
    expect(failure).toHaveBeenCalled()
  })
  it('function:success', async () => {
    const expectedInt = 100
    const partialPromise: PartialPromise<void, number> = () => Promise.resolve(expectedInt)

    function success(_expectedInt: number) {
      expect(_expectedInt).toEqual(expectedInt)
    }

    ResultOf({ partialPromise, success })
  })
  it('function:error[rejected]', async () => {
    const expectedInt = 100
    const partialPromise: PartialPromise<void, number> = () => Promise.reject(expectedInt)

    const success = jest.fn()
    const failure = (_expectedInt: number) => {
      expect(_expectedInt).toEqual(expectedInt)
    }
    await act(() => ResultOf({ partialPromise, success, failure }))
    expect(success).toHaveBeenCalledTimes(0)
  })
  it('function:error[thrown in success]', async () => {
    const expectedInt = 100
    const partialPromise: PartialPromise<void, number> = () => Promise.resolve(expectedInt)

    const success = (_expectedInt: number) => {
      expect(_expectedInt).toEqual(expectedInt)
      throw new Error()
    }
    const failure = jest.fn()

    await act(() => ResultOf({ partialPromise, success, failure }))
    expect(failure).toHaveBeenCalled()
  })
})
