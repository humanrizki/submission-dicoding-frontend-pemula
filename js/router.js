const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({"pathname":event.target.href},'' ,event.target.href);
    handleLocation()
}
const routes = {
    404:"src/404.html",
    "/":"src/home.html",
    "/rak-buku": "src/rak-buku.html",
}
const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    document.querySelectorAll('.tab-link').forEach(function(el, index){
        el.classList.remove('active-link')
    });
    document.querySelector(`.tab-link[href=\'${path}\']`).classList.add('active-link');
    const html = await fetch(route).then((data) => data.text());
    if(path == '/'){
        document.head.querySelector('title').innerText ='Home'
    } else {
        document.head.querySelector('title').innerText = path.substr(1,path.length).charAt(0).toUpperCase() + path.slice(2)
    }
    document.querySelector(".main-page").innerHTML = html;
}
// window.onpopstate = handleLocation;
window.route = route;

handleLocation()

// document.addEventListener('DOMContentLoaded',function(){
//     window.addEventListener('popstate',function(event){
//         // console.log(event.state)
//         route()
//         // handleLocation()
//     })
// });