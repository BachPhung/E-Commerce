import React from 'react';
import Product from './Product';
import { popularProducts } from '../../data';
import styled from 'styled-components';
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    z-index: 1;
`
export const Products = () => {
    return (
        <Container>
            {popularProducts.map(item=>(
                <Product item={item} key={item.id}/>
            ))}
        </Container>
    )
}
