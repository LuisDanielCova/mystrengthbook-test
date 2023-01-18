import React, { useEffect, useState } from 'react'
import axios from "axios"

const today = new Date()

const apiUrl = "http://localhost:8888/api/0.1"

const GetRate = () => {

    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(1);
    const [convertedAmount, setConvertedAmount] = useState(1);
    const [from, setFrom] = useState("USD");
    const [to, setTo] = useState("CAD");
    const [converted, setConverted] = useState(false);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/currencies`);
                setCurrencies(response.data.currencies);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCurrencies();
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        setConverted(false)

        const currentTarget = event.currentTarget;

        // Amount is 1 because I couldn't make the base currency work with the API
        const data = {
            amount: 1,
            symbols: `${currentTarget.from.value},${currentTarget.to.value}`,
            date: currentTarget.date.value
        }

        const response = await axios.post(apiUrl, data);

        // Basically, we're just converting from 1 USD to the selected currencies and then
        // Dividing them so we can get an estimated result
        const fromResult = response.data.results[0].roundedResult;
        const toResult = response.data.results[1].roundedResult;
        
        setFrom(currentTarget.from.value)
        setTo(currentTarget.to.value)
        setAmount(currentTarget.amount.value);
        setConvertedAmount(toResult/fromResult * currentTarget.amount.value)
        setConverted(true)

    }

    return (
        <div>
            <form onSubmit={handleSubmit} >

                <input type="text" name="amount" placeholder='Amount' />
                {currencies &&  <select name="from">
                    <option value="">From</option>
                    {currencies.map((currency) => (
                        <option value={currency} key={currency}>{currency}</option>
                    ))}
                </select>}
                {currencies &&  <select name="to">
                    <option value="">To</option>
                    {currencies.map((currency) => (
                        <option value={currency} key={currency}>{currency}</option>
                    ))}
                </select>}
                <input type="date" name="date" max={today.toISOString().substring(0, 10)} />

                <input type="submit" value="Go" />

            </form>

            {converted && <div>
                <p>{amount} {from} = {convertedAmount.toFixed(3)} {to}</p>
            </div>}

        </div>
    )
}

export default GetRate