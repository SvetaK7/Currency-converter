import React from 'react'
import s from './CurrencyInput.module.scss'

type Props = {
  value: number
  onChangeValue: (value: number) => void
}

export const CurrencyInput: React.FC<Props> = ({value, onChangeValue}) => {
  return (
    <input
      className={s.input}
      type="number"
      value={value}
      placeholder={'0'}
      onChange={(e) => onChangeValue(+e.target.value)}
    />
  )
}