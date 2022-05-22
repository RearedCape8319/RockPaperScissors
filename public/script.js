async function thing(url) {
    const response = await fetch(url);
    const json = await response.json();
    let root = document.getElementById("outputDiv");
    root.innerHTML = "";
    let messageP = document.createElement("p");
    messageP.innerHTML = `<b><u>${json.message}</u></b>`;
    root.appendChild(messageP);
    if (json.choices) {
        let choiceP = document.createElement("p");
        choiceP.innerHTML = `<b>${json.choices[0]} : ${json.choices[1]}</b>`;
        root.appendChild(choiceP);
    }
    if (json.choice) {
        let choiceP = document.createElement("p");
        choiceP.innerHTML = `<b>${json.choice}</b>`;
        root.appendChild(choiceP);
    }
    let linksDiv = document.createElement("div");
    for (let l in json.links) {
        let p = document.createElement("p", l);
        p.innerHTML = `${l}: ${json.links[l]}`;
        root.appendChild(p);
    }
}

thing("/api");