import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components';
import { Footer } from '../components/Footer/Footer';
import { Announcement } from '../components/navbar/Announcement';
import Navbar from '../components/navbar/Navbar';
import { Newsletter } from '../components/Newsletter/Newsletter';
import { mobile } from '../responsive';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { publicRequest } from '../requestMethods';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
const Container = styled.div`
    
`
const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({padding:'10px', flexDirection:'column'})}
`
const ImgContainer = styled.div`
    flex: 1;
    min-height: 80vh;
`
const Image = styled.img`
    width: 70%;
    object-fit: cover;
    ${mobile({height:'45vh'})}
    z-index: 10 !important;
`
const InfoContainer = styled.div`
    flex: 1;
    padding: 0 50px;
    min-height: 80vh;
    ${mobile({padding:'10px'})}

`
const Title = styled.h1`
    font-weight: 200;
`
const Desc = styled.p`
    margin: 20px 0;
`
const Price = styled.span`
    font-weight: 100;
    font-size: 40px;
`
const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    ${mobile({width:'100%'})}
`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilterColor = styled.div`
    width:20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props=>props.color};
    margin: 0 5px;
    cursor: pointer;
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`
const FilterSizeOption = styled.option`
    
`
const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({width: "100%"})}
`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
` 
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 5px;
`
const Button = styled.button`
    cursor: pointer;
    padding: 15px;
    border: 1px solid teal;
    background-color: white;
    font-weight: 600;
    &:hover{
        background-color: #f8f4f4;
    }
`
export const Product = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const id = (location.pathname.split('/')[2])
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState('')
    const [size, setSize] = useState('')
    useEffect(()=>{
        const getProduct = async () => {
            try{
                const res = await publicRequest.get('/products/find/'+id)
                console.log('res',res.data)
                setProduct(res.data)
                setColor(res.data.color[0])
                setSize(res.data.size[0])
            }
            catch(err){
            }
        }
        getProduct()
    },[id])
    const handleAddProduct = () =>{
        console.log("color, size", color, size);
         dispatch(addProduct({...product, quantity, color, size}))
    }
    return (
        product && 
        <Container>
            <Navbar />
            <Announcement />
            <Wrapper>
                <ImgContainer>
                    <Image src={product.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>{product.price}</Price>
                    <FilterContainer>
                        <Filter>
                            <FilterTitle>Color</FilterTitle>
                            {product.color.map(c=><FilterColor onClick={()=>setColor(c)} key={c} color={`${c}`}/>)}
                        </Filter>
                        <Filter>
                            <FilterTitle>Size</FilterTitle>
                            <FilterSize onChange={(e)=>setSize(e.target.value)}>
                                {product.size.map(s=><FilterSizeOption key={s}>{s}</FilterSizeOption>)}
                            </FilterSize>
                        </Filter>
                    </FilterContainer>
                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={()=>{quantity===1 ? setQuantity(1) : setQuantity(quantity-1)}} style={{cursor:'pointer'}}/>
                            <Amount>{quantity}</Amount>
                            <Add onClick={()=> setQuantity(quantity+1)} style={{cursor:'pointer'}}/>
                        </AmountContainer>
                        <Button onClick={()=>handleAddProduct()}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter />
            <Footer />
        </Container>
    )
}
