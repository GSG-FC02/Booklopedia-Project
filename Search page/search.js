// Define array with all categories
let categories = ['Science', 'Anthologies', 'Audiobooks', 'Art', 'Biographies', 'Business', 'Children', 'Comics',
'Contemporary', 'Crime', 'Engineering', 'Entertainment', 'Fantasy', 'Fiction', 'Food', 'Health', 'History',
'Horror', 'Literary', 'Literature', 'Manga', 'Media-help', 'Memoirs', 'Mind', 'Mystery', 'Nonfiction', 
'Religion', 'Romance', 'Self', 'Spirituality', 'Sports', 'Superheroes', 'Technology', 'Thrillers', 'Travel',
'Women', 'Adult']

// function to create a container for a category
function createCategory(category){
    let categoryContainer = document.createElement("div")
    categoryContainer.setAttribute("class","category-container")

    let categoryName = document.createElement("p")
    categoryName.setAttribute("class","category-name")
    categoryName.addEventListener('click',addCategory)

    let categoryBooks = document.createElement("div")
    categoryBooks.setAttribute("class","category-books")

    let name = document.createTextNode(category);
    categoryName.appendChild(name)

    document.querySelector(".categories-section").appendChild(categoryContainer)
    categoryContainer.appendChild(categoryName)
    categoryContainer.appendChild(categoryBooks)
}

//  function to create a container for a book in a category container
function createBookContainer1(url,name,author,index,bookId){
    let bookContainer = document.createElement("div")
    bookContainer.setAttribute("class",`book-container ${bookId}`)
    bookContainer.addEventListener('click',addBook)

    let bookCover = document.createElement("img")
    bookCover.setAttribute("src",`${url}`)
    bookCover.setAttribute("class",`book-cover ${bookId}`)
    bookCover.addEventListener('click',addBook)
    
    let bookName = document.createElement("p")
    bookName.setAttribute("class",`book-name ${bookId}`)
    bookName.addEventListener('click',addBook)

    let bookAuthor = document.createElement("p") 
    bookAuthor.setAttribute("class",`book-author ${bookId}`)
    bookAuthor.addEventListener('click',addBook)

    let nameText = document.createTextNode(name);
    let authorText = document.createTextNode(author);

    bookName.appendChild(nameText)
    bookAuthor.appendChild(authorText)

    bookContainer.appendChild(bookCover)
    bookContainer.appendChild(bookName)
    bookContainer.appendChild(bookAuthor)

    document.querySelectorAll(".category-books")[index].appendChild(bookContainer)
}

// function to fetch books details for a category
function addCategoryBooks(category, index){
    createCategory(category)
    fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}`)
    .then(response => {return response.json()})
    .then(data => {
        data.items.forEach(element => {  
            if (element.volumeInfo.hasOwnProperty('imageLinks') 
            && element.volumeInfo.hasOwnProperty('authors')
            && element.volumeInfo.hasOwnProperty('description')){
                let cover = element.volumeInfo.imageLinks.thumbnail
                let name = element.volumeInfo.title
                let author = element.volumeInfo.authors[0]
                let bookId = element.id
                if(name.length > 35){
                    name = name.slice(0, 35) + "..."           
                }
                if(author.length > 25){
                    author = author.slice(0, 25) + "..."
                }
                createBookContainer1(cover,name,author,index,bookId)
            }    
        })
    })
}

//  fetching books for each category 
for(let i=0; i<categories.length; i++){
    addCategoryBooks(categories[i],i)
}
