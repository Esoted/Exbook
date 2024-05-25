import SearchBox from './SearchBox';
import '../styles/NavBar.css';
import { Link } from 'react-router-dom';
import {useContext} from 'react';
import ProductContext from '../contexts/ProductContext';

function NavBar() {
 const {state} = useContext(ProductContext);
  return (
    <>
      <header>
        <nav>
          {/* TODO : Remplacer les balises <a> par les bonnes balises de la librairie react-router-dom */}
          <ul className='flex-center'>
            <li>
              <Link to='/'>
                <img
                  alt='logo'
                  id='logoPolyZonWhite'
                  src='/LogoPolyZonWhite.png'
                ></img>
              </Link>
            </li>
            <SearchBox />
            <li>
              <Link to='/about' className='nav-link'>À propos</Link>
            </li>
            <li>
              <Link to='/cart' className='nav-link'>
                <i id='cart-icon' className='fa-solid fa-cart-shopping shopping-cart'></i>
                {/* TODO : Afficher le nombre d'article mis à jour à chaque modification du panier */}
                Panier ({state.cartProducts.length})
              </Link>
            </li>
            <li>
              <Link to='/returns' className='nav-link'>
                Retour
                <br />
                <strong>et commande</strong>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
