let state = {
    color: 'blue'
}
//渲染应用
function renderApp() {
    renderHeader();
    renderContent();
}
//渲染 title 部分
function renderHeader() {
    const header = document.getElementById('header');
    header.style.color = state.color;
}
//渲染内容
function renderContent() {
    const content = document.getElementById('content');
    content.style.color = state.color;
}

renderApp();

document.getElementById('to-blue').onclick = function () {
    state.color = 'rgb(0, 51, 254)';
    renderApp();
}
document.getElementById('to-pink').onclick = function () {
    state.color = 'rgb(247, 109, 132)'; 
    renderApp();
}