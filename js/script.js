// const RENDER_EVENT = 'render-bukus';
// const SAVED_EVENT = 'saved-bukus';
// const STORAGE_KEY = 'LIBRARY-APP';
const books = [];
// const 
const addClasses = (el, ...classes) => {
    classes.forEach((val)=>{
        el.classList.add(val)
    })
    return el
}
const addAttribute = (el,att,val) => {
    el.setAttribute(att, val)
    return el
}
const canRenderUINotification = () => ({
    renderToast: (message) => {
        const container = addAttribute(addClasses(document.createElement('div'),
        'flex', 'items-center', 'w-max', 'p-4', 'mb-4', 
        'text-gray-500', 'bg-white', 'rounded-lg','shadow', 'border-2', 
        'border-black', 'fixed', 'animate-geser'),'id','toast')
        const containerCheckList = addClasses(document.createElement('div'),
        'inline-flex','items-center','justify-center', 'w-8', 'h-8', 
        'text-green-500', 'bg-green-100', 'rounded-lg')
        const checkList = addClasses(document.createElement('i'),
        'fa-solid', 'fa-check')
        containerCheckList.appendChild(checkList)
        const containerTextNotif = addClasses(document.createElement('div'), 
        'mx-3', 'text-sm', 'font-normal', 'text-black')
        containerTextNotif.textContent = message
        const buttonDeleteToast = addAttribute(addClasses(document.createElement('div'),
        'ml-auto', '-mx-1.5', '-my-1.5', 'bg-white', 'text-gray-400', 
        'hover:text-gray-900', 'rounded-lg', 'focus:ring-2', 
        'focus:ring-gray-300', 'p-1.5', 'hover:bg-gray-100', 'hover:border-2', 
        'hover:border-black', 'inline-flex', 'h-8', 'w-8', 
        'justify-center', 'items-center'),'type','button')
        const xMark = addClasses(document.createElement('i'),
        'fa-solid', 'fa-xmark')
        buttonDeleteToast.appendChild(xMark)
        book().addEventListenerToElement(buttonDeleteToast, 'click', function(e){
            document.body.removeChild(document.body.querySelector('#toast'))
        })
        container.append(containerCheckList, containerTextNotif, buttonDeleteToast)
        document.body.appendChild(container)
    }
})
const canCheckAndLoadOrSaveToStorage = key => ({
    isStorageExistOnBrowser: () => {
        if(typeof (Storage) == undefined) return false
        return true
    },
    saveDataToStorage: () => {
        if(book().isStorageExistOnBrowser()){
            const parsedStringBook = JSON.stringify(book(books).returnBook());
            localStorage.setItem(key, parsedStringBook);
            // book().renderStorage()
        }
    },
    loadDataBookFromStorage: () => {
        if(book().isStorageExistOnBrowser()){
            if(JSON.parse(localStorage.getItem(key)).length != 0){
                books.splice(0, books.length)
                for(const objectBook of JSON.parse(localStorage.getItem(key))){
                    book().addBook(objectBook.id, objectBook.titleBook, objectBook.authorBook, 
                        objectBook.typeBook, objectBook.pagesBook, objectBook.editionBook, 
                        objectBook.isReaded)
                }
                return true
            } else {
                return false
            }
        } else {
            return 0
        }
    }
})
const canRenderBook = () => ({
    renderBook: ()=>{
        document.dispatchEvent(new Event('render_book'))
    },
    renderStorage: () => {
        if(location.pathname == '/rak-buku'){
            document.dispatchEvent(new Event('render-storage'))
        }
    }
})
const canAddEventListenerToElement = () => ({
    addEventListenerToElement: (element, event, callback)=>{
        element.addEventListener(event, callback)
    }
})
const canMoveDataToOtherTable = () => ({
    moveToFinished: (bookId)=>{
        console.log(bookId)
        books[book(books).returnIndexBook(bookId)].isReaded = true
        book().saveDataToStorage()
        book().renderBook()
        book().renderToast('Anda sukses memindahkan buku ke rak sudah selesai dibaca!')
    }, moveToUnFinished: (bookId)=>{
        books[book(books).returnIndexBook(bookId)].isReaded = false
        book().saveDataToStorage()
        book().renderToast('Anda sukses memindahkan buku ke rak belum selesai dibaca!')
        book().renderBook()
    }
})
const canResetElementInput = () => ({
    resetElementInput: (...element)=>{
        for(const index in element){
            element[index].value = ''
        }
    }
})
const canConvertToTableData = () => ({
    convertToTableData: (bookObject) => {
        const tableRow = addAttribute(addClasses(document.createElement('tr'), 'bg-white', 'border-b'), 'id', bookObject.id)
        for(const prop in bookObject){
            if(prop == 'id'){
                continue
            } else {
                if(prop == 'isReaded'){
                    break
                }
                let tableDataTemp = addAttribute(addClasses(document.createElement('td'),'px-6', 'py-4', 'font-medium', 'text-gray-900', 'whitespace-nowrap'), 'scope','row')
                tableDataTemp.textContent = bookObject[prop]
                tableRow.appendChild(tableDataTemp)
            }
        }
        if(bookObject.isReaded == false){
            const buttonReadTheEnd = addAttribute(addClasses(document.createElement('button'),'p-2', 'bg-gray-50', 'rounded', 'border-2', 'border-black'), 'type','button')
            const buttonDeleteBook = addAttribute(addClasses(document.createElement('button'),'p-2', 'bg-gray-50', 'rounded', 'border-2', 'border-black','ml-2'), 'type','button')
            let tableDataTemp = addAttribute(addClasses(document.createElement('td'),'px-6', 'py-4', 'font-medium', 'text-gray-900', 'whitespace-nowrap'), 'scope','row')
            buttonReadTheEnd.textContent = 'Finished'
            buttonDeleteBook.textContent = 'Delete'
            book().addEventListenerToElement(buttonReadTheEnd, 'click', function(e){
                book().moveToFinished(tableRow.id)
            })
            book().addEventListenerToElement(buttonDeleteBook, 'click', function(e){
                book().slicingBook(tableRow.id)
            })
            tableDataTemp.appendChild(buttonReadTheEnd)
            tableDataTemp.appendChild(buttonDeleteBook)
            tableRow.appendChild(tableDataTemp)
        } else {
            const buttonUndoToUnfinished = addAttribute(addClasses(document.createElement('button'),'p-2', 'bg-gray-50', 'rounded', 'border-2', 'border-black'), 'type','button')
            const buttonDeleteBook = addAttribute(addClasses(document.createElement('button'),'p-2', 'bg-gray-50', 'rounded', 'border-2', 'border-black','ml-2'), 'type','button')
            let tableDataTemp = addAttribute(addClasses(document.createElement('td'),'px-6', 'py-4', 'font-medium', 'text-gray-900', 'whitespace-nowrap'), 'scope','row')
            buttonUndoToUnfinished.appendChild(addClasses(document.createElement('i'),'fa-solid','fa-rotate-left'))
            buttonDeleteBook.textContent = 'Delete'
            book().addEventListenerToElement(buttonUndoToUnfinished, 'click', function(e){
                book().moveToUnFinished(tableRow.id)
            })
            book().addEventListenerToElement(buttonDeleteBook, 'click', function(e){
                book().slicingBook(tableRow.id)
            })
            tableDataTemp.appendChild(buttonUndoToUnfinished)
            tableDataTemp.appendChild(buttonDeleteBook)
            tableRow.appendChild(tableDataTemp)
        }
        return tableRow
    }
})
const book = (state = {}) =>{
    const self = {state:state, key:'LIBRARY-APP'}
    const genericBehavior = (self) => ({
        addBook: (id, titleBook, authorBook, typeBook, pagesBook, editionBook, isReaded) => {
            books.push({id, titleBook, authorBook, typeBook, pagesBook, editionBook, isReaded})
            book().saveDataToStorage()
            book().renderToast('Anda sukses untuk menambahkan buku!')
            book().renderBook()
            book().resetElementInput(TitleBook, AuthorBook, TypeBook, PagesBook, EditionBook)
        },
        returnBook: function(bookId = null){
            if(self != null){
                if(bookId == null || bookId == '' || bookId == undefined) return self
                for(const index in self){
                    if(bookId == self[index].id){
                        return self[index]
                    }
                }
            }
            return false
        },
        returnIndexBook: (bookId) => {
            if(self != null){
                if(bookId == null || bookId == '' || bookId == undefined) return self;
                for(const index in self){
                    if(self[index].id == bookId){
                        return index
                    }
                }
                return 0
            }
            return false
        }, slicingBook: (bookId)=>{
            const bookIndex = book(books).returnIndexBook(bookId)
            books.splice(bookIndex, 1)
            book().saveDataToStorage()
            book().renderToast('Anda sukses menghapus buku dari rak!')
            book().renderBook()
        }

    })
    return Object.assign(self, genericBehavior(self.state), 
                        canRenderBook(), canConvertToTableData(),
                        canResetElementInput(), canAddEventListenerToElement(),
                        canMoveDataToOtherTable(), canCheckAndLoadOrSaveToStorage(self.key),
                        canRenderUINotification());
}
let form = null;
let unFinished = null;
let TitleBook = null;
let AuthorBook = null;
let TypeBook = null;
let PagesBook = null;
let EditionBook = null;
let IsReaded = null;
let finished = null;
document.addEventListener('render-storage',function(){
    if(book().loadDataBookFromStorage() ){
        book().renderBook()
        book().renderToast('Data Anda diweb storage berhasil dikembalikan!')
    } else if( book().loadDataBookFromStorage() == false){
        book().renderToast('Data Anda diweb storage kosong, tambahkan data!')
    } else {
        book().renderToast('Web anda tidak mendukung web storage!')
    }
})
document.addEventListener('render_book', function () {
    const newTBodyUnFinished = document.createElement('tbody');
    const newTBodyFinished = document.createElement('tbody');
    for(const index in book(books).returnBook()){
        if(books[index].isReaded == false){
            let tableRow = book().convertToTableData(books[index])
            newTBodyUnFinished.appendChild(tableRow)
        } else {
            let tableRow = book().convertToTableData(books[index])
            newTBodyFinished.appendChild(tableRow)
        }
    }
    unFinished.replaceChild(newTBodyUnFinished, unFinished.querySelector('tbody'))
    finished.replaceChild(newTBodyFinished, finished.querySelector('tbody'))
});

