import React from 'react';
import styled from 'styled-components';
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import { Badge } from '@material-ui/core';
import { mobile } from '../../responsive';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const Container = styled.div`
    height: 60px;
    ${mobile({ height: '50px' })}
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0" })}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    //text-align: center;
`
const Language = styled.div`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: 'none' })}
`
const SearchContainer = styled.div`
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
`
const Input = styled.input`
    border: none;
    height: 22.5px;
    ${mobile({ width: '50px' })}
`
const Center = styled.div`
    flex: 1;
    width: 33.3%;
    
`
const Logo = styled.h1`
    display: flex;
    justify-content: center;
    ${mobile({ fontSize: '24px', marginLeft: "8px" })}
`
const Right = styled.div`
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: flex-end;
    ${mobile({ justifyContent: 'center', flex: 2 })}
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity)
    console.log('quantity: ', quantity);
    console.log('price', useSelector(state => state.cart.total))
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input placeholder='Search' />
                        <Search style={{ color: "gray", fontSize: '16px', cursor: 'pointer' }} />
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo>BEAUTY</Logo>
                </Center>
                <Right>
                    <MenuItem>REGISTER</MenuItem>
                    <MenuItem>SIGN IN</MenuItem>
                    <Link to='/cart'>
                        <MenuItem>
                            <Badge badgeContent={quantity} color='secondary' showZero>
                                <ShoppingCartOutlined />
                            </Badge>
                        </MenuItem>
                    </Link>
                </Right>
            </Wrapper>
        </Container>

    )
};

export default Navbar;
