

// Get the book's id from localStorage
let bookId = JSON.parse(localStorage.getItem('bookDetails'))[0];

//  set localStorage for saved books
let saveArray = localStorage.getItem('savedBooks') ? JSON.parse(localStorage.getItem('savedBooks')) : [];
localStorage.setItem('savedBooks', JSON.stringify(saveArray));

// change button text for saved books
if (JSON.parse(localStorage.getItem('savedBooks')).includes(`${bookId}`)){
    document.querySelector(".save-button").textContent = "Unsave"
}

//  add/remove id of saved book to/from localStorage
document.querySelector(".save-button").addEventListener('click', saveBook)
function saveBook(){
    if (document.querySelector(".save-button").textContent == "Unsave"){
        deleteBook()        
    }
    else{
        addBook()
    }
}
 
function deleteBook(){
    saveArray.splice(saveArray.indexOf(`${bookId}`),1)
    localStorage.setItem('savedBooks',JSON.stringify(saveArray))
    document.querySelector(".save-button").textContent = "Save"
}

function addBook(){
    saveArray.push(`${bookId}`)
    localStorage.setItem('savedBooks',JSON.stringify(saveArray))
    document.querySelector(".save-button").textContent = "Unsave"
}