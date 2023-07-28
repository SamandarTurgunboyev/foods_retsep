'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { foodNameFail, foodNameLoad, foodNameSucc } from '../../../slice/foodNameSlice'
import { Box, CircularProgress, Container, Typography } from '@mui/material'
import axios from 'axios'

const page = ({ params }) => {
    let id = params.foodfav
    const state = useSelector(state => state.foodName)
    const { foodName } = useSelector(state => state.foodName)
    const dispatch = useDispatch()

    const getApi = async () => {
        try {
            dispatch(foodNameLoad())
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            dispatch(foodNameSucc(response.data.meals))
        } catch (error) {
            dispatch(foodNameFail(error))
        }
    }

    useEffect(() => {
        getApi()
    }, [])

    return (
        <>
            {state.isLoading ?
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "150px" }}>
                    <CircularProgress size={100} />
                </Box>
                :
                <>
                    {
                        foodName.map((m) => {
                            const src = m.strYoutube.slice(32)
                            return (
                                <div key={m.idMeal}>
                                    <Container sx={{ marginTop: "100px" }} maxWidth="xl" >
                                        <Box sx={{ border: '5px solid rgba(0,0,0,.1)', p: 2, display: 'flex', justifyContent: "space-between", flexDirection: { xs: "column", sm: "row" } }} >
                                            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                                                {m.strMeal}
                                            </Typography>
                                        </Box >
                                    </Container >
                                    <Container maxWidth="xl" sx={{ marginTop: "50px" }}>
                                        <Box sx={{ border: '5px solid rgba(0,0,0,.1)', p: 2 }}>
                                            <iframe width="100%" height="500" src={`https://www.youtube.com/embed/${src}`}></iframe>
                                        </Box>
                                    </Container>
                                    <Container maxWidth="xl" sx={{ marginTop: "50px", display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                                        <Box sx={{ border: '5px solid rgba(0,0,0,.1)', p: 2, width: { xs: "100%", md: '50%' } }}>
                                            <img src={m.strMealThumb} style={{ width: '100%', height: 'auto' }} />
                                        </Box>
                                        <Box sx={{ border: '5px solid rgba(0,0,0,.1)', p: 2, width: { xs: "100%", md: '50%' } }}>
                                            <Typography>
                                                {m.strInstructions}
                                            </Typography>
                                        </Box>
                                    </Container>
                                </div >
                            )
                        })
                    }
                </>
            }
        </>
    )
}

export default page