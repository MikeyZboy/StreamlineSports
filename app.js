//  console.log('This is Working!') <-- confirmed

////**** Streamline Sports ****////

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
let team = document.querySelector('.team')
let allSports = document.querySelector('#sportsList')

////// Functions ///////

const allSportsList = async () => {
    try{
        const response = await axios.get(ALL_SPORTS_URL)
        let sportsList = response.data.sports
        let sportDiv = document.createElement('div')
        sportDiv.classList.add('sportDiv')
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
    allSports.style.display = 'none'
    document.querySelector('.sportDiv').style.display = 'none'
    let leagues = document.querySelector('.leagues')
    leagues.style.display = 'block'
    let leagueTitle = document.createElement('h1')
    leagueTitle.innerText = `${sport}`
    leagueTitle.style.color = `darkslategray`
    let allLeagues = document.createElement('div')
    allLeagues.classList.add('allLeagues')
    leagues.appendChild(leagueTitle)
    leagues.appendChild(allLeagues)
    try{
        let response = await axios.get(ALL_LEAGUES_URL)
        let leaguesList = response.data.leagues.filter(league => league.strSport === sport && league.strLeague.charAt(0) !== '_')
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

const teamsInLeague = async (name) => {
    document.querySelector('.allLeagues').style.display = 'none'
    let allTeams = document.createElement('div')
    allTeams.classList.add('allTeams')
    let leagueTitle = document.createElement('h1')
    leagueTitle.innerText = `${name}`
    leagueTitle.style.color = 'darkslategray'
    team.appendChild(leagueTitle)
    try {
        let response = await axios.get(ALL_TEAMS_IN_LEAGUE_URL+name)
        let teamsList = response.data.teams
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

const displayTeam = async (id) => {
    document.querySelector('.allTeams').style.display = 'none'
    try{
        let response = await axios.get(TEAM_ID_URL+id)
        let teams = response.data.teams[0]
        let teamTitle = document.createElement('h1')
        let teamBanner = document.createElement('img')
        let teamDescription = document.createElement('div')
        let teamWebsite = document.createElement('div')
        teamWebsite.classList.add('teamWeb')
        teamWebsite.innerText = teams.strWebsite
        teamDescription.classList.add('teamDetails')
        teamDescription.innerText = teams.strDescriptionEN
        teamBanner.classList.add('teamBanner')
        teamTitle.innerText = teams.strTeam
        teamBanner.src = teams.strTeamBanner
        teamDescription.appendChild(teamWebsite)
        team.appendChild(teamBanner)
        team.appendChild(teamDescription)
    }
    catch(error){
        console.log(error)
    }
}

//// Event Listeners ////

document.addEventListener('DOMContentLoaded', allSportsList)
