import { _slideToggle, _slideUp, _slideDown } from "./slide_func.js";
import { makeNoteItem } from "./make_note.js";


function _createFormHTML(options) {
    const createBlock = document.createElement('div');
    createBlock.classList.add('creating');
    createBlock.hidden = 'true';

    createBlock.insertAdjacentHTML('afterbegin',
        `<div class="creating__body">
        <div class="creating__title name-first title">Create Note</div>
        <div class="creating__name">
            <label for="name_creating" class="creating__label-name">Enter the name of note</label>
            <input type="text" id="name_creating" placeholder="Note name" class="creating__input">
        </div>
        <div class="creating__category">
            <label for="select_creating" class="creating__label-select">Choose category of note</label>
            <select class="creating__select" name="" id="select_creating">
                ${_createSelect(options.category)}
            </select>
        </div>
        <div class="creating__text">
            <label class="creating__label" for="textarea_creating">Enter the text of note</label>
            <textarea class="creating__textarea" name="" id="textarea_creating" placeholder="Note text"></textarea>
        </div>
        <div class="creating__buttons">
            <button type="button" class="creating__button" data-btn="ok">Ok</button>
            <button type="button" class="creating__button creating__button_red" data-btn="close">Cancel</button>
        </div>
    </div>`)

    return createBlock
}

export function creatingNoteForm(options) {
    const createBlock = _createFormHTML(options);

    const categories = options.category;
    const icons = options.icons;

    document.querySelector('[data-active-notes]').after(createBlock);
    let editing = false;
    let editCallback = null;

    const methods = {
        open() {
            _slideDown(createBlock)
        },
        close() {
            _slideUp(createBlock)
            setTimeout(() => {
                methods.reset()
            }, 500);
        },
        toggleSlide() {
            if (createBlock.hidden) {
                methods.open();
            } else {
                if (!editing) {
                    methods.close();
                } else if (editing) {
                    methods.close();

                    const editingNote = document.querySelector('._editing');
                    editingNote.classList.remove('_editing');

                    editCallback = null;
                    editing = false;
                }
            }
        },
        creating() {
            const checkedIndex = select_creating.selectedIndex;
            const category = categories[checkedIndex];
            const icon = icons[checkedIndex];
            const nameNote = name_creating.value;
            const text = textarea_creating.value;

            makeNoteItem({
                icon: icon,
                name: nameNote,
                text: text,
                category: category,
                edit: methods.setContent,
            })
        },
        setContent(inpValue, repeatClick, noteRemove) {
            if (repeatClick) {
                methods.close()
                editing = false
                editCallback = null;
            } else {
                editCallback = noteRemove;
                editing = true;

                select_creating.selectedIndex = categories.indexOf(inpValue.category);
                name_creating.value = inpValue.name;
                textarea_creating.value = inpValue.text;

                methods.open()
            }
        },
        reset() {
            select_creating.selectedIndex = 0;
            name_creating.value = '';
            textarea_creating.value = '';
        }
    }

    const listener = event => {
        if (event.target.dataset.btn === 'ok') {
            if (!editing) {
                methods.creating();
                methods.close();
            } else if (editing) {
                methods.creating();
                methods.close();
                editCallback()

                editCallback = null;
                editing = false;
            }
        } else if (event.target.dataset.btn === 'close') {
            if (!editing) {
                methods.close();
            } else if (editing) {
                methods.close();

                const editingNote = document.querySelector('._editing');
                editingNote ? editingNote.classList.remove('_editing') : null;

                editCallback = null;
                editing = false;
            }
        }
    }

    createBlock.addEventListener('click', listener)

    return methods
}


function _createSelect(options) {
    let str = '';
    options.forEach((item, i) => {
        if (i === 0) {
            str += `<option value="${item}" selected>${item}</option>`;
        } else {
            str += `<option value="${item}">${item}</option>`;
        }
    });

    return str
}
