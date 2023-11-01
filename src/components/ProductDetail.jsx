// src/components/ProductDetail.js
import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const DetailContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
`;

const ProductTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ProductDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: green;
`;

const ProductDetail = ({ products }) => {
  const { id } = useParams();

  const product = products.find((p) => p.id === parseInt(id, 10));

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <DetailContainer>
      <ProductTitle>{product.title}</ProductTitle>
      <ProductPrice>${product.price}</ProductPrice>
      <ProductDescription>{product.description}</ProductDescription>
    </DetailContainer>
  );
};

export default ProductDetail;
