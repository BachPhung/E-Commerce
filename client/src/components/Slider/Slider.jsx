import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../../data";
import { mobile } from "../../responsive";
const Container = styled.div`
    height: 100vh;
    max-width: 100vw;
    display: flex;
    background-color: coral;
    position: relative;
    overflow: hidden;
    ${mobile({display:'none'})}
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: coral;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top:50%;
    z-index: 10;
    cursor: pointer;
    opacity: 0.5;
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${(props) => props.slideIndex * -100}vw);
`

const Slide = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    background-color: #${props => props.bg};
`
const ImgContainer = styled.div`
    flex:1;
    height: 100%;
`
const Image = styled.img`
    height: 80%;
`
const Title = styled.h1`
    font-size: 70px;
    text-transform: uppercase;
`
const Desc = styled.p`
    margin: 50px 0;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
`
const Button = styled.button`
    padding: 10px;
    text-transform: uppercase;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`
const InfoContainer = styled.div`
    flex:1;
    
`
export const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0)
    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        } 
        else if (direction==='right') {
            setSlideIndex( slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }
    return (
        <Container>
            <Arrow onClick={() => handleClick("left")}>
                <ArrowLeftOutlined style={{ fontSize: "40px" }} />
            </Arrow>
            <Wrapper slideIndex={slideIndex}>
                {sliderItems.map(item => {
                    return (
                        <Slide key={item.id} bg={item.bg}>
                            <ImgContainer>
                                <Image src={item.img} />
                            </ImgContainer>
                            <InfoContainer>
                                <Title>{item.title}</Title>
                                <Desc>{item.desc}</Desc>
                                <Button>SHOW NOW</Button>
                            </InfoContainer>
                        </Slide>
                    )
                })}
            </Wrapper>
            <Arrow onClick={() => handleClick("right")} style={{ top: "50%", right: '0' }} >
                <ArrowRightOutlined style={{ fontSize: "40px" }} />
            </Arrow>
        </Container>
    )
};
