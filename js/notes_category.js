

export function makeCategoryItem(options) {
    const catItem = document.createElement('div');
    catItem.classList.add('items-category__item');

    catItem.insertAdjacentHTML('afterbegin', `
        <div class="items-category__logo _icon-${options.icon}"></div>
        <div class="items-category__content">
            <div class="items-category__text name-first _big-category-column">${options.category}</div>
            <div class="items-category__text text _small-category-column">${options.active || 0}</div>
            <div class="items-category__text text _medium-category-column">${options.archive || 0}</div>
        </div>
    `)

    options.container.append(catItem)
}

export function categoryChecker(options) {
    const categoryContainer = document.querySelector(`[${options.container}]`);
    const categoryArray = options.categoriesArray;
    const iconsArray = options.iconsArray;
    categoryContainer.innerHTML = '';

    const activeBlock = document.querySelector('[data-active-notes]');
    const archiveBlock = document.querySelector('[data-archive]');

    const activeResult = notesCounter(activeBlock)
    const archiveResult = notesCounter(archiveBlock)

    categoryArray.forEach(item => {
        if (activeResult[item] || archiveResult[item]) {
            const icon = iconsArray[categoryArray.indexOf(item)]

            makeCategoryItem({
                icon: icon,
                category: item,
                active: activeResult[item],
                archive: archiveResult[item],
                container: categoryContainer,
            })
        }
    });
}

function notesCounter(block) {
    const notesArray = block.querySelectorAll('[data-note-item]')
    const resultObject = {}

    notesArray.forEach(item => {
        const category = item.querySelector('[data-category]').textContent;
        resultObject[category] ? resultObject[category]++ : resultObject[category] = 1
    })

    return resultObject
}