const mainPage = document.querySelector('.main-page');
const config = { attributes: true, childList: true, subtree: true };
const observer = new MutationObserver(function(list, obs){
    for(const mutation of list) {
        if (mutation.type === 'childList') {
            try{
                if(mutation.addedNodes[0].classList.contains('rak-buku') != undefined){
                    form = mutation.addedNodes[0].querySelector('#form')
                    bodyContent = mutation.addedNodes[0].querySelector('.body-content').classList.add('body-content-rak');
                    unFinished = mutation.addedNodes[0].querySelector('#unfinished')
                    TitleBook = mutation.addedNodes[0].querySelector('#title')
                    AuthorBook = mutation.addedNodes[0].querySelector('#author')
                    TypeBook = mutation.addedNodes[0].querySelector('#type')
                    PagesBook = mutation.addedNodes[0].querySelector('#pages')
                    EditionBook = mutation.addedNodes[0].querySelector('#edition')
                    finished = mutation.addedNodes[0].querySelector('#finished')
                    book().renderStorage()
                    form.addEventListener('submit',function(e){
                        e.preventDefault();
                        e.stopPropagation()
                        book().addBook(new Date().getTime(),TitleBook.value,AuthorBook.value,TypeBook.value,PagesBook.value,EditionBook.value, false)
                    }, false)
                } else {
                    form = null;
                    books = null;
                    TitleBook = null;
                    AuthorBook = null;
                    TypeBook = null;
                    PagesBook = null;
                    EditionBook = null;
                    trash = null;
                    bodyContent.classList.remove('body-content-rak');
                    bodyContent = null;
                }
            }catch(e){
            }
        }
    }
});
observer.observe(mainPage,config)
