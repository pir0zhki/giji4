//index.html用
const url = "../dataset/dataset.json";//index.htmlからみたpath

function formatJSON(json) {
  console.log(json);

  let html = "";
  for (let data of json.properties) {
    html += `
    <a href="${data.page_path}"><font color="whitesmoke">${data.ivent_title}(${data.Date})</font></a><br>
    `;
  }
  document.getElementById("result").innerHTML = html;
}
window.addEventListener("load", () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => formatJSON(data))
});