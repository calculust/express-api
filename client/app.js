const CHIRPS_CONTAINER = document.querySelector('#chirps-container');

printChirps();

function printChirps() {
    $.ajax({
        url: '/api/chirps',
        type: 'GET'
    })
        .then(data => {
            $("#chirps-container").empty();
            
            const chirps = [];
            for (const key in data) {
                if (key === 'nextid') break;

                chirps.push({ id: key, user: data[key].user, text: data[key].text });
            }

            chirps.forEach(chirp => {
                const card = document.createElement('div');
                card.className = 'card position-relative rounded-3 mb-3';
                const cardClose = document.createElement('button');
                cardClose.className = 'btn-close position-absolute top-0 end-0 p-2';
                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';
                const cardTitle = document.createElement('h5');
                cardTitle.className = 'card-title';
                const cardText = document.createElement('div');
                cardText.className = 'card-text';
                const cardFooter = document.createElement('div');
                cardFooter.className = 'card-footer';
                const cardFooterButton = document.createElement('button');
                cardFooterButton.className = 'btn btn-link p-0';
                cardFooterButton.style = 'font-size: 0.7rem';
                cardFooterButton.setAttribute('data-bs-toggle', 'modal');
                cardFooterButton.setAttribute('data-bs-target', '#modal');
                cardFooterButton.setAttribute('data-type', 'edit');
                cardFooterButton.setAttribute('data-id', chirp.id);
                cardFooterButton.setAttribute('data-user', chirp.user);
                cardFooterButton.setAttribute('data-text', chirp.text);

                cardTitle.textContent = chirp.user;
                cardText.textContent = chirp.text;
                cardFooterButton.textContent = 'Edit';

                card.appendChild(cardClose);
                card.appendChild(cardBody);
                card.appendChild(cardFooter);
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);
                cardFooter.appendChild(cardFooterButton);
                CHIRPS_CONTAINER.appendChild(card);

                // Delete Chrip
                cardClose.addEventListener('click', () => {
                    deleteChirp(chirp.id);
                })
            })
        });
}

function deleteChirp(id) {
    $.ajax({
        url: `/api/chirps/${id}`,
        type: 'DELETE'
    })
        .then(() => {
            printChirps();
        });
}

function addChirp(user, text) {
    $.ajax({
        url: `/api/chirps/`,
        type: 'POST',
        data: { user, text }
    })
        .then(serverResponse => {
            console.log(serverResponse.message);
            printChirps();
        });
}

function editChirp(id, user, text) {
    $.ajax({
        url: `/api/chirps/${id}`,
        type: 'PUT',
        data: { user, text }
    })
        .then(serverResponse => {
            console.log(serverResponse.message);
            printChirps();
        });
}

// Modal Window
let modal = document.getElementById('modal')

// Show
modal.addEventListener('show.bs.modal', function (event) {
    let button = event.relatedTarget;
    let id = button.getAttribute('data-id');
    let type = button.getAttribute('data-type');
    let user = button.getAttribute('data-user');
    let text = button.getAttribute('data-text');

    let modalTitle = modal.querySelector('.modal-title');
    let chirpContent = modal.querySelector('#chirpContent');
    let userInput = modal.querySelector('#user');
    let saveButton = modal.querySelector('#saveButton')

    switch(type) {
        case 'add':
            modalTitle.textContent = 'Add Chirp';
            saveButton.textContent = 'Chirp';

            saveButton.addEventListener('click', () => {
                addChirp(userInput.value, chirpContent.value);
            });
            break;
        case 'edit':
            modalTitle.textContent = 'Edit Chirp'
            userInput.value = user;
            chirpContent.value = text;
            saveButton.textContent = 'Save changes';

            saveButton.addEventListener('click', () => {
                editChirp(id, userInput.value, chirpContent.value);
            });
            break;
    }
    
})

// Hide
modal.addEventListener('hide.bs.modal', function (event) {
    let chirpContent = modal.querySelector('#chirpContent');
    let userInput = modal.querySelector('#user');

    $('#saveButton').replaceWith($('#saveButton').clone());

    setTimeout(() => {
        chirpContent.value = '';
        userInput.value = '';
    }, 1000);
})
