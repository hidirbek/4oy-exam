document.addEventListener("DOMContentLoaded", async () => {
  let wrapper = document.querySelector(".wrapper");
  let elPrevBtn = document.querySelector(".prev");
  let elNextBtn = document.querySelector(".next");
  let postFragment = document.createDocumentFragment();

  let skip = 0;
  let limit = 10;

  elPrevBtn.addEventListener("click", async () => {
    skip -= limit;
    if (skip === 0) {
      elPrevBtn.setAttribute("disabled", true);
    }
    callAPI();
  });

  elNextBtn.addEventListener("click", async () => {
    elPrevBtn.removeAttribute("disabled");
    skip += limit;
    callAPI();
  });

  let token = localStorage.getItem("access_token");
  if (token) {
    let registerBtn = document.querySelector('.register-btn');
    let navList = document.querySelector(".nav-list");
    let navItem = document.createElement("li");
    let editLink = document.createElement("a");
    editLink.textContent = "Edit posts";
    editLink.href = "/pages/edit-post.html";
    navItem.append(editLink);
    navList.append(navItem);
    callAPI();
    registerBtn.classList.add('hidden');
  } else {
    // location.reload();
    callAPI();
  }

  async function callAPI() {
    const data = await fetch(
      `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`,
      {
        method: "GET",
      }
    );

    const { posts } = await data.json();
    posts.forEach((posts) => {
      postsUI(posts);
      // console.log(posts.title);
    });
    wrapper.innerHTML = "";
    wrapper.append(postFragment);
  }

  function postsUI(posts) {
    let postWrapper = document.createElement("div");
    postWrapper.className = "post-wrapper";

    let postTitle = document.createElement("h2");
    postTitle.className = "post-title";
    postTitle.textContent = posts.title;
    // console.log(postWrapper);

    let postText = document.createElement("p");
    postText.className = "post-txt";
    postText.textContent = posts.body;

    let comment = document.createElement("p");
    comment.className = "comment";

    let comAuthor = document.createElement("p");
    comAuthor.className = "comment";

    postWrapper.append(postTitle, postText, comment, comAuthor);
    postFragment.append(postWrapper);
  }
});
