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
// Ativar a primeira aba por padrão
document.getElementsByClassName("tablink")[0].click();

// Dropdown menu script
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;
for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}

const postForm = document.getElementById('postForm');

const postTitle = document.getElementById('postTitle');
const postContent = document.getElementById('postContent');
const postImage = document.getElementById('postImage');
const alertSuceesso = document.getElementById('Cadastrado')

const postList = document.getElementById('listaPost');

function loadPosts() {
    if (localStorage.getItem('posts').length != 0) {
        const posts = JSON.parse(localStorage.getItem('posts'));
        console.log(posts)
        posts.forEach(post => {
            var inner = `<div class="post" style="background: #505050;width: auto;float: left;padding: 20px;border-radius: 22px;">
                <div style="background: url('${post.files}');width: 200px;height: 200px;background-size: cover;background-position: center;"></div>
                <p style="font-size: 20px;font-weight: bold;margin-bottom: 10px;margin-top: 8px;">${post.title}</p>
                <p>${post.content}</p>    
                </div>                    
                `
            postList.innerHTML += inner
        });
    }
}

loadPosts();

postForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = postTitle.value.trim();
    const content = postContent.value.trim();
    const files = postImage.value.trim();

    if (title && content && files.length > 0) {

        var posts = [];
        if (localStorage.getItem('posts').length != 0) {
            var posts = JSON.parse(localStorage.getItem('posts'));
        }

        posts.push({ title, content, files });
        localStorage.setItem('posts', JSON.stringify(posts));

        alertSuceesso.style.display = "block"

        setTimeout(() => {
            alertSuceesso.style.display = "none"
        },5000)

        postTitle.value = '';
        postContent.value = '';
        files.value = '';

        loadPosts();

    }
});
