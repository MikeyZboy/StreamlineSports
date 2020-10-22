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

//// Declaring Variables ////


const APIKEY = '4013017'
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
let leagues = document.querySelector('.leaguesList')
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
            let leagueTab = document.createElement('li')
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
            console.log(response.data.teams)
        let teamsList = response.data.teams
        for (let t = 0; t < teamsList.length; t++) {
            // let teamIcon = document.createElement('img')
            // teamIcon.innerHTML = <img>${teamsList[t].strTeamBadge}</img>
            let teamTab = document.createElement('li')
            teamTab.className = 'list'
            teamTab.innerText = `${teamsList[t].strTeam}`
            teams.appendChild(teamTab)
        }
        })
    }catch(error){
        console.log(error)
    }
}
teamsInLeague()



// TO DO THURSDAY //

/// EVENT LISTENERS / FILTERS ///

// dropdown options from Sports/Leagues/Teams

// sports click -> display today's games for that sport

// Leagues click -> display today's games for that league, take the user to the Teams in that League page, filtered

// teams click -> display that team's next 5 events in same window...





// html form input from text on aside -> date, team you're looking for?

// calendar onload -> today's date to display today's events?
// could do a form - today is the ""
// what day are you looking for an event?









// for homepage...
// this will need a current date injected into the API URL to filter the results correctly..can I do that via a calendar or an HTML form?
// input a calendar? accomplish 2 things: 1. take today's date and push into function/api url below. 2. allow user to choose a date and see what's on tv.

// const televisedEvents = () => {
//     //console.log('this sucks')
//     try{
//         axios.get(EVENTS_ON_TV)
//         .then(response => {
//             console.log(response)
//         })
//     }catch(error){
//         console.log(error)
//     }
// }
// televisedEvents()
