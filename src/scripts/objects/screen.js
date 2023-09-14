const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                            <div class="data">
                                <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                <p>Seguidores: ${user.followers}</p>
                                <p>Seguindo: ${user.following}</p>
                            </div>
                        </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a> <span>🍴${repo.forks} ⭐${repo.stargazers_count} 👀${repo.watchers} 👨‍💻${repo.language ?? 'Não possui linguagem'}</span></li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                           </div>`
        }

        let eventItens = ''
        user.events.forEach(event => {
            if(event.type === 'PushEvent') {
                eventItens += `<li><p>${event.repo.name}<span> - ${event.payload.commits[0].message}</span></p></li>`
            } else if(event.type === 'CreateEvent') {
                eventItens += `<li><p>${event.repo.name}<span> - ${event.payload.ref_type}</span></p></li>`
            }
        })

        if(user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events">
                                                <h2>Eventos</h2>
                                                <ul>${eventItens}</ul>
                                           </div>`
        } else {
            this.userProfile.innerHTML += `<div class="events">
                                                <h2>Eventos</h2>
                                                <h3>Este usuário não possui eventos 😢</h3>
                                           </div>`
        }
    },

    ValidateNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }