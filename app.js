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
const TEAM_ID_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/lookupteam.php?id=`
const NEXT_FIVE_TEAM_EVENTS_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/eventsnext.php?id=133602` //this is set to Liverpool already...needs to be dynamic and the filter needs to be passed in via a search value
const ALL_SPORTS_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/all_sports.php`
const ALL_LEAGUES_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/all_leagues.php`
const ALL_TEAMS_IN_LEAGUE_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/search_all_teams.php?l=`
const LIVE_SOCCER_SCORES_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/latestsoccer.php`
const EVENTS_ON_TV = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/eventstv.php?`



let body = document.querySelector('body')
let section = document.querySelector('section')
let soccer = document.querySelector('#soccer')
let leagues = document.querySelector('#leaguesList')
let team = document.querySelector('.team')
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
// liveSoccerScores()

// this stopped display at 10pm and is now throwing an error "cannot read property length"...looks like the erray is empty now...
// switch statement / do while loop to correct the "no current games" scenario


const allSportsList = async () => {
    try{
        const response = await axios.get(ALL_SPORTS_URL)
        let sportsList = response.data.sports
        let sportDiv = document.createElement('div')
        sportDiv.classList.add('sportDiv')
        // console.log(sportsList)
        for (let s = 0; s < sportsList.length; s++){
            let sportTab = document.createElement('div')
            let title = document.createElement('h2')
            let img = document.createElement('img')
            let description = document.createElement('p')
            let leaguesBtn = document.createElement('button')
            /////// creating elements
            leaguesBtn.innerHTML = 'View Leagues'
            leaguesBtn.classList.add('leaguesBtn')
            sportTab.id = sportsList[s].strSport
            sportTab.classList.add('sportTab')
            img.classList.add('sportImage')
            description.classList.add('summary')
            title.innerText = sportsList[s].strSport
            img.src = sportsList[s].strSportThumb
            description.innerText = sportsList[s].strSportDescription
            /////// detailing elements
            sportTab.addEventListener('mouseover', function(){
                description.style.display = 'block'
                leaguesBtn.style.display = 'block'
            })
            sportTab.addEventListener('mouseout', function(){
                description.style.display = 'none'
                leaguesBtn.style.display = 'none'
            })
            leaguesBtn.addEventListener('click', function(){
                allLeaguesList(sportsList[s].strSport)
            })
            ////// add Event Listeners
            sportTab.appendChild(title)
            sportTab.appendChild(img)
            sportTab.appendChild(description)
            sportTab.appendChild(leaguesBtn)
            sportDiv.appendChild(sportTab)
            ////// adding elements to document
        }
        allSports.appendChild(sportDiv)
    }catch(error){
        console.log(error)
    }
}


const allLeaguesList = async (sport) => {
    console.log(sport)
    allSports.style.display = 'none'
    document.querySelector('.sportDiv').style.display = 'none'
    let leagues = document.querySelector('.leagues')
    leagues.style.display = 'block'
    let leagueTitle = document.createElement('h1')
    leagueTitle.innerText = `${sport}`
    let allLeagues = document.createElement('div')
    allLeagues.classList.add('allLeagues')
    leagues.appendChild(leagueTitle)
    leagues.appendChild(allLeagues)
    try{
        let response = await axios.get(ALL_LEAGUES_URL)
        let leaguesList = response.data.leagues.filter(league => league.strSport === sport && league.strLeague.charAt(0) !== '_')
        console.log(leaguesList)
        leaguesList.forEach(league => {
            let leagueDiv = document.createElement('div')
            leagueDiv.classList.add('leagueDiv')
            let name = document.createElement('h2')
            name.classList.add('leagueName')
            name.innerText = league.strLeague
            leagueDiv.appendChild(name)
            leagueDiv.addEventListener('click', function(){
                teamsInLeague(league.strLeague)
            })
            allLeagues.appendChild(leagueDiv)
        })
    }
    catch(error) {
        console.log(error)
    }
}
// allLeaguesList()





// need to add an event listener for the league that is clicked on => push the string value to the teams_in_league api and take user to teams.html
// on teams.html = list out all teams in that league
// click on team (event listener passes in team ID to get next 5 events api
// -> display the next 5 events in html form pop up, ask them to fill out for email info of those games/reminder


const teamsInLeague = async (name) => {
    document.querySelector('.allLeagues').style.display = 'none'
    let allTeams = document.createElement('div')
    allTeams.classList.add('allTeams')
    let leagueTitle = document.createElement('h1')
    leagueTitle.innerText = `${name}`
    team.appendChild(leagueTitle)
    try {
        let response = await axios.get(ALL_TEAMS_IN_LEAGUE_URL+name)
        let teamsList = response.data.teams
        console.log(teamsList)
        teamsList.forEach(team => {
            let teamDiv = document.createElement('div')
            let teamTitle = document.createElement('h2')
            let teamImg = document.createElement('img')
            teamTitle.innerText = team.strTeam
            teamImg.src = team.strTeamBadge
            teamDiv.appendChild(teamTitle)
            teamDiv.appendChild(teamImg)
            teamDiv.addEventListener('click', function(){
                displayTeam(team.idTeam)
            })
            allTeams.appendChild(teamDiv)
        })
    }
    catch(error){
        console.log(error)
    }
    team.appendChild(allTeams)
}
// teamsInLeague()


const displayTeam = async (id) => {
    console.log(id)
    document.querySelector('.allTeams').style.display = 'none'
    try{
        let response = await axios.get(TEAM_ID_URL+id)
        console.log(response.data.teams)
        let teams = response.data.teams[0]
        let teamTitle = document.createElement('h1')
        let teamBanner = document.createElement('img')
        teamBanner.classList.add('teamBanner')
        teamTitle.innerText = teams.strTeam
        teamBanner.src = teams.strTeamBanner
        team.appendChild(teamBanner)
    }
    catch(error){
        console.log(error)
    }
}

// example for trying to make a dynamic 'a' tag
// var img11=document.createElement("a");

// img11.href='http://google.de';
// img11.innerHTML = 'Google';

// document.body.appendChild( img11 );


// TO DO THURSDAY //

/// EVENT LISTENERS / FILTERS ///






// dropdown options from Sports/Leagues/Teams

// sports click -> display today's games for that sport

// Leagues click -> display today's games for that league, take the user to the Teams in that League page, filtered

// teams click -> display that team's next 5 events in same window...



// for homepage...
// this will need a current date injected into the API URL to filter the results correctly..can I do that via a calendar or an HTML form?
// input a calendar? accomplish 2 things: 1. take today's date and push into function/api url below. 2. allow user to choose a date and see what's on tv.

// const eventsToday = () => {
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
// eventsToday()


document.addEventListener('DOMContentLoaded', allSportsList)
