'use client'

import React, { useEffect } from 'react'
import Section from '../../component/section/Section'
import { useDispatch, useSelector } from 'react-redux'
import { searchName, searchSucc, serachLoad } from '../../slice/serachSlice'
import axios from 'axios'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Container, Typography } from '@mui/material'
import Stack from '@mui/material/Stack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { addError, addFav } from '../../slice/addSlice'
import Link from 'next/link'

const page = () => {
    const dispatch = useDispatch()
    const { search } = useSelector(state => state.search)
    const { complated } = useSelector(state => state.search)
    const state = useSelector(state => state.search)
    const { favourite } = useSelector(state => state.addFavourites)
    const searchs = (e) => {
        dispatch(searchName(e.target.value))
    }

    const getApi = async () => {
        try {
            dispatch(serachLoad())
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
            {
                response.data.meals == null ?
                    dispatch(searchSucc([{}]))
                    :
                    dispatch(searchSucc(response.data.meals))
            }
        } catch (error) {
            console.log("error");
        }
    }

    const addFavourite = async (ids) => {
        try {
            const resault = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids}`)
            dispatch(addFav([...favourite, resault.data.meals[0]]))
            favourite.map((e) => {
                { e.idMeal !== ids ? dispatch(addFav([...favourite, resault.data.meals[0]])) : dispatch(addFav([...favourite])); }
            })

        } catch (error) {
            dispatch(addError(error))
        }
    }

    useEffect(() => {
        getApi()
    }, [search])

    return (
        <>
            <Section input={true} placeholder={"Type For Search By Category"} change={searchs} />
            {complated.length <= 1 ?
                <Card sx={{ maxWidth: "100%", height: "300px", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Stack sx={{ width: '100%', height: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }} spacing={2}>
                        <ErrorOutlineIcon color='error' sx={{ fontSize: '100px' }} />
                        <Typography variant='h5' p={3}>
                            Hech narsa topilmadi
                        </Typography>
                    </Stack>
                </Card>
                :
                <>
                    {
                        state.isLaoding ?
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
                                {
                                    complated.map((m) => {
                                        return (
                                            <Card key={m.idMeal} sx={{ maxWidth: 345, textAlign: "center" }}>
                                                <Link href={`search/${m.idMeal}`} style={{ textDecoration: 'none', color: 'black' }}>
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
                                                <Button sx={{ mt: 5, textAlign: 'center' }} variant="outlined" color="inherit" onClick={() => addFavourite(m.idMeal)}>Favourite</Button>
                                            </Card>
                                        )
                                    })
                                }
                            </Container>
                    }
                </>
            }
        </>
    )
}

export default page