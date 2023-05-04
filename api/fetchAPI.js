const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const fetchAPI = (apiUrl, apiType, apikey, res) => {
    
     fetch(apiUrl)
        .then(resp => resp.json())
        .then(data => {
            if(data.length > 0){
                fetch(`https://api.openweathermap.org/data/2.5/${apiType}?lat=${data[0].lat}&lon=${data[0].lon}&appid=${apikey}`)
                    .then(resp => resp.json())
                    .then(data => res.send(data))
                    .catch(err => res.send('Error in 2nd fetch: ' + err))
            }
        })
        .catch(err => res.status(400).send('Error fetching api: ' + err));
}

module.exports = {
    fetchAPI: fetchAPI
} 