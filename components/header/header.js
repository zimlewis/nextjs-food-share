import Link from 'next/link';
import styles from './header.module.css';
import Image from 'next/image';
import NavLink from './nav-link'

import logoImage from '@/assets/logo.png'

const Header = () => {

    return (
        <header className={styles.header}>
            <Link className={styles.logo} href='/'>
                <Image src={logoImage} alt='mmb' priority />
                Next level food
            </Link>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <NavLink href="/meals">Browse meals</NavLink>
                    </li>
                    <li>
                        <NavLink href="/community">Community</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;