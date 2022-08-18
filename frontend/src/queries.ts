import { INewPizzaEvent, INewRestaurant, EditRestaurantProps } from "types";

const PROD = "https://oppstart22-gruppe2-pizzabot.herokuapp.com"
const DEV = "http://localhost:8080"
const URL = PROD

type UsernamePassword = {
  username: string | null ,
  password: string | null
}

const getUsernamePassword = () => {
  return {
    username: localStorage.getItem("username"),
    password: localStorage.getItem("password")
  }
}

const getAuthHeader = ({username, password}:UsernamePassword) => {
  return `Basic ${btoa(`${username}:${password}`)}`
}

export const login = async (data:UsernamePassword) => {
  const res = await fetch(`${URL}/api/login`, {
    headers: {
      "Authorization": getAuthHeader(data)
    }
  })
  // Errors have to be thrown manually when using fetch. 
  // See react-query documentation on error handling
  if (res.status === 401) { 
    throw new Error('401')
  }
  return res.text
}


export const fetchAllPizzaEvents = async () => {
  const res = await fetch(`${URL}/api/events`,{
    headers: {
      "Authorization": getAuthHeader(getUsernamePassword())
    }
  }
  );
  return res.json();
}

export const fetchUpcomingPizzaEvents = async () => {
  const res = await fetch(`${URL}/api/future_events`,
  {
    headers: {
      "Authorization": getAuthHeader(getUsernamePassword())
    }
  });
  if (res.status === 401) {
    throw new Error('401')
  }
  return res.json();
}

export const postNewPizzaEvent = async (data : INewPizzaEvent) => {
    const res = await fetch(`${URL}/api/events`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": getAuthHeader(getUsernamePassword())
        },
        body: JSON.stringify(data)
        });
}

export const fetchAllRestaurants = async () => {
    const res = await fetch(`${URL}/api/restaurants`, {
        headers: {
            "Authorization": getAuthHeader(getUsernamePassword())
          }
    });
    return res.json();
}

export const postNewRestaurant = async (data : INewRestaurant) => {
    const res = await fetch(`${URL}/api/restaurants`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": getAuthHeader(getUsernamePassword())
        },
        body: JSON.stringify(data)
        });
}

export const editRestaurant = async ({ id, data } : EditRestaurantProps) => {
    const res = await fetch(`${URL}/api/restaurants/${id}`, {
        method: 'PUT',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": getAuthHeader(getUsernamePassword())
        },
        body: JSON.stringify(data)
        });
}
export const deleteRestaurant = async (id : string) => {
    const res = await fetch(`${URL}/api/restaurants/${id}`, {
        method: 'DELETE',
        headers: {
        "Authorization": getAuthHeader(getUsernamePassword())
        },
        });
}

