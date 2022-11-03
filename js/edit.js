document.addEventListener("DOMContentLoaded", () => {
  let editPageWrapper = document.querySelector(".edit-page-wrapper");
  let delBtn = document.querySelectorAll(".delete");
  let editBtn = document.querySelector(".edit");
  let modalBody = document.querySelector(".modal-body");
  let modalBodyForm = document.querySelector(".modal-form");
  let exitModal = document.querySelector(".fa-xmark");
  let editTitle = document.querySelector(".edit-title");
  let editPost = document.querySelector(".edit-post");
  let submitBtn = document.querySelector(".submit-btn");
  let postFragment = document.createDocumentFragment();
  let userId = localStorage.getItem("userId");
  // console.log(userId);
  async function usersPosts() {
    const data = await fetch(`https://dummyjson.com/posts/user/${userId}`);
    const { posts } = await data.json();
    console.log(posts);
    posts.forEach((posts) => {
      postsUI(posts);
      // console.log(posts.id);
    });
    editPageWrapper.append(postFragment);

    editPageWrapper.addEventListener("click", (e) => {
      if (e.target.classList[1] === "fa-trash") {
        // console.log(e.target.classList[1]);
        console.log(e.posts);
        posts.forEach((posts) => {
          console.log(posts.id);
        });
      }
    });

    async function postId(a) {
      const data = await fetch(`https://dummyjson.com/posts/user/${userId}`);
      const { posts } = await data.json();

      console.log(posts[a].id);
    }
    postId(0);
    editPageWrapper.addEventListener("click", (e) => {
      if (e.target.classList[1] === "fa-pen") {
        modalBody.classList.remove("hidden");
      }
    });
  }
  usersPosts();

  function postsUI(posts) {
    let postWrapper = document.createElement("div");
    postWrapper.classList.add("post-wrapper", "ip-wrapper");

    let pWrapper = document.createElement("div");
    pWrapper.className = "p-wrapper";

    let postTitle = document.createElement("h2");
    postTitle.className = "post-title";
    postTitle.textContent = posts.title;
    // console.log(postWrapper);

    let postText = document.createElement("p");
    postText.className = "post-txt";
    postText.textContent = posts.body;

    let iconWrapper = document.createElement("div");
    iconWrapper.className = "icon-wrapper";

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash", "delete");
    // deleteIcon.setAttribute('onclick', postId())

    let editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen", "edit");

    pWrapper.append(postTitle, postText);
    iconWrapper.append(editIcon, deleteIcon);
    postWrapper.append(pWrapper, iconWrapper);
    postFragment.append(postWrapper);
  }

  // delBtn.addEventListener("click", () => {
  //   console.log("del");
  //   async function callAPI() {
  //     const data = await fetch(
  //       `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`,
  //       {
  //         method: "PUT",
  //       }
  //     );
  //   }
  // });

  exitModal.addEventListener("click", () => {
    modalBody.classList.add("hidden");
  });
});
