import { useQuery } from '@tanstack/react-query'
import { IRestaurant, PizzaEventProps } from 'types';
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

  return (
      <>
        {
            data.map((restaurant : IRestaurant) => {
                return (
                    <Restaurant
                        key={restaurant.id}
                        id={restaurant.id}
                        name={restaurant.name}
                        address={restaurant.address}
                        phone_number={restaurant.phone_number}
                    />
                )
            })
        }
      </>
  )
}

function Restaurant({ name, phone_number, address } : IRestaurant) {
    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="h6" component="p">{name}</Typography>
            <Typography variant="body2" component="p">{address}</Typography>
            <Typography variant="body2" component="p">{phone_number}</Typography>
        </Box>
    )
}

export default Restaurants;