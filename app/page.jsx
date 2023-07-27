"use client"

import Section from '../component/section/Section'
import { catIsFail, catIsLoad, catIsSucc } from '../slice/categorySlice'
import { Box, Card, CardActionArea, CardContent, CardMedia, CircularProgress } from '@mui/material'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import Link from 'next/link'
import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"

const page = () => {
  const { category } = useSelector(state => state.category)
  const state = useSelector(state => state.category)
  const dispatch = useDispatch()

  const getApi = async () => {
    try {
      dispatch(catIsLoad())
      const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
      dispatch(catIsSucc(response.data.categories))
    } catch (error) {
      dispatch(catIsFail(error))
    }
  }

  useEffect(() => {
    getApi()
  }, [])

  return (
    <>
      <Section
        titlep={"Fresh And"}
        span={"Organic"}
        titlep2={"Products For You"}
        text={"Contrary To Popular Belief, Lorem Ipsum Is Not Simply Random Text. It Has Roots In A Piece Of Classical Latin Literature From 45 BC, Making It Over 2000 Years Old"}
        btn={"Shop Now"}
        btnT={true}
      />
      <Typography variant='h4' sx={{ p: 5, textAlign: 'center' }}>
        Our Categories
      </Typography>
      {state.isLoading ?
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: "150px" }}>
          <CircularProgress size={100} />
        </Box>
        :
        <Box
          sx={{
            width: "100%",
            display: 'grid',
            gridTemplateColumns: { sm: "auto auto", md: 'auto auto auto', lg: "auto auto auto auto" },
            gap: "25px",
            justifyContent: "space-evenly",
            marginTop: "100px",
          }}
        >
          <>
            {
              category.map((e) => {
                return (
                  <Card key={e.idCategory} sx={{ maxWidth: 345, textAlign: "center" }} >
                    <Link href={e.strCategory.toLowerCase()} style={{ textDecoration: 'none', color: 'black' }} >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          sx={{ mt: 5 }}
                          image={e.strCategoryThumb}
                          alt="green iguana"
                        />
                        <CardContent sx={{ mt: 5 }}>
                          <Typography gutterBottom variant="h5" component="div">
                            {e.strCategory}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                  </Card>
                )
              })
            }
          </>
        </Box >
      }
    </>
  )
}

export default page

