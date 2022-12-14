let postCollection;

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
        <div class="bg-secondary text-light border-secondary p-2">
            ${details.innerHTML}
        </div> 
    `;
};

let bindEventListener = (post) => {
    let readMoreButtons = document.getElementsByClassName("read-more");

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
};

fetch("./postInfoData.JSON")
    .then((res) => res.json())
    .then((data) => {
        (postCollection = data), displayPost(), displayPopularPost();
    });

let displayPost = (page = 1) => {
    let startIndex = (page - 1) * 2;
    let len = postCollection.length;

    let postBar = document.getElementById("post-bar");
    postBar.innerHTML = "";
    for (let i = startIndex, j = 0; i < len && j < 2; i++, j++) {
        let post = postCollection[i];

        let article = document.createElement("article");

        article.className = "gap-3 p-3 me-2";
        article.innerHTML = `
            <img src="${post.img}" alt="" />
            <div class="description">
                <h2 class="post-title mb-0">
                ${post.title}
                </h2>
                <small class="">
                    <span class="text-muted me-3"
                    ><i class="fas fa-calendar-alt"></i> ${post.date}</span>
                    <span><i class="far fa-folder"></i> ${post.tag}</span>
                    <span class="text-muted ms-3"
                    ><i class="fas fa-comments"></i> ${post.comments} Comments</span>
                </small>
                <p class="mt-3">
                ${post.details} 
                </p>
                <a class="text-decoration-none read-more" href=""
                    ><span class="">Read More </span
                    ><i class="fas fa-angle-right"></i>
                </a>
            </div>
        `;

        postBar.appendChild(article);
    }
    bindEventListener();
};

let displayPopularPost = () => {
    let popularPostContainer = document.getElementById("popular-posts");

    posts = getPopularPosts([...postCollection]);

    let len = Math.min(posts.length, 4);
    for (let i = 0; i < len; i++) {
        let singlePost = posts[i];
        let popularPost = document.createElement("div");

        popularPost.className =
            "popular-single-post d-flex  gap-2 text-secondary";
        popularPost.innerHTML = `
            <div class="w-50">
                <img src="${singlePost.img}" class="img-fluid w-100" alt=""/>
            </div>
            <div class="w-50">
                <h6 class=" post-title">
                    ${singlePost.title}
                </h6>
                <span
                    ><i class="fas fa-calendar-alt me-1"></i>
                    ${singlePost.date}
                </span>
                <br>
                <span
                    ><i class="fas fa-comments"></i>
                    ${singlePost.comments} comments
                </span>
            </div>
        `;
        popularPostContainer.appendChild(popularPost);
    }
};

// sort the posts by COMMENTS
let getPopularPosts = (posts) => {
    return posts.sort(function (a, b) {
        return b.comments - a.comments;
    });
};

// works with pagination
document
    .getElementById("pagination-ul")
    .addEventListener("click", function (event) {
        event.preventDefault();

        let allPaginationButtons =
            document.getElementById("pagination-ul").children;

        if (event.target.getAttribute("id") !== "pagination-ul") {
            // remove active style
            for (let paginationButton of allPaginationButtons) {
                paginationButton.removeAttribute("id");
            }

            event.target.setAttribute("id", "active");
        }

        let page = event.target.innerText;
        if (page == "<") page = 1;
        // first page
        else if (page == ">") page = 5; // last page

        displayPost(parseInt(page));
    });
