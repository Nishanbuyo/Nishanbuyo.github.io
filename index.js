let repo_url;

fetch("https://api.github.com/users/Nishanbuyo")
    .then(response => response.json())
    .then(function (data) {
        console.log(data)
        repo_url = data['repos_url']+"?page=1&per_page=100";
        console.log(repo_url)
        document.getElementById('avatar').src = data['avatar_url']
        document.getElementById('fullName').textContent = data['name']
        document.getElementById('githubLink').href = data['html_url']
        document.getElementById('bio').textContent = data['bio']

        fetch(repo_url)
            .then(response => response.json())
            .then(repo_data => {
                console.log(repo_data)
                repo_data.map(repo => {
                    let dl= document.createElement("dl")
                    let dt = document.createElement("dt");
                    let dd = document.createElement("dd");

                    dt.innerHTML = `${repo.name}`
                    if (repo.description == null) {
                        dd.innerHTML = `Language: ${repo.language} <br> 
                        Repo url: <a href= ${repo.clone_url} target="_blank">${repo.clone_url}</a>`
                    }
                    else {
                        dd.innerHTML = `Repo Description: ${repo.description} <br> Language: ${repo.language} <br> 
                        Repo url: <a href= ${repo.clone_url} target= "_blank">${repo.clone_url}</a>`
                    }

                    dl.appendChild(dt)
                    dl.appendChild(dd)


                    document.getElementById('repolist').appendChild(dl);
                    // document.getElementById('repolist').appendChild(dd);
                })
            })
    })

