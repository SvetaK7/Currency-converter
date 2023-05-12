import React from 'react'
import s from 'components/Currencies.module.scss'

const defaultCurrencies = ['RUB', 'USD', 'BYN', 'EUR'];

type Props = {
  onChangeCurrency: (cur: string) => void
  currency: string
}

export const Currencies: React.FC<Props> = ({onChangeCurrency, currency}) => {
  return (
    <div className={s.carrencies}>
      {defaultCurrencies.map((cur) => (
        <li
          key={cur}
          onClick={() => onChangeCurrency(cur)}
          className={currency === cur ? s.active : ''}
        >
          {cur}
        </li>
        ))}
    </div>
  )
}