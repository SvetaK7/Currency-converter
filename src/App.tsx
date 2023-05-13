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

  // @ts-ignore
  const onChangeFromPrice = (value: number) => {
    // @ts-ignore
    if (fromCurrency !== 'RUB' && toCurrency !== 'RUB'){
      // @ts-ignore
      const price = value/rates[fromCurrency]
      // @ts-ignore
      const result = price*rates[toCurrency]
      setFromPrice(value)
      setToPrice(result)
    } else if (toCurrency === 'RUB'){
      // @ts-ignore
      const res = value*rates[fromCurrency]
      setFromPrice(value)
      setToPrice(res)
    } else {
      // @ts-ignore
      const result = value*rates[toCurrency]
      setFromPrice(value)
      setToPrice(result)
    }

  }
  const onChangeToPrice = (value: number) => {
    if (toCurrency !== 'RUB' && fromCurrency !== 'RUB'){
      // @ts-ignore
      const result = (rates[fromCurrency]/rates[toCurrency])*value;
      setFromPrice(result)
      setToPrice(value)
    }else if (fromCurrency === 'RUB'){
      // @ts-ignore
      const res = value/rates[toCurrency]
      setToPrice(value)
      setFromPrice(res)
    } else {
      // @ts-ignore
      const result = value*rates[fromCurrency]
      setFromPrice(result)
      setToPrice(value)
    }
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
