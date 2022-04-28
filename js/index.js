import { creatingNoteForm } from './creating_form.js';
import { categoryChecker } from './notes_category.js';
import { makeNoteItem } from './make_note.js';
import { clearAll } from './make_note.js';
import { checkNotesPlace } from './make_note.js';
import { _slideUp, _slideDown, _slideToggle } from './slide_func.js';

//! start array
const categoriesArray = ['Task', 'Random Thought', 'Idea', 'Quote', 'Urgently'];
const categoriesIcons = ['tasks', 'thinking', 'idea', 'quote', 'fast'];

const createForm = creatingNoteForm({
    category: categoriesArray,
    icons: categoriesIcons,
})

const startArray = [{
    icon: 'tasks',
    name: 'Go to the shop',
    text: 'By bread, cucumbers, banans, water, potatoes. I have to do shopping either 22.5.2022 or 27/5/22',
    category: 'Task',
    edit: createForm.setContent
},
{
    icon: 'idea',
    name: 'New Feature',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, autem.',
    category: 'Idea',
    edit: createForm.setContent
},
{
    icon: 'thinking',
    name: 'The theory of evolution',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, autem.',
    category: 'Random Thought',
    edit: createForm.setContent
},
{
    icon: 'quote',
    name: 'William Gaddis',
    text: 'Lorem ipsum dolor sit amet, consectetur 16-12-1991 adipisicing elit. Ipsa, autem.',
    category: 'Quote',
    edit: createForm.setContent
},
{
    icon: 'thinking',
    name: 'The theory of evolution',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa, autem.',
    category: 'Random Thought',
    edit: createForm.setContent
},];

startArray.forEach(item => makeNoteItem(item))


categoryChecker({
    container: 'data-category-items',
    categoriesArray: categoriesArray,
    iconsArray: categoriesIcons,
})


//========================================================================================================================================================

//! listeners of document

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn;

    if (btnType === 'create') {
        createForm.toggleSlide(createForm)

    } else if (btnType === 'clear-all') {
        clearAll('data-active-notes');
        clearAll('data-archive');
        checkNotesPlace('data-archive', 'archive-empty')
        checkNotesPlace('data-active-notes', 'active-empty')
        categoryChecker({
            container: 'data-category-items',
            categoriesArray: categoriesArray,
            iconsArray: categoriesIcons,
        })

    } else if (btnType === 'show-archive') {
        const archiveBlock = document.querySelector('[data-archive]');
        //archiveBlock.classList.toggle('_show-archive')

        checkNotesPlace('data-archive', 'archive-empty')
        _slideToggle(archiveBlock)

        const archiveBtn = event.target;
        archiveBtn.classList.toggle('_active')
    }
})

document.addEventListener('note-created', function () {
    //checkNotesPlace('data-archive', 'archive-empty')
    checkNotesPlace('data-active-notes', 'active-empty')
    categoryChecker({
        container: 'data-category-items',
        categoriesArray: categoriesArray,
        iconsArray: categoriesIcons,
    })
})
document.addEventListener('arch-event', function () {
    checkNotesPlace('data-archive', 'archive-empty')
    checkNotesPlace('data-active-notes', 'active-empty')
    categoryChecker({
        container: 'data-category-items',
        categoriesArray: categoriesArray,
        iconsArray: categoriesIcons,
    })
})
document.addEventListener('remove-note', function () {
    checkNotesPlace('data-archive', 'archive-empty')
    checkNotesPlace('data-active-notes', 'active-empty')
    categoryChecker({
        container: 'data-category-items',
        categoriesArray: categoriesArray,
        iconsArray: categoriesIcons,
    })
})

//========================================================================================================================================================

