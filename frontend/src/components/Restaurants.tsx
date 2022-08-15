import { useQuery } from '@tanstack/react-query'
import { PizzaEventProps } from 'types';
import { Box, Typography } from '@mui/material';

function Restaurants({ queryKey, query } : PizzaEventProps) {
  const { isLoading, error, data } = useQuery(
      queryKey,
      query
  )

  if (isLoading) return (
      <Typography variant="subtitle1">Loading...</Typography>
  )
      
  if (error) return (
    <Typography variant="subtitle1">Could not fetch restaurants</Typography>
    )

  if (data === undefined || data.length == 0) {
      return (
          <Typography variant="subtitle1">No restaurants :(</Typography>
      )
  }

  console.log(data[0][1]);

  return (
      <Restaurant />
  )
}

function Restaurant() {
    return (
        <Box>
            <Typography variant="h6" component="p">Peppes Pizza</Typography>
            <Typography variant="body2" component="p">Karl Johans gate 1</Typography>
            <Typography variant="body2" component="p">+47 22 22 55 55</Typography>
        </Box>
    )
}

export default Restaurants;