import { baseUrl, eventsQuantity } from "../variables.js"

async function getUserEvents(userName) {
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${eventsQuantity}`)
    const events = await response.json()
    return events.filter(event => event.type == 'PushEvent' || event.type == 'CreateEvent')
}

export { getUserEvents }
