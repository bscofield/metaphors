fetch('./data.json').then((response) => response.json()).then(metaphors => {
  const index = Math.floor(Math.random() * metaphors.length)
  let current = metaphors[index]

  const hash = window.location.hash
  if (hash !== "") {
    const name = decodeURI(hash.slice(1))
    const candidate = metaphors.find(element => element.name.toLowerCase() === name)
    if (candidate) {
      current = candidate
    }
  }

  document.querySelector("#metaphor h2").innerText = current.name
  document.querySelector("#metaphor a").href = "./#"+current.name.toLowerCase()
  if (current.description) {
    document.querySelector("#metaphor p#description").innerText = current.description
  }

  const touchstones = document.querySelector("#metaphor ul#touchstones");
  touchstones.innerHTML = "";
  if (current.touchstones) {
    for (const item of current.touchstones.sort()) {
      touchstones.innerHTML += "<li>"+item+"</li>"
    }
  }

})
