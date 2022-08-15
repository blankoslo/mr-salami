import { INewPizzaEvent } from "types";

const PROD = "https://oppstart22-gruppe2-pizzabot.herokuapp.com"
const DEV = "http://localhost:8080"
const URL = DEV

export const fetchAllPizzaEvents = async () => {
  const res = await fetch(`${URL}/api/events`);
  return res.json();
}

export const fetchUpcomingPizzaEvents = async () => {
  const res = await fetch(`${URL}/api/future_events`);
  return res.json();
}

export const postNewPizzaEvent = async (data : INewPizzaEvent) => {
    const res = await fetch(`${URL}/api/events`, {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        });
    console.log("res:", res);
}
