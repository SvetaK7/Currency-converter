import React, {useEffect, useState} from 'react';
import './App.css';
import {Currencies} from "components/Currencies";
import {CurrencyInput} from "components/CurrencyInput";

function App() {
  const [rates, setRates] = useState({})
  const [fromCurrency, setFromCurrency] = useState('BYN')
  const [toCurrency, setToCurrency] = useState('USD')

  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  const onChangeFromPrice = (value: number) => {
    // @ts-ignore
    const price = value/rates[fromCurrency]
    // @ts-ignore
    console.log(price)
    // @ts-ignore
    console.log(rates[fromCurrency])
    console.log(fromCurrency)
    console.log(value)

    // @ts-ignore
    const result = price*rates[toCurrency]
    setFromPrice(value)
    setToPrice(result)
  }
  const onChangeToPrice = (value: number) => {
    setToPrice(value)
  }


  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then((res) => res.json())
      .then((json) => {
        setRates(json.rates)
        console.log(json.rates)
      })
      .catch((err) => {
        console.warn(err)
        alert('не удалось получить информацию')
      })
  }, [])

  return (
    <div className="App">
      <Currencies onChangeCurrency={setFromCurrency} currency={fromCurrency}/>
      <Currencies onChangeCurrency={setToCurrency} currency={toCurrency}/>
      <CurrencyInput value={fromPrice} onChangeValue={onChangeFromPrice}/>
      <CurrencyInput value={toPrice} onChangeValue={onChangeToPrice}/>
    </div>
  );
}

export default App;
