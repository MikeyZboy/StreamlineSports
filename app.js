/**
 * StreamlineSports 
 * - customize sports to your life, not the other way around
 * Useful API links from TheSportsDb
 * 
 * DOMAIN: `https://www.thesportsdb.com/`
 * APIKEY: '1'
 * BASE_URL: `https://www.thesportsdb.com/api/v1/json/${APIKEY}`
 * Next 5 Events by Team Id: 'https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=133602'
 * 
 * backup plan: "http://www.espn.com/apis/devcenter/io-docs.html?ref=public-apis"
 * 
 * 1. define global variables
 * 2. test a function that grabs data from the API
 * 3. what type are we getting? [keys, values, etc.]
 * 
 * 
 * 
 * 
 * 
 * 
 */
//  console.log('This is Working!') <-- confirmed

const APIKEY = '1'
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}`
const SEARCH_TEAM_NAME_URL =`https://www.thesportsdb.com/api/v1/json/${APIKEY}/searchteams.php`
const NEXT_FIVE_TEAM_EVENTS_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/eventsnext.php?id=133602` //this is set to Liverpool already...needs to be dynamic and the filter needs to be passed in via a search value
const ALL_SPORTS_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/all_sports.php`
const ALL_LEAGUES_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/all_leagues.php`


////// Functions ///////

// getSports = async() => {
//     try{
//         const sports = await axios.get(ALL_SPORTS_URL)
//         //console.log(sports.data)
//         // console.log(Object.keys(sports.data))
//         // let allSports = Object.keys(sports.data)
//         // console.log(allSports) // this isn't right...just returning a single 'sports'
//         // for (let i = 0; i < allSports.length; i++){
//         //     let sport = document.createElement('div')
//         //     sport.innerText = allSports[i]
//         //     // how do i inject the results into the links in the dropdown?

//         // }
//     }
//     catch (error) {
//         console.log(error)
//     }
// }
//getSports()


// getTeams = async() => {
//     try{
//         const teams = await axios.get(SEARCH_TEAM_NAME_URL)
//         // console.log(teams)
//         // buildDropdown(teams.data)
//     }
//     catch (error) {
//         // console.log(error)
//     }
// }
// getTeams()


// let eventData = events.data
// let formattedEvents = {
//     match:eventData.strEvent,
//     matchDate:eventData.dateEvent,
//     startTime:eventData.strTime,
//     venue:eventData.strVenue, 
//     competition:eventData.strLeague  
// }

// const events = response.data.events

const getEvents = async () => {
    
    try {
        const response = await axios.get(NEXT_FIVE_TEAM_EVENTS_URL)
        console.log(response.data.events)  // we have logged, trying to return the 5 events for use    
        // buildDisplay(response.data.events)
    } catch (error){
        console.log(error)
    }
}
getEvents()

const getEventsData = async (events) => {
    const NEXT_FIVE_TEAM_EVENTS_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/eventsnext.php?id=133602`
    try {
        const events = await axios.get(NEXT_FIVE_TEAM_EVENTS_URL)
        //console.log(events.data) // this is returning an array of just 5 events, but why is it already filtered to Liverpool?
        let eventData = events.data
        displayEventData(eventData)
        } catch (error) {
            console.log(error)
    } 
}

const buildDisplay = (events) => {
    const displayArea = document.querySelector('.events')
    const dropdown = document.createElement('select')
    dropdown.addEventListener('change', getEventsData)
    events.forEach((event) => {
        let displayDiv = document.createElement('div')
        displayDiv.innerText = `${event.match} - ${event.matchDate} - ${event.startTime}`
        let gameDetails = displayDiv.innerText
        dropdown.appendChild(gameDetails)
    })
displayArea.appendChild(dropdown)
}

// //no errors, but not displaying...

const displayEventData = (eventData) => {
    let searchArea = document.querySelector('.search')
    let resultWrapper = document.createElement('div')
    let resultHeader = document.createElement('h2') // might want to use this for the img src element
    let currentEventsDisplay = e

    resultWrapper.className = 'search-result'
    resultHeader.innerText = eventData.match

    resultWrapper.appendChild(resultHeader)
    resultWrapper.appendChild(currentEventsDisplay)
    searchArea.appendChild(resultWrapper)
}

window.onload = getEvents

// can I use OOP to create a grid/image system that is dynamic?
// use buildDisplay as a class 


////// EVENT LISTENERS//////

// this will be an event listener for click that prompts an HTML form about the Calendar sync they'd like...
// const syncCal = document.querySelector('#calSyncLink')
// syncCal.addEventListener('click', )

// I need to add eventlisteners for the different sports/leagues/teams menus to pass through the value to the correct API

// const filterTeam = () => {
// const teamInput = document.getElementById('teams')
// teamInput.addEventListener('click', function(e) {
//     e.preventDefault()
//     let input = document.getElementById('#click').value
    
// })
// }

