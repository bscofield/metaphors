let metaphors = []

const hydrate = () => {
  const metaphor = getMetaphor()
  document.querySelector("#metaphor h2").innerText = metaphor.name
  document.querySelector("#metaphor a").href = "./#"+metaphor.name.toLowerCase()
  if (metaphor.description) {
    document.querySelector("#metaphor p#description").innerText = metaphor.description
  } else {
    document.querySelector("#metaphor p#description").innerText = ""
  }

  const touchstones = document.querySelector("#metaphor ul#touchstones");
  touchstones.innerHTML = "";
  if (metaphor.touchstones) {
    for (const item of metaphor.touchstones.sort()) {
      touchstones.innerHTML += "<li>"+item+"</li>"
    }
  }
}

const getMetaphor = () => {
  const hash = window.location.hash
  if (hash !== "") {
    const name = decodeURI(hash.slice(1))
    const candidate = metaphors.find(element => element.name.toLowerCase() === name)
    if (candidate) {
      return candidate
    }
  }

  const index = Math.floor(Math.random() * metaphors.length)
  return metaphors[index]
}

fetch('./data.json').then((response) => response.json()).then(data => {
  metaphors = data
  hydrate()
})
