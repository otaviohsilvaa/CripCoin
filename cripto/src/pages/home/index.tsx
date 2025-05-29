import { useEffect, useState, type FormEvent} from 'react';
import styles from './home.module.css'
import { IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';


interface CoinProps{
    name: string;
    delta_24h: string;
    price: string;
    symbol: string;
    volume_24h: string;
    market_cap: string;
    formatedPrice: string;
    formatedMarket: string;

}

interface DataProps{
    coins: CoinProps[];
}

export function Home(){

    const [coins, setCoins] = useState<CoinProps[]>([])
    const [inputValue, setInputValue] = useState("")
    const navigate = useNavigate();

    useEffect(() =>{
        function getData() {
            fetch('http://localhost:3000/api/moedas')
            .then(response => response.json())
            .then((data: DataProps) => {
                let coinsData = data.coins.slice(0, 15);

                let price = Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
                
                const formatResult = coinsData.map((item) => {
                    const formated = {
                        ...item,
                        formatedPrice: price.format(Number(item.price)),
                        formatedMarket: price.format(Number(item.market_cap)),
                    }

                    return formated;
                });

                

                setCoins(formatResult);
            })
        }

        getData();
    }, [] )

    function handleSearch( e: FormEvent){
        e.preventDefault();
        if(inputValue === "")
            return;
        navigate(`/detail/${inputValue}`)
    }

    return(
        <main className={styles.container}>
            <form className={styles.form} onSubmit={handleSearch}>
                <input
                placeholder='Digite numero da BTC'
                value={inputValue}
                onChange={ (e) => setInputValue(e.target.value) }
                />
                <button type='submit'>
                    <IoMdSearch size={30} color='#FFF'/>
                </button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th scope='col'>Moeda</th>
                        <th scope='col'>Valor do Mercado</th>
                        <th scope='col'>Preço</th>
                        <th scope='col'>Volume</th>
                    </tr>
                </thead>

                <tbody id='tbody'>
                    {coins.map ( coin => (
                        <tr key={coin.name} className={styles.tr}>
                        <td className={styles.tdLabel} data-Label='Moeda'>
                            <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                            <span>{coin.name}</span> | {coin.symbol}
                            </Link>
                        </td>
                        <td className={styles.tdLabel} data-Label='Mercado'>
                            {coin.formatedMarket}
                        </td>
                        <td className={styles.tdLabel} data-Label='Preço'>
                            {coin.formatedPrice}
                        </td>
                        <td className={parseFloat(coin?.delta_24h.replace('%', '').replace(',', '.')) >= 0 ? styles.tdProfit : styles.tdLoss} data-Label='Volume'>
                            <span>{coin.delta_24h}</span>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

        </main>
    )
}