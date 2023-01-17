'use strict';

const select = {
    templateOf: {
        bookTemplate: '#template-book',
    },
    containerOf: {
        bookList: '.books-list',
        bookFilter: '.filters',
        bookImage: 'a.book__image',
        bookRating: '.book__rating__fill',
    },
};

const templates = {
bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.bookTemplate).innerHTML),
};

/*let favoriteBooks = [];
let filters = [];

function renderBooks(){

    for(let bookData in dataSource.books){
        const generatedHTML = templates.bookTemplate(dataSource.books[bookData]);
        let bookElement = utils.createDOMFromHTML(generatedHTML);

        const bookContainer = document.querySelector(select.containerOf.bookList);
        bookContainer.appendChild(bookElement);
    }
}*/

class BooksList {
    constructor() {
        const thisBookList = this;
        thisBookList.favoriteBooks = [];
        thisBookList.filtersCheckBox = [];
        thisBookList.getElements();
        thisBookList.initData();
        thisBookList.initActions();
    }

    initData() {
        const thisBookList = this;
        this.data = dataSource.books;
        for(let bookData of this.data){
            const generatedHTML = templates.bookTemplate(bookData);
            thisBookList.bookElement = utils.createDOMFromHTML(generatedHTML);
            thisBookList.determineRatingBgc(bookData);
            this.bookContainer.appendChild(thisBookList.bookElement);
        }
    }

    getElements() {
        const thisBookList = this;
        thisBookList.bookContainer = document.querySelector(select.containerOf.bookList);
        thisBookList.bookFilterContainer = document.querySelector(select.containerOf.bookFilter);
        thisBookList.bookImageContainer = document.querySelectorAll(select.containerOf.bookImage);
    }

    initActions() {
        const thisBookList = this;
        thisBookList.bookContainer.addEventListener('click', function(event) {
            let book = event.target.offsetParent;
            event.preventDefault();
            if(book.classList.contains('book__image')) {
                book.classList.add('favorite');
                let bookID = book.getAttribute('data-id');
                if (!thisBookList.favoriteBooks.includes(bookID)){
                    thisBookList.favoriteBooks.push(bookID);
                    book.classList.add('favorite');
                } else {
                    thisBookList.favoriteBooks.pop(bookID);
                    book.classList.remove('favorite');
                }
            }
            console.log('thisBookList', thisBookList );
        });

        thisBookList.bookFilterContainer.addEventListener('click', function(event){
            if(event.target.getAttribute('type') == 'checkbox') {
                if(event.target.checked) {
                    thisBookList.filtersCheckBox.push(event.target.getAttribute('value'));
                } else{
                    thisBookList.filtersCheckBox.splice(thisBookList.filtersCheckBox.indexOf(event.target.getAttribute('value')),1);
                }
            }
            thisBookList.filterBooks();
        });
    }

    filterBooks() {
        const thisBookList = this;
        thisBookList.getElements();
        for(let bookData of thisBookList.data){
            let shouldBeHidden = false;

            for(let f of thisBookList.filtersCheckBox){
                if(!bookData.details[f]){
                    shouldBeHidden = true;
                    break;
                }
            }
            for (let i = 0; i < thisBookList.bookImageContainer.length; i++){
                if(thisBookList.bookImageContainer[i].getAttribute('data-id') == bookData.id){
                    if(shouldBeHidden){
                        thisBookList.bookImageContainer[i].classList.add('hidden');
                    } else{
                        thisBookList.bookImageContainer[i].classList.remove('hidden');
                    }
                }
            }
        }
    }

    determineRatingBgc(bookData) {
        const thisBookList = this;
        let ratingContainer = thisBookList.bookElement.querySelector(select.containerOf.bookRating);
        let ratingStyle = '';
        let ratingWidth = bookData.rating * 10;
        if(bookData.rating < 6){
            ratingStyle = 'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%); width:' + ratingWidth + '%';
        }
        if(bookData.rating > 6 && bookData.rating <= 8){
            ratingStyle = 'background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%); width:' + ratingWidth + '%';
        }
        if(bookData.rating > 8 && bookData.rating <= 9){
            ratingStyle = 'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%); width:' + ratingWidth + '%';
        }
        if(bookData.rating > 9){
            ratingStyle = 'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%); width:' + ratingWidth + '%';
        }
        ratingContainer.style.cssText = ratingStyle;
    }
}

/*function initActions() {

    const bookContainer = document.querySelectorAll('a.book__image');

    for (let i = 0; i < bookContainer.length; i++){
        bookContainer[i].addEventListener('dblclick', function(event){
            event.preventDefault();
            let bookID = bookContainer[i].getAttribute('data-id');

            if (!favoriteBooks.includes(bookID)){
                favoriteBooks.push(bookID);
                bookContainer[i].classList.add('favorite');
            } else {
                favoriteBooks.pop(bookID);
                bookContainer[i].classList.remove('favorite');
            }
        console.log('favoriteBooks', favoriteBooks);
        });
    }

    document.querySelector('.filters').addEventListener("click", function(event){

        if(event.target.getAttribute('type') == "checkbox") {
            if(event.target.checked) {
                console.log('checked');
                filters.push(event.target.getAttribute('value'));
            } else{
                filters.splice(filters.indexOf(event.target.getAttribute('value')),1);
                console.log('unchecked');
            }
            console.log('filters', event.target.getAttribute('value'));
            console.log(event.target);
        }
        console.log('filters', filters);
        //event.preventDefault();
        filterBooks();
    });
}


function filterBooks(){
    for(let bookData of dataSource.books){
        const generatedHTML = templates.bookTemplate(dataSource.books[bookData]);
        let shouldBeHidden = false;

        for(let f of filters){
            console.log('f', f);
            console.log('book',bookData.details);
            if(!bookData.details[f]){
                shouldBeHidden = true;
                break;
            }
        }
        const bookContainer = document.querySelectorAll('a.book__image');
        for (let i = 0; i < bookContainer.length; i++){
            if(bookContainer[i].getAttribute('data-id') == bookData.id){
                if(shouldBeHidden){
                    bookContainer[i].classList.add('hidden');
                } else{
                    bookContainer[i].classList.remove('hidden');
                }
            }
        }
    }
}

renderBooks();
initActions();*/

const app = new BooksList();