import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import './Sec.css'

const Section = ({ titlep, titlep2, span, text, btn, btnT }) => {
    return (
        <Box component="main" className='main' >
            <Typography variant='h4'>
                {titlep} <span style={{ color: '#ff7800' }}>{span}</span>  {titlep2}
            </Typography>
            <Typography variant='subtitle2' sx={{ textAlign: 'center', p: 3, color: '#666', width: '45%' }}>
                {text}
            </Typography>
            {btnT ?
                <Button variant="outlined" color="inherit">{btn}</Button>
                : <></>
            }
        </Box>
    )
}

export default Section