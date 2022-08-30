let readMoreButtons = document.getElementsByClassName("read-more");

let addToModal = (mainPost) => {
    let img = mainPost.querySelector("img").getAttribute("src");

    let title = mainPost.querySelector("h2");
    let details = mainPost.querySelector("p");
    let dateTagCommentContainer = mainPost.querySelector("small");

    let modalTitle = document.getElementById("modal-title");
    let modalBody = document.getElementById("modal-body");

    modalTitle.innerHTML = `
        <h3 class="fw-semibold text-info post-title mb-0">${title.innerText}</h3>
        ${dateTagCommentContainer.innerHTML}
    `;

    modalBody.innerHTML = `
        <img class="w-100 border border-4 border-secondary" src="${img}" alt="" />
        <div class="bg-secondary p-2">
            <p class=" text-light">${details.innerText}</p>
        </div> 
    `;
};

for (let readMore of readMoreButtons) {
    readMore.setAttribute("data-bs-toggle", "modal");
    readMore.setAttribute("data-bs-target", "#exampleModal");

    readMore.addEventListener("click", function (event) {
        event.preventDefault();

        let postDescription = this.parentNode;
        let mainPost = postDescription.parentNode;

        addToModal(mainPost);
    });
}
