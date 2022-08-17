import { useQuery } from '@tanstack/react-query'
import { IRestaurant, PizzaEventProps } from 'types';
import { Typography } from '@mui/material';

import Restaurant from 'components/Restaurant';

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

export default Restaurants;