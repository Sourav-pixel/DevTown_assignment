import styled from 'styled-components';

export const ProductListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ProductCard = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  padding: 16px;
  max-width: 300px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  
`;

export const ProductTitle = styled.h3`
  font-size: 1.5rem;
  margin: 10px 0;
`;

export const ProductDescription = styled.p`
  color: #666;
  margin: 10px 0;
  font-size:0.8rem;
`;

export const ProductPrice = styled.p`
  font-weight: bold;
  color: green;
`;