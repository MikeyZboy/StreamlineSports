// Problems to work through
// DONT THINK ABOUT USING OOP ON THIS - MORE TROUBLE THAN WORTH
/**
 * 
 * most current version 11:18-thurs
 * 
 * 
 * const APIKEY = '4013017'
const BASE_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}`
const SEARCH_TEAM_NAME_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/searchteams.php`
const NEXT_FIVE_TEAM_EVENTS_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/eventsnext.php?id=133602` //this is set to Liverpool already...needs to be dynamic and the filter needs to be passed in via a search value
const ALL_SPORTS_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/all_sports.php`
const ALL_LEAGUES_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/all_leagues.php`
const ALL_TEAMS_IN_LEAGUE_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/search_all_teams.php?l=English%20Premier%20League`
const LIVE_SOCCER_SCORES_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/latestsoccer.php`
const EVENTS_ON_TV = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/eventstv.php?`



let body = document.querySelector('body')
let section = document.querySelector('section')
let soccer = document.querySelector('#soccer')
let sports = document.querySelector('#sportsSection')
let leagues = document.querySelector('#leaguesList')
let teams = document.querySelector('.teams')
let allSports = document.querySelector('#sportsList')






////// Functions ///////


const liveSoccerScores = () => {
    try {
        axios.get(LIVE_SOCCER_SCORES_URL)
            //console.log(response) // returns array of live soccer scores
            .then(response => {
                //console.log(response.data.teams.Match[0])
                // console.log(response.data.teams.Match[0].HomeTeam)
                let matchArr = response.data.teams.Match
                for (let i = 0; i < matchArr.length; i++) {
                    //console.log('hey there')
                    let matchScore = document.createElement('option')
                    matchScore.innerText = `Minute: ${matchArr[i].Time} ~ ${matchArr[i].AwayTeam}: ${matchArr[i].AwayGoals} - ${matchArr[i].HomeTeam}: ${matchArr[i].HomeGoals}`
                    soccer.appendChild(matchScore)
                }
            })
    } catch (error) {
        console.log(error)
    }
}
liveSoccerScores()

// this stopped display at 10pm and is now throwing an error "cannot read property length"...looks like the erray is empty now...
// switch statement / do while loop to correct the "no current games" scenario


const allSportsList = () => {
    try{
        axios.get(ALL_SPORTS_URL)
        .then(response => {
        let sportsList = response.data.sports
        for (let s = 0; s < sportsList.length; s++){
            let sportTab = document.createElement('li')
            sportTab.className = 'list'
            sportTab.innerText = `${sportsList[s].strSport}`
            allSports.appendChild(sportTab)
        }
        })
    }catch(error){
        console.log(error)
    }
}
allSportsList()


const allLeaguesList = () => {
    try{
        axios.get(ALL_LEAGUES_URL)
        .then(response => {
        let leaguesList = response.data.leagues
        for (let l = 0; l < leaguesList.length; l++) {
            let leagueTab = document.createElement('option')
            leagueTab.className = 'list'
            leagueTab.innerText = `${leaguesList[l].strLeague}`
            // leagueTab.innerHTML = (link to )
            leagues.appendChild(leagueTab)
        }
        })
        } catch(error) {
        console.log(error)
        }
    }
allLeaguesList()

// need to add an event listener for the league that is clicked on => push the string value to the teams_in_league api and take user to teams.html
// on teams.html = list out all teams in that league
// click on team (event listener passes in team ID to get next 5 events api
// -> display the next 5 events in html form pop up, ask them to fill out for email info of those games/reminder


const teamsInLeague = () => {
    try {
        axios.get(ALL_TEAMS_IN_LEAGUE_URL)
        .then(response => {
            //console.log(response.data.teams)
        let teamsList = response.data.teams
        for (let t = 0; t < teamsList.length; t++) {
            console.log(teamsList)
            let teamTab = document.createElement('a')
            teamTab.className = 'list'
            teamTab.href = `${NEXT_FIVE_TEAM_EVENTS_URL}`
            teamTab.innerHTML = `${teamsList[t].strTeam}`
            teams.appendChild(teamTab)
        }
        })
    }catch(error){
        console.log(error)
    }
}
teamsInLeague()

const buildLeaguesDropdown = () => {
    const dropdownDiv = document.querySelector('.dropdown')
    const dropdown = document.createElement('select')  //<-- select elements are dropdowns
    dropdown.addEventListener('change', allLeaguesList) //<-- change is looking for any change in that element
    // data.forEach((symbol) => {
    //     let optionElement = document.createElement('option')
    //     optionElement.innerText = `${symbol.description} - ${symbol.symbol}`
    //     optionElement.setAttribute('value', symbol.symbol)
    //     dropdown.appendChild(optionElement)
    dropdownDiv.appendChild(dropdown)
}
buildLeaguesDropdown()
 * 
 * 
 * 
 * 
 * 
 * 
 * 
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


// * {
//     box-sizing: border-box;
// }

// body {
//     display: grid;
//     grid-template-columns: 1fr 4fr;
//     grid-template-rows: 75px 1fr 30px;
//     text-align: center;
//     height: 100vh;
//     margin: 0;
//     font-family: 'Commissioner', sans-serif;
//     background-color: rgb(255, 255, 255);
// }

// .flex-ctr {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background-color: #00B2A9;
// }

// h1 {
//     display: flex;
//     margin: 0 auto;
//     padding: 23px;
//     background-color: white;
// }

// #homepage {
//     grid-column: 1;
//     font-weight: 600;
//     font-size: xx-large;
//     color: #00B2A9;
// }

// span {
//     justify-content: space-evenly;
//     grid-column-start: 2;
//     color: white;
//     font-family: 'Commissioner', sans-serif;
// }

// header {
//     display: inline-grid;
//     grid-column-start: 2;
//     background-color: #00B2A9;
//     border: 5px solid white;
// }

// .logo {
//     position: relative;
//     top: 0;
//     left: 0;
//     background: white;
// }

// div {
//     display: inline-block;
//     font-size: 25px;
//     margin: 10px;
//     color: #FFFFFF;
//     padding: 10px;
//     grid-row-end: span 2;
// }

// .events {
//     background-color: white;
//     height: 75%;
//     width: 75%;
//     position: absolute;
//     right: 0;
// }

// .grid {
//     display: grid;
//     grid-template-columns: repeat(8, 1fr);
//     grid-template-rows: repeat(8, 5vw);
//     grid-gap: 15px;
// }

// footer {
//     grid-column-end: span 2;
// }

// /* #allSportsList{
//     display: grid;
//     max-width: 75%; 
// }*/

// a {
//     color: white;
//     text-decoration: none;
//     order: 5;
// }

// .links {
//     position: relative;
//     display: inline-block;
//     padding: 1em;
//     display: flex;
//     justify-content: center;
// }

// select {
//     padding:1em;
// }

// select option {
//     padding:1em;
// }

// .search {
//     display: flex;
//     flex-wrap: wrap;
// }

// .search .search-result {
//     background-color: #fafafa;
//     text-align: center;
//     border:1px solid #bdbdbd;
//     border-radius: 4px;
//     width: 60%;
//     margin: 1em auto;
// }

// .teamsList {
//     list-style-type: none;
// }

// /* trying to style the dropdown nav */

// .dropdown-content {
//   display: none;
//   position: absolute;
//   background-color: #f9f9f9;
//   min-width: 160px;
//   box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
//   z-index: 1;
// }

// .dropdown-content a {
//     float: none;
//     color: black;
//     padding: 12px 16px;
//     text-decoration: none;
//     display: block;
//     text-align: left;
//   }

