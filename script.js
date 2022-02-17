relod:
function setup() {
    getShowsData("https://api.tvmaze.com/shows/82/episodes", (Shows) => {
        appendToOptionShows(Shows);
        getShows(Shows[0].id);
    });
}

function getShows(id) {
    getData(`https://api.tvmaze.com/shows/82/episodes`, (allEpisodes) => {
        makePageForEpisodes(allEpisodes);
        searchTheInput(allEpisodes);
        appendToTheSelect(allEpisodes);
        searchTheInput(allEpisodes);
    });
}

function createElement(tagName, className, parentElement) {
    const element = document.createElement(tagName);
    element.className = className;
    parentElement.appendChild(element);
    return element;
}

const rootElem = document.getElementById("root");
const firstDiv = createElement("div", "navbar", rootElem);
const selectShows = createElement("select", "shows", firstDiv);
const removes = document.querySelector(".shows");
const selectEpisodes = createElement("select", "episodes", firstDiv);
const inputTag = createElement("input", "search-input", firstDiv);
const pLabelTag = createElement("p", "p-label-tag", firstDiv);
const secondDiv = createElement("div", "cards row", rootElem);
rootElem.className = "container";
inputTag.placeholder = "Search episodes..";
removes.remove();
function sortShowsArrayInAlphabetOrder(showsArray) {
    showsArray.sort(function (a, b) {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

function appendToOptionShows(arrayOfShows) {
    sortShowsArrayInAlphabetOrder(arrayOfShows);
    arrayOfShows.forEach((show) => {
        let optionTwo = document.createElement("option");
        optionTwo.text = "Game of Thrones";
        optionTwo.setAttribute("id", `${show.id}`);
        selectShows.appendChild(optionTwo);
    });
}

selectShows.addEventListener("change", checkChoosenShowValue);

function checkChoosenShowValue() {
    const idShow = selectShows.options[selectShows.selectedIndex].id;
    getShows(idShow);
    console.log(idShow);
}

function appendToTheSelect(objectValues) {
    while (selectEpisodes.firstChild) {
        selectEpisodes.firstChild.remove();
    }
    let option = document.createElement("option");
    const getele2= document.querySelector(".episodes")
    getele2.addEventListener("change",function(){
      if (getele2.value=="all-episods"){
      window.location.reload();
    }
    })
  
    // const getele= querySelector("option")
    console.log(option);
    
    option.text = "All episods";
    option.setAttribute("value", "all-episods");
    selectEpisodes.appendChild(option);

    objectValues.forEach((element) => {
        let option = document.createElement("option");
        option.text = element.name + " " + episodeCode(element);
        selectEpisodes.appendChild(option);
        option.setAttribute("value", `${element.id}`);
    });

    selectEpisodes.addEventListener("change", checkChoosenValue);

    function checkChoosenValue(e) {
        // const id = select.options[select.selectedIndex].id
        const id = e.target.value;
        console.log("id", id);
        if (id === "All episods") {
            makePageForEpisodes(objectValues);
        } else {
            const filteredEpisod = filterTheOption(objectValues, id);
            makePageForEpisodes(filteredEpisod);
        }
    }
}

// array and string
//3 things for the function/ input(always a parameter)/ how many parameters and what data types / and output, whic his whatever it returns and the side effect
function filterTheOption(arrayOfEpisods, id) {
    return arrayOfEpisods.filter((episod) => id === episod.id.toString());
}

function searchTheInput(episodsObject) {
    function inputValue() {
        let valueOfFilter = episodsObject.filter((episod) => {
            let lowerCaseSummary = episod.summary.toLowerCase();
            let lowerCaseName = episod.name.toLowerCase();
            let lowerCaseInput = inputTag.value.toLowerCase();
            let episodeCodeowerCase = episodeCode(episod).toLowerCase();
            if (lowerCaseSummary.indexOf(lowerCaseInput) > -1 || lowerCaseName.indexOf(lowerCaseInput) > -1 || episodeCodeowerCase.indexOf(lowerCaseInput) > -1) {
                return true;
            } else {
                return false;
            }
        });
        makePageForEpisodes(valueOfFilter);
        displayPtagValue(valueOfFilter, episodsObject);
    }
    inputTag.addEventListener("input", inputValue);
}

function displayPtagValue(arrayToBeFiltered, wholeArray) {
    pLabelTag.textContent = `Displaying ${arrayToBeFiltered.length}/${wholeArray.length}`;
}

function episodeCode(episodObject) {
    let episodSeason = episodObject.season;
    let episodNumber = episodObject.number;

    episodSeason = episodSeason < 10 ? `0${episodSeason}` : episodSeason;
    episodNumber = episodNumber < 10 ? `0${episodNumber}` : episodNumber;

    return `Season${episodSeason}E${episodNumber}`;
}

function removePtags(objectEpisods) {
    const openingP = objectEpisods.summary.replace(/<p>/g, " ");
    const allPs = openingP.replace(/<\/p>/g, " ");
    return allPs;
}

function makePageForEpisodes(EpisodesList) {
    secondDiv.innerHTML = "";
    displayPtagValue(EpisodesList, EpisodesList);
    // const cardProp = ''
    EpisodesList.forEach((episod) => {
        const mainDiv = createElement("div", "col-12 md-col-6 lg-col-3", secondDiv);
        const wrapDiv = createElement("div", "each-card", mainDiv);
        const imgTag = document.createElement("img");
        imgTag.src = episod.image.medium;
        wrapDiv.appendChild(imgTag);
        const descDiv = createElement("div", "description", wrapDiv);
        const titel = createElement("p", "titel", descDiv);
        const episodsCode = createElement("p", "episode-code", descDiv);
        const summary = createElement("p", "summary", descDiv);
        titel.textContent = episod.name;
        episodsCode.textContent = episodeCode(episod);
        summary.textContent = removePtags(episod);
    });
}

window.onload = setup;
