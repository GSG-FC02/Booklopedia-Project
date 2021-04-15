
let save=JSON.parse(localStorage.getItem('savedBooks'))

for(let i=0; i<save.length; i++){
    
    addBooks(save[i])
}
function creatBookContainer(url, name, author, id) {
    let bookContainer = document.createElement("div");
    bookContainer.setAttribute("class", `book-container ${id}`);
    bookContainer.addEventListener("click", addBook);
  
    let bookCover = document.createElement("img");
    bookCover.setAttribute("src", `${url}`);
    bookCover.setAttribute("class", `book-cover  ${id}`);
    bookCover.addEventListener("click", addBook);
  
    let bookName = document.createElement("p");
    bookName.setAttribute("class", `book-name ${id}`);
    bookName.addEventListener("click", addBook);
  
    let bookAuthor = document.createElement("p");
    bookAuthor.setAttribute("class", `book-author ${id}`);
    bookAuthor.addEventListener("click", addBook);
  
    let nameText = document.createTextNode(name);
    let authorText = document.createTextNode(author);
    bookName.appendChild(nameText);
    bookAuthor.appendChild(authorText);
  
    bookContainer.appendChild(bookCover);
    bookContainer.appendChild(bookName);
    bookContainer.appendChild(bookAuthor);
  
    document.querySelector(".books-container").appendChild(bookContainer);
  }

  function addBooks(id){
   fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
   .then(response => {return response.json()})
        .then(data => {
            let cover = data.volumeInfo.imageLinks.thumbnail
        let name = data.volumeInfo.title
        let author = data.volumeInfo.authors[0]
                       if(name.length > 30){
                           name = name.slice(0,30) + "..."       
                        }
                        if(author.length > 15){
                           author = author.slice(0,15) + "..."
                        }
                        creatBookContainer(cover,name,author,id)
              
        })

        
        }
        
    function addBook(event){
            let bookArray = []
            bookArray.push(event.target.className.split(" ")[1])
            console.log(bookArray)
            localStorage.setItem("bookDetails", JSON.stringify(bookArray))
            window.location.href = "..\\Book page\\book.html"}

