"use client"

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Section from '../../component/section/Section'
import { Button, Card, CardActionArea, CardContent, CardMedia, Container, Link, Typography } from '@mui/material'
import { addFav } from '../../slice/addSlice'

const page = () => {
    const { favourite } = useSelector(state => state.addFavourites)
    const dispatch = useDispatch()
    const deleteFav = (id) => {
        const remove = favourite.filter((f) => f.idMeal !== id)
        dispatch(addFav(remove))
    }
    return (
        <>
            <Section span={"Your"} titlep2={"Favourite Meals"} />
            <Container
                maxWidth="xl"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { sm: "auto auto", md: 'auto auto auto', lg: "auto auto auto auto" },
                    gap: "25px",
                    justifyContent: "space-evenly",
                    marginTop: "100px",
                }}
            >
                {favourite.length > 0 ?
                    <>
                        {
                            favourite.map((m) => {
                                return (
                                    <Card key={m.idMeal} sx={{ maxWidth: 345, textAlign: "center" }}>
                                        <Link href={`favourite/${m.idMeal}`} style={{ textDecoration: 'none', color: 'black' }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ mt: 5 }}
                                                    image={m.strMealThumb}
                                                    alt="green iguana"
                                                />
                                                <CardContent sx={{ mt: 5 }}>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {m.strMeal}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Link>
                                        <Button sx={{ mt: 5, textAlign: 'center' }} variant="outlined" color="inherit" onClick={() => deleteFav(m.idMeal)}>Remove</Button>
                                    </Card>
                                )
                            })
                        }
                    </>
                    :
                    <img style={{ width: "120%", marginLeft: '7vw' }} src="https://cdni.iconscout.com/illustration/premium/thumb/confusing-woman-due-to-empty-cart-4558760-3780056.png" />
                }
            </Container >
        </>
    )
}

export default page