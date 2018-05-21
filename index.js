class App = {
    constructor(selectors) {
        this.tasks = []
        this.max = 0
        this.list = document.querySelector(selectors.listSelector)
        this.template = document.querySelector(selectors.templateSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', ev => {
                ev.preventDefault()
                this.handleSubmit(ev)
        })
    }

    removeTask(task, ev) {
        //remove from the DOM
        const item = ev.target.closest('.flick')
        item.remove()

        //remove from the array
        const i = this.flicks.indexOf(flick)
        this.tasks.splice(i, 1)
    }

    favTask(task, ev) {
        const item = ev.target.closest('.task')
        task.fav = item.classList.toggle('fav')
    }

    toggleEditable(task, ev) {
        const item = ev.target.closest('.task')
        const btn = item.querySelector('.taskName')
        const nameField = otem.querySelector('.taskName')

        if (nameFeild.isContentEditable) {
            //make it no longer editable
            nameField.contentEditable = false
            btn.textContent = 'edit'
            btn.classList.remove('success')

            //save changes
            task.name = nameField.textContent
        } else {
            //make is editable
            nameFeild.contentEditable = true
            nameField.focus()
            btn.textContent = 'save'
            btn.classList.add('sucess')
        }
    }

    saveONEnter (task, ev) {
        if (ev.key === 'Enter'){
            this.toggleEditable(flick, ev)
        }
    }
    renderListItem(task){
        const item =this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = task.id
        
        const nameSpan = item.querySelector('.taskName')
        nameSpan.textContent = task.name
        nameSpan.addEventListener(
            'keypress',
            this.saveOnEnter.bind(this, task) 
        )

        item
            .querySelector('.remove.button')
            .addEventListener(
                'click',
                this.removeTask.bind(this, task) 
            )
        item
            .querySelector('.fav.button')
            .addEventListener(
                'click',
                this.favTask.bind(this, task) 
            )
        item
            .querySelector('.edit.button')
            .addEventListener(
                'click',
                this.toggleEditable.bind(this, task) 
            )
        return item
    }

    handleSubmit(ev) {
        const f= ev.target
        const task = {
            id:++this.max, 
            name: f.taskName.value,
            fav: false,
        }

        this.flicks.unshift(task)

        const item = this.renderListItem(task)
        this.list.insertBefore(item, this.list.firstElementChild)
        
        f.reset()
    }, 
}

const app = new App({
    formSelector: '#taskForm',
    listSelector: '#taskList',
    templateSelector: '.task.template',
})