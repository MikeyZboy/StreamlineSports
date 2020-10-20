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
const SEARCH_TEAM_NAME_URL =`https://www.thesportsdb.com/api/v1/json/${APIKEY}/searchteams.php?t=Arsenal`
const NEXT_FIVE_TEAM_EVENTS_URL = `https://www.thesportsdb.com/api/v1/json/${APIKEY}/eventsnext.php?id=133602`

const getEvents = async () => {
    // confirmed with console.log
    try {
        const response = await axios.get(NEXT_FIVE_TEAM_EVENTS_URL)
        console.log(response)
        // buildDropdown(response.data)
        } catch (error) {
            // console.log(error)
        } 
} 
getEvents()


