import  { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
  ProductListContainer,
  ProductCard,
  ProductImage,
  ProductTitle,
  ProductDescription,
  ProductPrice,
} from './components/ProductList';


const Navbar = styled.nav`
background-color: #4a90e2;
display: flex;
align-items: center;
justify-content: space-between;
position: sticky;
padding: 1rem; 
box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const SearchBar = styled.input`
  width: 25%;
  @media (max-width: 768px) {
    width: 50%; // Set a smaller width for mobile devices
  }
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-right: 1rem;
  transition: border-color 0.3s;
  &:focus {
    border-color: #fff;
  }
`;

const SortSection = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: center;
`;

const SortDropdown = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const SortOption = styled.option`
  background-color: #4a90e2;
  color: #fff;
  scroll-behavior: smooth;
`;

const ProductListItem = styled(ProductCard)`
  width: calc(25% - 2rem);
  transition: transform 0.2s;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 1024px) {
    width: calc(50% - 1rem);
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ProductImageFixed = styled(ProductImage)`
  height: 200px;
  object-fit: cover;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  button {
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #4a90e2;
      color: #fff;
      border-color: #4a90e2;
    }
  }
`;

const CategoryDropdown = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const App = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const [category, setCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [filteredProducts, setFilteredProducts] = useState([]); 

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  useEffect(() => {
    setFilteredProducts(products); 
  }, [products]);

  const handleFilterChange = (e) => {
    const searchFilter = e.target.value.toLowerCase();

    
    const filteredAndSearchedProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchFilter)
    );

    setFilter(searchFilter);
    setCurrentPage(1); 

    
    setFilteredProducts(filteredAndSearchedProducts);
  };

const handleCategoryChange = (e) => {
  const selectedCategory = e.target.value;
  setCategory(selectedCategory);

  // Filter products based on the selected category
  const filteredByCategory = products.filter((product) =>
    selectedCategory ? product.category === selectedCategory : true
  );

  // Apply the category filter to the filteredProducts
  setFilteredProducts(filteredByCategory);
  setCurrentPage(1); // Reset to the first page when changing the category
};

  const handlePageChange = (page) => {
  
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const uniqueCategories = [...new Set(products.map((product) => product.category))];

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;


    const updatedFilteredProducts = [...filteredProducts];

    if (selectedOption === 'lowToHigh') {
    
      updatedFilteredProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (selectedOption === 'highToLow') {
      
      updatedFilteredProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    
    setFilteredProducts(updatedFilteredProducts);
  };

  return (<>
  
      <Navbar>
        <div style={{marginLeft: '20px'}}>
        <h1 style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>DevTown</h1>
        </div>
        
        <SearchBar
          type="text"
          placeholder="Search products..."
          value={filter}
          onChange={handleFilterChange}
        />
      </Navbar>
      <SortSection>
        <SortDropdown id="sortDropdown" onChange={handleSortChange}>
          <SortOption value="">Price</SortOption>
          <SortOption value="lowToHigh">Low to High</SortOption>
          <SortOption value="highToLow">High to Low</SortOption>
        </SortDropdown>
        <CategoryDropdown value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </CategoryDropdown>
      </SortSection>
      <ProductListContainer>
        {filteredProducts
          .slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage)
          .map((product, index) => (
            <ProductListItem key={index}>
              <ProductImageFixed src={product.image} alt={product.title} />
              <ProductTitle>{product.title}</ProductTitle>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductPrice>${product.price}</ProductPrice>
            </ProductListItem>
          ))}
      </ProductListContainer>
      <Pagination>
        {pageNumbers.map((page) => (
          <button key={page} onClick={() => handlePageChange(page)}>
            {page}
          </button>
        ))}
      </Pagination>
  </>
  );
};

export default App;