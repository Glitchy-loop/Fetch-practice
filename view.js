let title = localStorage.getItem('MovieTitle')
console.log(title)

let url = `http://167.172.42.239:1337/api/movies?&filters[title][$containsi]=${title}`

const table = document.querySelector('tbody')

const getData = url => {
  fetch(url).then(res =>
    res.json().then(data => {
      displayMovies(data.data)
    })
  )
}

getData(url)

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
