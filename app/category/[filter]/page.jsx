"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Card, CardActionArea, CardContent, CardMedia, CircularProgress, Container, Typography } from '@mui/material';
import { addError, addFav } from '../../../slice/addSlice';
import Link from 'next/link';
import Section from '../../../component/section/Section';
import { foodsFail, foodsLoad, foodsSucc } from '../../../slice/foodSlice';

function page({ params }) {
  let id = params.filter
  const { foods } = useSelector(state => state.foods)
  const state = useSelector(state => state.foods)
  const dispatch = useDispatch()
  const { favourite } = useSelector(state => state.addFavourites)

  const getApi = async () => {
    try {
      dispatch(foodsLoad())
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`)
      dispatch(foodsSucc(response.data.meals))
    } catch (error) {
      dispatch(foodsFail(error))
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

  console.log(favourite);

  return (
    <>
      <Section
        span={id.slice(0, 1).toUpperCase() + id.slice(1).toLowerCase()}
        titlep2={"Of Meals"}
      />
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
            {foods.map((m) => {
              return (
                <Card key={m.idMeal} sx={{ maxWidth: 345, textAlign: "center" }}>
                  <Link href={`${id}/${m.idMeal}`} style={{ textDecoration: 'none', color: 'black' }}>
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
            })}
          </Container>
      }
    </>
  )
}

export default page