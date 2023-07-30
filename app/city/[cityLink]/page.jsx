"use client"

import { Box, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Button, Container } from '@mui/material'
import { itaIsFail, itaIsLoad, itaIsSucc } from '../../../slice/italianSlice'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Section from '../../../component/section/Section'
import { addError, addFav } from '../../../slice/addSlice'

const page = ({ params }) => {
    let id = params.cityLink
    const { italian } = useSelector(state => state.italian)
    const { favourite } = useSelector(state => state.addFavourites)
    const state = useSelector(state => state.italian)
    const dispatch = useDispatch()

    const getApi = async () => {
        try {
            dispatch(itaIsLoad())
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`)
            dispatch(itaIsSucc(response.data.meals))
        } catch (error) {
            dispatch(itaIsFail(error))
        }
    }

    useEffect(() => {
        getApi()
    }, [])

    const addFavourite = async (ids) => {
        try {
            const resault = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids}`)
            dispatch(addFav([...favourite, resault.data.meals[0]]))

        } catch (error) {
            dispatch(addError(error))
        }
    }
    return (
        <>
            <Section
                titlep={"The "}
                span={id}
                titlep2={"Of Meals"}
            />
            {
                state.isLoading ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "150px" }}>
                        <CircularProgress size={100} />
                    </Box>
                    :
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
                        {italian.map((i) => {
                            return (
                                <Card key={i.idMeal} sx={{ maxWidth: 345, textAlign: "center" }}>
                                    <Link href={`${id}/${i.idMeal}`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                sx={{ mt: 5 }}
                                                image={i.strMealThumb}
                                                alt="green iguana"
                                            />
                                            <CardContent sx={{ mt: 5 }}>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {i.strMeal}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Link>
                                    <Button sx={{ mt: 5, textAlign: 'center' }} variant="outlined" color="inherit" onClick={() => addFavourite(i.idMeal)}>Favourite</Button>
                                </Card>
                            )
                        })}
                    </Container>
            }
        </>

    )
}

export default page