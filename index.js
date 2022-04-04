let url = 'http://167.172.42.239:1337/api/movies'
const table = document.querySelector('tbody')
const searchBar = document.getElementById('search')

// Get data from the server

const getData = url => {
  try {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        displayMovies(data.data)
        sortByYear(data.data)
        sortByName(data.data)
        sortByRating(data.data)
        moviesIn(data.data)
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

// Movie

const moviesIn = data => {
  const trs = document.querySelectorAll('tbody tr')

  trs.forEach(tr => {
    tr.addEventListener('click', e => {
      const movieTitle = e.target.parentNode.children[0].textContent

      filteredData = data.filter(item => {
        return item.attributes.title.toLowerCase() === movieTitle.toLowerCase()
      })

      let title = filteredData.map(item => item.attributes.title)

      localStorage.setItem('MovieTitle', title)

      window.location.replace('http://127.0.0.1:5500/view.html')
    })
  })
}
