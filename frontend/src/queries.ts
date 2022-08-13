import { INewPizzaEvent } from "types";

export const fetchAllPizzaEvents = async () => {
  const res = await fetch(`http://localhost:8080/api/events`);
  return res.json();
}

export const fetchUpcomingPizzaEvents = async () => {
  const res = await fetch(`http://localhost:8080/api/future_events`);
  return res.json();
}

export const postNewPizzaEvent = async (data : INewPizzaEvent) => {
    const res = await fetch('http://localhost:8080/api/events', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        });
    console.log("res:", res);
}
