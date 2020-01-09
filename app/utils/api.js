const id = '792456e5e86e384f1736',
      sec = 'e4dfd7be599093dfde53ef5e4a8786e15857b501' ,
      params = `?client_id=${id}&client_secret=${sec}`

function getErrorMsg(message, username){
  if (message === 'not found'){
    return `${username} doesn't exist`
  }
}

function getProfile(username){
  return fetch(`https://api.github.com/users/${username}${params}`)
  .then(res => res.json())
  .then(profile => {
    if (profile.message){
      throw new Error(getErrorMsg(profile.message, username))
    }
    
    return profile
  })
}

function getRepos(username){
  return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
  .then(res => res.json())
  .then(repos => {
    if(repos.message){
      throw new Error(getErrorMsg(repos.message, username))
    }
    return repos
  })
}

function getStartCount(repos){
  return repos.reduce((acu, {stargazers_count}) => acu + stargazers_count, 0)
}

function calculateScore(followers, repos){
  return (followers * 3 ) + getStartCount(repos)
}

function getuserData(player){
  return Promise.all([
    getProfile(player),
    getRepos(player)
  ])
  .then(([ profile, repos ]) => {
    return ({
      profile,
      repos,
      score: calculateScore(profile.followers,repos)
    })
  })
}

function sortPlayers(players){
  return players.sort((a, b) => b.score - a.score)
}

export function battle(players){
  return Promise.all([
    getuserData(players[0]),
    getuserData(players[1])
  ]).then(results => sortPlayers(results))
}


export function fetchPopularRepos(language){
  const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=starts:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
  return fetch(endpoint)
  .then(res => res.json())
  .then(data => {
    if(!data.items){
      throw new Error(data.message)
    }

    return data.items
  })
}