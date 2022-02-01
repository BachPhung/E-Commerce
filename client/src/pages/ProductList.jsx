import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Footer } from '../components/Footer/Footer';
import { Announcement } from '../components/navbar/Announcement';
import Navbar from '../components/navbar/Navbar';
import { Newsletter } from '../components/Newsletter/Newsletter';
import { Products } from '../components/Product/Products';
import { mobile } from '../responsive';
const Container = styled.div`
    
`
const Title = styled.h1`
    margin: 20px;
`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Filter = styled.div`
    margin: 20px;    
    ${mobile({ width: '0 20px', display: 'flex', flexDirection: 'column' })}
`
const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ fontSize: '18px', marginRight: '0' })}
`
const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin: '10px 0' })}
`
const Option = styled.option`
    
`

export const ProductList = () => {
    const location = useLocation();
    const cat = (location.pathname.split('/')[2])
    const [filters, setFilters] = useState({})
    const handleFilters = (e) => {
        const value = e.target.value
        setFilters({
            ...filters,
            [e.target.name]: value,
        })
    }
    const [sort, setSort] = useState('newest')
    return (
        <Container>
            <Navbar />
            <Announcement />
            <Title>Dresses</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select defaultValue={'Color'} name='color' onChange={handleFilters}>
                        <Option value='Color' disabled>Color</Option>
                        <Option>White</Option>
                        <Option>Black</Option>
                        <Option>Red</Option>
                        <Option>Blue</Option>
                        <Option>Yellow</Option>
                        <Option>Green</Option>
                    </Select>
                    <Select defaultValue={'Size'} name='size' onChange={handleFilters}>
                        <Option value='Size' disabled >Size</Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select defaultValue={'newest'} onChange={e=>setSort(e.target.value)}>
                        <Option value='newest'>Newest</Option>
                        <Option value='asc'>Price: Low to High</Option>
                        <Option value='desc'>Price: High to Low</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort} />
            <Newsletter />
            <Footer />
        </Container>
    )
}
