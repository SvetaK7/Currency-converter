import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Currencies} from "components/Currencies";
import {CurrencyInput} from "components/CurrencyInput";

type myObj =  {[key: string]: number}

function App() {
  // const [rates, setRates] = useState({})

  const rates = useRef<myObj>({})

  const [fromCurrency, setFromCurrency] = useState('BYN')
  const [toCurrency, setToCurrency] = useState('USD')

  const [fromPrice, setFromPrice] = useState('0');
  const [toPrice, setToPrice] = useState('1');

  const onChangeFromPrice = (value: string) => {
    if (fromCurrency !== 'RUB' && toCurrency !== 'RUB') {
      const price = +value / rates.current[fromCurrency]
      const result = price * rates.current[toCurrency]
      setFromPrice(value)
      setToPrice(result.toFixed(3))
    } else if (toCurrency === 'RUB' && fromCurrency == 'RUB') {
      setFromPrice(value)
      setToPrice(value)
    } else if (toCurrency === 'RUB') {
      const res = +value * rates.current[fromCurrency]
      setFromPrice(value)
      setToPrice(res.toFixed(3))
    } else {
      const result = +value * rates.current[toCurrency]
      setFromPrice(value)
      setToPrice(result.toFixed(3))
    }

  }
  const onChangeToPrice = (value: string) => {
    if (toCurrency !== 'RUB' && fromCurrency !== 'RUB') {
      const result = (rates.current[fromCurrency] / rates.current[toCurrency]) * (+value);
      setFromPrice(result.toFixed(3))
      setToPrice(value)
    } else if (toCurrency === 'RUB' && fromCurrency == 'RUB') {
      setFromPrice(value)
      setToPrice(value)
    } else if (fromCurrency === 'RUB') {
      const res = +value / rates.current[toCurrency]
      setToPrice(value)
      setFromPrice(res.toFixed(3))
    } else {
      const result = +value * rates.current[fromCurrency]
      setFromPrice(result.toFixed(3))
      setToPrice(value)
    }
  }

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/latest.js')
      .then((res) => res.json())
      .then((json) => {
        // setRates(json.rates)
        rates.current = json.rates;
        onChangeToPrice('1');
      })
      .catch((err) => {
        console.warn(err)
        alert('не удалось получить информацию')
      })
  }, [])

  useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])

  useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency])

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
