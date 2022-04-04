let url = 'http://167.172.42.239:1337/api/movies'
const table = document.querySelector('tbody')
// Get data from the server

const getData = url => {
  try {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        displayMovies(data.data)
        sortByYear(data.data)
        sortByName(data.data)
        sortByRating(data.data)
      })
  } catch (err) {
    console.log(err.message)
  }
}
getData(url)

// Display data on the table

const displayMovies = data => {
  table.innerHTML = ''

  data.forEach(item => {
    const tr = table.insertRow()

    const td1 = tr.insertCell()
    td1.textContent = item.attributes.title

    const td2 = tr.insertCell()
    td2.textContent = item.attributes.year

    const td3 = tr.insertCell()
    td3.textContent = item.attributes.IMDbRating
  })
}

// Search

const searchBar = document.getElementById('search')

searchBar.addEventListener('keyup', e => {
  let searchQuery = e.target.value

  url += `?&filters[title][$containsi]=${searchQuery}`
  getData(url)
})

// Sort by year

const sortByYear = data => {
  const btn = document.getElementById('sortByYear')

  btn.addEventListener('click', () => {
    displayMovies(
      (data = data.sort((a, b) =>
        b.attributes.year > a.attributes.year ? 1 : -1
      ))
    )
  })
}

// Sort by name

const sortByName = data => {
  const btn = document.getElementById('sortByName')

  btn.addEventListener('click', () => {
    displayMovies(
      (data = data.sort((a, b) =>
        a.attributes.title > b.attributes.title ? 1 : -1
      ))
    )
  })
}

// Sort by name

const sortByRating = data => {
  const btn = document.getElementById('sortByRating')

  btn.addEventListener('click', () => {
    displayMovies(
      (data = data.sort((a, b) =>
        b.attributes.IMDbRating > a.attributes.IMDbRating ? 1 : -1
      ))
    )
  })
}
