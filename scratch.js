// Problems to work through
// DONT THINK ABOUT USING OOP ON THIS - MORE TROUBLE THAN WORTH
/**
 * Wednesday 10.21
 * 1. index.html should be a landing page - description, why it exists, links to nav the site
 * 2. links to each other html page should be direct from nav bar up top
 * 3. image in the middle, could be a calendar?
 * 4. sports, leagues, teams, OR events could be the last link -> send to a calendar page of events for month (need to confirm with API)
 * 5. data needs to be displayed in each of those html pages referencing respective APIs
 * 
 * 
 * 
 * Thursday 10.22
 * 1. figure out the picture grid
 * 2. should i do the events page too?
 * 
 * 
 * 
 * 
 
    APIs - need to be have an additional input on end passed through via eventListeners
 *      search for team by name
 *      search for event by event name
 *      list all sports (in dropdown)
 *      list all leagues (in dropdown)
 *      "list all users loved teams and players" - filter to teams for the dropdown, could be good way.
 * 
 *  teams are identified by idTeam: "133662" six digit strings
 *  also in that object is strTeam: "Werder Bremen"
 * 
 *      livescores 
 *      live events on today...
 * 
 * 
 * 
 * 
 * 
 * 
 */


// this code block gives me an open white area - like it removed the grid body 

// const showAllLeagues = () => {
//     const showUp = document.querySelector('section')
//     let resultLeague = document.createElement('div')
//     resultLeague.className = 'grid'
//     resultLeague.appendChild(showUp)
// }
// showAllLeagues()





 // LEAGUES API / PAGE WORK
// const leaguesList = []
// const getLeagues = async () => {
//     try{
//         const response = await axios.get(ALL_LEAGUES_URL)
//         //console.log(response.data.leagues)
//         let leaguesList = response.data.leagues
//         // showAllLeagues(leaguesList)
//     }catch (error) {
//         console.log(error)
//     }
    
// }
// getLeagues()

// const leaguesDisplay = async (leaguesList) => {
//     const leaguesArea = document.querySelector('#leagues')
//     const leagueIcon = document.createElement('div')
//     leagueIcon.addEventListener('click', getTeamsData) //this will be function to take to that specific team page - variable declared up top//
//     leaguesList.forEach((league) => {
//         let showLeague = document.createElement('div')
//         showLeague.innerText = `${league.strLeague}`
//         leagueIcon.appendChild(showLeague)
//     })
//     leaguesArea.appendChild(leagueIcon)
// }

// leaguesDisplay()

// const showAllLeagues = () => {
//     const showUp = document.querySelector('section')
//     let resultLeague = document.createElement('div')
//     resultLeague.className = 'grid'
//     resultLeague.innerHTML = `${league.strLeague}`
//     resultLeague.appendChild(showUp)
// }
// showAllLeagues()




// most developed as of 10.21@6:53pm

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

const getTeamsData = async () => {
    try{
        const response = await axios.get(ALL_TEAMS_IN_LEAGUE_URL)
    }catch(error){
        console.log(error)
    }
}

const goToTeamsPage = () => {
    console.log('Should go to Teams.html page')
}


// let eventData = events.data
// let formattedEvents = {
//     match:eventData.strEvent,
//     matchDate:eventData.dateEvent,
//     startTime:eventData.strTime,
//     venue:eventData.strVenue, 
//     competition:eventData.strLeague  
// }


const getEvents = async () => {
    try {
        const response = await axios.get(NEXT_FIVE_TEAM_EVENTS_URL)
        //console.log(response.data.events)  // we have logged, trying to return the 5 events for use    
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
    let searchArea = document.querySelector('.search') // I removed search from the Leauges page
    let resultWrapper = document.createElement('div')
    let resultHeader = document.createElement('h2') // might want to use this for the img src element
    let currentEventsDisplay = e

    resultWrapper.className = 'search-result'
    resultHeader.innerText = eventData.match

    resultWrapper.appendChild(resultHeader)
    resultWrapper.appendChild(currentEventsDisplay)
    searchArea.appendChild(resultWrapper)
}

// window.onload = getEvents

// LEAGUES API / PAGE WORK

//grabbing all leagues in an array
const getLeagues = async () => {
    try{
        const response = await axios.get(ALL_LEAGUES_URL)
        const leagues = response.data.leagues
        for (let league of leagues){
            console.log(league.strLeague) // this returns the strings of each league competition
        }
        let allLeagues = leagues.league.strLeague
    }catch (error) {
        console.log(error)
    }
    return leagues
}
getLeagues()
// this gives me an array of 494 objects
//display just the strLeague (string value) of array

const leaguesOnly = () => {
    leagues.forEach((league, index) => {
        let comp = league.strLeague[i]
        //console.log(comp)
    })
    //return comp
}
//leaguesOnly()


//displaying the leagues by name - can i also do element creat creation here...the loop is broken, not 
// const leaguesDisplay = () => {
    //const leaguesArea = document.querySelector('#leagues')
    //const leagueIcon = document.createElement('div').addEventListener('click', goToTeamsPage) //this will be function to take to that specific team page on click - variable declared up top//
    //console.log('second') // this logged...
    //leagueIcon // this must be where it's breaking
    // for (let league of leagues){
    //     console.log(league) // this isn't logging...
        // const section = document.querySelector('.section')
        // const showLeague = document.createElement('div')
        // showLeague.innerText = `${league.strLeague}`
        // showLeague.appendChild(section)
    //}
    //leagueIcon.appendChild(leaguesArea)
// }
// leaguesDisplay()

//manipulating DOM to display each league in body
// const showAllLeagues = () => {
//     const section = document.querySelector('section')
//     let resultLeague = document.createElement('div')
//     resultLeague.className = 'league'
//     resultLeague.innerText = `${league.strLeague}`
//     resultLeague.appendChild(section)
// }
// showAllLeagues()




// const teamRedirect = onclick, take ID value and pass through to team api...?


////// EVENT LISTENERS//////
//
// on Leagues page load, displayLeaguesData
// how do I link that? eventlistener + onload function?


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