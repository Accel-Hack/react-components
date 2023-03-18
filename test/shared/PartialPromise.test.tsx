import { PartialPromise, ResultOf } from '../../src/shared/PartialPromise'
import { act } from 'react-dom/test-utils'

describe('PartialPromise', () => {
  it('object:success', async () => {
    const expectedInt = 100
    const returned: PartialPromise<number> = expectedInt

    function expected(_expectedInt: number) {
      expect(_expectedInt).toEqual(expectedInt)
    }

    ResultOf<number>(returned, expected)
  })
  it('object:error', async () => {
    const expectedInt = 100
    const returned: PartialPromise<number> = expectedInt
    const success = (_expectedInt: number) => {
      expect(_expectedInt).toEqual(expectedInt)
      throw new Error()
    }
    const failure = jest.fn()
    await act(() => ResultOf<number>(returned, success, failure))
    expect(failure).toHaveBeenCalled()
  })
  it('function:success', async () => {
    const expectedInt = 100
    const returned: PartialPromise<number> = () => Promise.resolve(expectedInt)

    function expected(_expectedInt: number) {
      expect(_expectedInt).toEqual(expectedInt)
    }

    ResultOf<number>(returned, expected)
  })
  it('function:error[rejected]', async () => {
    const expectedInt = 100
    const returned: PartialPromise<number> = () => Promise.reject(expectedInt)

    const success = jest.fn()
    const failure = (_expectedInt: number) => {
      expect(_expectedInt).toEqual(expectedInt)
    }
    await act(() => ResultOf<number>(returned, success, failure))
    expect(success).toHaveBeenCalledTimes(0)
  })
  it('function:error[thrown in success]', async () => {
    const expectedInt = 100
    const returned: PartialPromise<number> = () => Promise.resolve(expectedInt)

    const success = (_expectedInt: number) => {
      expect(_expectedInt).toEqual(expectedInt)
      throw new Error()
    }
    const failure = jest.fn()

    await act(() => ResultOf<number>(returned, success, failure))
    expect(failure).toHaveBeenCalled()
  })
})
