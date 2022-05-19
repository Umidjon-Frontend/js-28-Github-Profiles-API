const searchInput = document.querySelector(".search__input");
const main = document.querySelector(".main");

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        getUsers(searchInput.value);
        searchInput.value = "";
    }
});

function getUsers(username) {
    fetch(`https://api.github.com/users/${username}`)
        .then((response) => {
            if (response.status === 404) {
                return createErrorElement();
            } else {
                return response.json();
            }
        })
        .then((data) => {
            if (data !== undefined) {
                createHTMLElements(data);
                getRepos(username);
            }
        });
}

function getRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => response.json())
        .then((data) => {
            addReposToCard(data);
        });
}

function createHTMLElements(username) {
    const createHTML = `
    <div class="card">
        <div>
            <img
                class="card__img"
                src=${username.avatar_url}
                alt=${username.name}
            />
        </div>
        <div class="card__info">
            <h2>${username.name}</h2>
            <p>${username.bio}</p>
            <ul class="card__nav">
                <li class="card__item">${username.followers} <strong>Followers</strong></li>
                <li class="card__item">${username.following} <strong>Following</strong></li>
                <li class="card__item">${username.public_repos} <strong>Repos</strong></li>
            </ul>
            <div class="card__repos">
               
            </div>
        </div>
    </div>
    
    `;
    main.innerHTML = createHTML;
}

function addReposToCard(repos) {
    const card__repos = document.querySelector(".card__repos");

    repos.slice(0, 5).forEach((repo) => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;

        card__repos.appendChild(repoEl);
    });
}

function createErrorElement() {
    const createHTML = `
    <div class="error">
        <h1>Not Found</h1>
        <h1>404</h1>
    </div>
    `;
    main.innerHTML = createHTML;
}
