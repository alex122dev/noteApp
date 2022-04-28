import { _createDateFormat } from './creating_date.js';
import { _findDateInNotes } from './date_in_notes.js';
import { _slideUp, _slideDown, _slideToggle } from './slide_func.js';

function _noteItemHTML(options) {
    const note = document.createElement('div');
    note.classList.add('items-notes__item');
    note.setAttribute('data-note-item', 'true')

    note.insertAdjacentHTML('afterbegin', `
    <div class="items-notes__logo _icon-${options.icon}"></div>
    <div class="items-notes__content">
        <div data-note-name class="items-notes__text name-first _big-column">
        ${options.name || 'no name'}
        </div>
        <div class="items-notes__text text _small-column">${_createDateFormat(new Date())}</div>
        <div data-category class="items-notes__text text _small-column">${options.category}</div>
        <div data-note-text class="items-notes__text text _small-column">${options.text || ''}</div>
        <div class="items-notes__text text _big-column">${_findDateInNotes(options.text) || ''}</div>
    </div>
    <div class="items-notes__manage manage-item manage">
        <button data-btn="edit" type="button" class="manage__btn _icon-pencil"></button>
        <button data-btn="archived" type="button" class="manage__btn _icon-archive"></button>
        <button data-btn="remove" type="button" class="manage__btn _icon-delete"></button>
    </div>`);

    return note
}

export function makeNoteItem(options) {
    const note = _noteItemHTML(options);

    const activeBlock = document.querySelector('[data-active-notes]');
    const archiveBlock = document.querySelector('[data-archive]');

    activeBlock.append(note);
    note.dispatchEvent(new Event('note-created', { bubbles: true }))


    const noteMethods = {
        removeNote() {
            note.remove()
            note.removeEventListener('click', listener)
            document.dispatchEvent(new Event('remove-note', { bubbles: true }))
        },
        archiveNote() {
            note.classList.toggle('_archived');

            if (note.classList.contains('_archived')) {
                archiveBlock.append(note)
            } else {
                activeBlock.append(note)
            }

            note.dispatchEvent(new Event('arch-event', { bubbles: true }))
        }
    }

    const listener = event => {
        const btnType = event.target.dataset.btn;

        if (btnType === 'remove') {
            noteMethods.removeNote()

        } else if (btnType === 'archived') {
            noteMethods.archiveNote()

        } else if (btnType === 'edit' && typeof options.edit === 'function') {
            const noteItems = document.querySelectorAll('[data-note-item]');
            noteItems.forEach(item => item !== note ? item.classList.remove('_editing') : null)
            note.classList.toggle('_editing')

            if (note.classList.contains('_editing')) {
                const categoryValue = note.querySelector('[data-category]');
                const noteNameValue = note.querySelector('[data-note-name]');
                const noteTextValue = note.querySelector('[data-note-text]');

                options.edit({
                    category: categoryValue.textContent.trim(),
                    name: noteNameValue.textContent.trim(),
                    text: noteTextValue.textContent.trim(),
                }, false, noteMethods.removeNote)
            } else if (!note.classList.contains('_editing')) {
                options.edit({}, true)
            }
        }
    }

    note.addEventListener('click', listener);

    return noteMethods
}

//========================================================================================================================================================

export function checkNotesPlace(block, classStr) {
    const checkedBlock = document.querySelector(`[${block}]`);
    const notes = checkedBlock.querySelectorAll('[data-note-item]');

    if (notes.length === 0 && !checkedBlock.hasChildNodes()) {
        const emptyMessage = document.createElement('div');
        emptyMessage.className = classStr;
        emptyMessage.classList.add('text');
        emptyMessage.textContent = 'No notes found';

        checkedBlock.append(emptyMessage)
        //checkedBlock.innerHTML = '<p class="text archive-empty">Archive is empty</p>'
    } else if (notes.length > 0 && checkedBlock.querySelector(`.${classStr}`)) {
        const emptyMessage = checkedBlock.querySelector(`.${classStr}`);

        emptyMessage.remove()
    }
}

export function clearAll(ind) {
    const block = document.querySelector(`[${ind}]`)
    block.innerHTML = '';
}

