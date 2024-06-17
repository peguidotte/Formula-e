var modal = document.getElementById("loginModal");
var btn = document.getElementById("loginBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const postForm = document.getElementById('postForm');
const postTitle = document.getElementById('postTitle');
const postContent = document.getElementById('postContent');
const postImage = document.getElementById('postImage');
const alertSuceesso = document.getElementById('Cadastrado')
const postList = document.getElementById('listaPost');

function loadPosts() {
    if (localStorage.getItem('posts') && localStorage.getItem('posts').length != 0) {
        const posts = JSON.parse(localStorage.getItem('posts'));
        console.log(posts)
        postList.innerHTML = ""
        var postContainer = document.createElement('div');
        postContainer.className = 'post-container';
        posts.forEach((post, index) => {
            var imageHTML = post.image ? `<div style="background: url('${post.image}')" class="postImage"></div>` : '';
            var inner = `<div class="post" >
                <p class="postTitle">${post.title}</p>
                <p class="postContent">${post.content}</p>
                ${imageHTML}
                <button class="removePost" data-index="${index}">Remove Post</button>    
                </div>                    
                `
            postContainer.innerHTML += inner
        });
        postList.appendChild(postContainer);
        document.querySelectorAll('.removePost').forEach(button => {
            button.addEventListener('click', removePost);
        });
    }
}
loadPosts()

function removePost(event) {
    const index = event.target.getAttribute('data-index');
    var posts = JSON.parse(localStorage.getItem('posts'));
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
}

postForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = postTitle.value.trim();
    const content = postContent.value.trim();
    const image = postImage.value.trim();

    if (title && content) {
        var posts = [];
        if (localStorage.getItem('posts') && localStorage.getItem('posts').length != 0) {
            var posts = JSON.parse(localStorage.getItem('posts'));
        }

        const post = { title, content };
        if (image) {
            post.image = image;
        }

        posts.push(post);
        localStorage.setItem('posts', JSON.stringify(posts));

        alertSuceesso.style.display = "block"

        setTimeout(() => {
            alertSuceesso.style.display = "none"
        },5000)

        postTitle.value = '';
        postContent.value = '';
        postImage.value = '';

        loadPosts();
    }
});


function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}
document.getElementsByClassName("tablink")[0].click();

function toggleDropdown(buttonId, containerId) {
    const dropdownBtn = document.getElementById(buttonId);
    const dropdownContainer = document.getElementById(containerId);

    dropdownBtn.addEventListener('click', () => {
        dropdownContainer.style.display = dropdownContainer.style.display === 'none' ? 'flex' : 'none';
    });
}

toggleDropdown('dropdown-btn-class', 'dropdown-container-class');
toggleDropdown('dropdown-btn-equipes', 'dropdown-container-equipes');

const FormLogin = document.getElementById("emailLoginForm")
FormLogin.addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById("name")
    const email = document.getElementById("email")
    const senha = document.getElementById("password")
    const equipes = document.getElementById("equipes")
    const infoPerfil = document.getElementById("infoPerfil")
    const semLogin = document.getElementById("semLogin")

    console.log(nome.value,email.value,senha.value,equipes.value)

    modal.style.display = "none"
    btn.style.display = "none"
    infoPerfil.innerHTML = `<p>Nome: ${nome.value}</p><p>Equipe: ${equipes.value}</p>`
    semLogin.style.display = "none"
    postForm.style.display = "block"
});