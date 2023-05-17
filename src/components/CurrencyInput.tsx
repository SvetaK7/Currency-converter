import React, {ChangeEvent} from 'react'
import s from './CurrencyInput.module.scss'

type Props = {
  value: string
  onChangeValue: (value: string) => void
}

export const CurrencyInput: React.FC<Props> = ({value, onChangeValue}) => {

  const onOnChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeValue(e.target.value)
  }
  return (
    <input
      className={s.input}
      type="number"
      value={value}
      placeholder={'0'}
      onChange={onOnChangeCallback}
    />
  )
}