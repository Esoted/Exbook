import { useContext, useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';
import ProductContext from '../contexts/ProductContext';

function SearchPage() {
  const [searchProducts, setSearchProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const api = useContext(ProductContext).api;

  useEffect(() => {
    fetchData();
  }, [location.search]);

  const fetchData = async () => {
      setIsLoading(true);
      const query = searchParams.get('productInput');
      const exact = searchParams.get('isSearchExact');
      // TODO : faire une recherche à travers le serveur et mettre à jour la page
      try {
          const products = await api.search(query, exact);
          setSearchProducts(products);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
    finally {
    setIsLoading(false);
    }
  };

  const didSearchReturnResults = () => {
    return searchProducts.length !== 0;
  };

  return (
    <>
      <main>
        <section>
          <h2>Produits recherchés</h2>

          {isLoading ? (
            <div className='circular-progress-bar'>
              <CircularProgress color='inherit' />
            </div>
          ) : (
            <>
              {!didSearchReturnResults() && (
                <div className='no-available-product'>
                  <h3>Aucun produit n'est présent dans la recherche</h3>
                </div>
              )}
              {didSearchReturnResults() && (
                <div className='available-products'>
                  {/* TODO : Corriger le problème dans la boucle de rendu suite à la recherche */}
                  {searchProducts.map((product) => (
                    <ProductCard key = {product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default SearchPage;
