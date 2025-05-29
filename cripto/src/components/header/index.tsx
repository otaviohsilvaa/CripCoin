import logo from '../../assets/logo.svg'
import { Link } from 'react-router'
import styles from './header.module.css'

export function Header () {
    return (
        <header className={styles.container}>
            <div className={styles.logo}>
                <Link to={'/'}>
                    <img src={logo} alt="Logo"/>
                </Link>
            </div>
        </header>
    )
}
