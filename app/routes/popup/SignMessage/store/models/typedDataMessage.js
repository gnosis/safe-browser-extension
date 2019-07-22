import { Record } from 'immutable'
import type { RecordFactory, RecordOf } from 'immutable'

export type TypedDataMessageProps = {
  safeAddress: string,
  message: string,
  type: string,
  origin: string
}

export const makeTypedDataMessage: RecordFactory<TypedDataMessageProps> = Record(
  {
    safeAddress: '',
    message: '',
    type: '',
    origin: ''
  }
)

export type TypedDataMessage = RecordOf<TypedDataMessageProps>
