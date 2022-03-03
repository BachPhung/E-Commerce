import { Add, Remove } from '@material-ui/icons'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Footer } from '../components/Footer/Footer'
import { Announcement } from '../components/navbar/Announcement'
import Navbar from '../components/navbar/Navbar'
import { mobile } from '../responsive'
import StripeCheckout from 'react-stripe-checkout'
import { userRequest } from '../requestMethods'
import { useHistory } from 'react-router-dom'

const KEY = process.env.REACT_APP_STRIPE
console.log(KEY)
const Container = styled.div`
    
`
const Wrapper = styled.div`
    padding: 20px;
`
const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"};
`
const TopTexts = styled.div`
    ${mobile({ display: 'none' })}
`
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: 'column' })}
`
const Info = styled.div`
    flex: 3;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: 'column' })}
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`
const Image = styled.img`
    width: 200px;
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const ProductName = styled.span`
    
`
const ProductId = styled.span`
    
`
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`
const ProductSize = styled.span`
    
`
const PriceDetails = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.span`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: '5px 1px' })}
`
const ProductPrice = styled.span`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: '20px' })}
`
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`
const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`
const SummaryTitle = styled.h1`
    font-weight: 200;
`
const SummaryItem = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    
`
const SummaryItemText = styled.span`
    font-weight: ${props => props.type === 'total' ? "500" : "200"};
    font-size: ${props => props.type === 'total' ? "24px" : "18px"};
`
const SummaryItemPrice = styled.span`
    
`
const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
`
export const Cart = () => {
    const cart = useSelector(state => state.cart)
    const [stripeToken, setStripeToken] = useState(null)
    const history = useHistory()
    const onToken = (token) =>{
        setStripeToken(token)
    }
    useEffect(()=>{
        const makeRequest = async () => {
            try{
                    const res = await userRequest.post('/checkout/payment',{
                    tokenId: stripeToken.id,
                    //amount: cart.total * 100
                    amount: 100
                })
                history.push('/success', {data: res.data})
            }
            catch{}
        }
        stripeToken && makeRequest()
    },[stripeToken, cart.total, history])
    return (
        <div>
            <Container>
                <Navbar />
                <Announcement />
                <Wrapper>
                    <Title>YOUR BAG</Title>
                    <Top>
                        <TopButton>CONTINUE SHOPPING</TopButton>
                        <TopTexts>
                            <TopText>Shopping Bag ({cart.quantity})</TopText>
                            <TopText>Your Wishlist (0)</TopText>
                        </TopTexts>
                        <TopButton type='filled'>CHECKOUT NOW</TopButton>
                    </Top>
                    <Bottom>
                        <Info>
                            {cart.products.map((product) => (
                                <Product>
                                    <ProductDetail>
                                        <Image src={product.img} />
                                        <Details>
                                            <ProductName><b>Product: </b>{product.title}</ProductName>
                                            <ProductId><b>ID: </b>{product._id}</ProductId>
                                            <ProductColor color={`${product.color}`} />
                                            <ProductSize><b>Size: </b>{product.size}</ProductSize>
                                        </Details>
                                    </ProductDetail>
                                    <PriceDetails>
                                        <ProductAmountContainer>
                                            <Add style={{ cursor: "pointer" }} />
                                            <ProductAmount>{product.quantity}</ProductAmount>
                                            <Remove style={{ cursor: "pointer" }} />
                                        </ProductAmountContainer>
                                        <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                                    </PriceDetails>
                                </Product>
                            ))}
                            <Hr />

                        </Info>

                        <Summary>
                            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                            <SummaryItem>
                                <SummaryItemText>Subtotal</SummaryItemText>
                                <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Estimated Shipping</SummaryItemText>
                                <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText>Shipping Discount</SummaryItemText>
                                <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                            </SummaryItem>
                            <SummaryItem>
                                <SummaryItemText type='total'>Total</SummaryItemText>
                                <SummaryItemPrice>$ 80</SummaryItemPrice>
                            </SummaryItem>
                            <StripeCheckout
                                name='Beauty Fashion'
                                image='https://image.shutterstock.com/image-photo/image-260nw-1276267237.jpg'
                                billingAddress
                                shippingAddress
                                description={`Your total is $${cart.total}`}
                                amount={cart.total*100}
                                token={onToken}
                                stripeKey={KEY}
                            >
                                <Button>CHECKOUT NOW</Button>
                            </StripeCheckout>
                        </Summary>
                    </Bottom>
                </Wrapper>
                <Footer />
            </Container>
        </div>)
}
