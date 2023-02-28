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

  const concepts = document.querySelector("#metaphor ul#concepts");
  concepts.innerHTML = "";
  if (metaphor.concepts) {
    for (const item of metaphor.concepts.sort()) {
      concepts.innerHTML += `<li>${item}</li>`
    }
  }

  const examples = document.querySelector("#metaphor ul#examples");
  examples.innerHTML = "";
  if (metaphor.examples) {
    document.querySelector("#metaphor #examples-header").classList.remove("hidden")
    for (const item of metaphor.examples.sort()) {
      examples.innerHTML += `<li>${item}</li>`
    }
  } else {
    document.querySelector("#metaphor #examples-header").classList.add("hidden")
  }

  const related = document.querySelector("#metaphor ul#related");
  related.innerHTML = "";
  if (metaphor.related) {
    document.querySelector("#metaphor #related-header").classList.remove("hidden")
    for (const item of metaphor.related.sort()) {
      const key = item.toLowerCase()
      console.log(1, item.toLowerCase(), 2)
      related.innerHTML += `<li><a class="text-sky-600" href="#${key}" onclick='window.location.hash="${key}"; hydrate(); return false'>${item}</a></li>`
    }
  } else {
    document.querySelector("#metaphor #related-header").classList.add("hidden")
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
