import React from 'react';
import styled from 'styled-components';
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import { mobile } from '../../responsive';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClickAwayListener, Button, Grow, Paper, Popper, MenuItem as MenuItemMUI, MenuList, Badge, Avatar } from '@material-ui/core';
import Stack from '@mui/material/Stack';
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
    align-items: center;
    ${mobile({ justifyContent: 'center', flex: 2 })}
`
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: '12px', marginLeft: '10px' })}
    z-index: 10 !important;
`

const Navbar = () => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === "Escape") {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    const quantity = useSelector(state => state.cart.quantity)
    const user = useSelector(state => state.user.currentUser)
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
                    {
                        user === null && <>
                            <Link className='link' to='/register'>
                                <MenuItem>REGISTER</MenuItem>
                            </Link>
                            <Link className='link' to='/login'>
                                <MenuItem>SIGN IN</MenuItem>
                            </Link>
                        </>
                    }

                    {user && <MenuItem>
                        <Stack direction="row" spacing={2}>
                            <div>
                                <Button
                                    ref={anchorRef}
                                    id="composition-button"
                                    aria-controls={open ? 'composition-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                >
                                    <Avatar src='' />
                                </Button>
                                <Popper
                                    open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    placement="bottom-start"
                                    transition
                                    disablePortal
                                >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList
                                                        autoFocusItem={open}
                                                        id="composition-menu"
                                                        aria-labelledby="composition-button"
                                                        onKeyDown={handleListKeyDown}
                                                    >
                                                        <MenuItemMUI onClick={handleClose}>Profile</MenuItemMUI>
                                                        <MenuItemMUI onClick={handleClose}>My account</MenuItemMUI>
                                                        <MenuItemMUI onClick={handleClose}>Logout</MenuItemMUI>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </div>
                        </Stack>
                    </MenuItem>}
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
