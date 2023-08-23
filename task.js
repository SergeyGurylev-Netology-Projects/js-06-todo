const tasksList = document.getElementById('tasks__list');

document.getElementById('tasks__add').onclick = (e) => {
    e.preventDefault();

    const inputElement = document.getElementById('task__input');
    if (!inputElement.value) return

    insertCartProductHTML(inputElement.value);
    localStorage_SaveTODO();
    inputElement.value = '';
}

localStorage_RestoreTODO();

function insertCartProductHTML(text) {
    tasksList.insertAdjacentHTML(
        'beforeend', `
        <div class="task">
          <div class="task__title">
            ${text}
          </div>
          <a href="#" class="task__remove">&times;</a>
        </div>`
    );

    tasksList.lastElementChild.onclick = onClickRemoveTask;
}

function onClickRemoveTask(e) {
    if (e.target.classList.contains('task__remove')) e.currentTarget.remove();
    localStorage_SaveTODO();
}

function localStorage_RestoreTODO() {
    const tasksListStorage = JSON.parse(localStorage.getItem('tasksList'));
    if (!tasksListStorage) return;
    tasksListStorage.forEach(el => insertCartProductHTML(el));
}

function localStorage_SaveTODO() {
    const tasksListStorage = [];

    tasksList.querySelectorAll('.task__title').forEach(el => {
        tasksListStorage.push(el.innerText)
    })

    localStorage.setItem('tasksList', JSON.stringify(tasksListStorage));
}
