// Users
const USERS = [
  { username: 'admin', password: 'admin123' },
  { username: 'student', password: 'student123' }
];

// Articles from localStorage
let ARTICLES = JSON.parse(localStorage.getItem('articles')) || [];

if(ARTICLES.length === 0){
  ARTICLES.push({
    id: 'starter1',
    title: 'Starter: Food Microbiology',
    category: 'Food Microbiology',
    tags: ['fermentation','food-safety'],
    content: 'Fermentation is one of the oldest microbial technologies...',
    created: new Date().toLocaleDateString(),
    published: true
  });
  localStorage.setItem('articles', JSON.stringify(ARTICLES));
}

// Load latest articles
function loadArticles(){
  const container = document.getElementById('articles');
  if(!container) return;
  container.innerHTML='';
  ARTICLES.filter(a=>a.published).forEach(a=>{
    const card = document.createElement('div');
    card.className='article-card';
    card.innerHTML=`<h3>${a.title}</h3><p>Category: ${a.category}</p><p>${a.content.substring(0,100)}...</p><a href='article.html?id=${a.id}'>Read More</a>`;
    container.appendChild(card);
  });
}

// Login
function login(username,password){
  return USERS.some(u=>u.username===username && u.password===password);
}

// Save Article
function saveArticle(article){
  const index = ARTICLES.findIndex(a=>a.id===article.id);
  if(index>=0){
    ARTICLES[index]=article;
  } else {
    ARTICLES.push(article);
  }
  localStorage.setItem('articles', JSON.stringify(ARTICLES));
}

// Get Article by ID
function getArticleById(id){
  return ARTICLES.find(a=>a.id===id);
}

// File upload preview
function previewFile(inputId, previewId){
  const input = document.getElementById(inputId);
  const preview = document.getElementById(previewId);
  if(!input || !preview) return;
  input.addEventListener('change', ()=>{
    const file = input.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = e=>{
        if(file.type.startsWith('image/')){
          preview.innerHTML = `<img src='${e.target.result}' style='max-width:200px'>`;
        } else if(file.type==='application/pdf'){
          preview.innerHTML = `<embed src='${e.target.result}' width='300' height='400' type='application/pdf'>`;
        } else {
          preview.innerHTML = `<p>File selected: ${file.name}</p>`;
        }
      };
      reader.readAsDataURL(file);
    }
  });
}