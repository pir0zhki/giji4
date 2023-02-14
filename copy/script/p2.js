//json.properties[1]のページ
//page2.html
const url = "../dataset/dataset.json";

function formatJSON(json) {
  console.log(json);

  let html = [];
  for (let data of json.properties) {
    html.push(`<br><h3 class="title">${data.ivent_title}</h3>
    <p>日付:${data.Date}</p>
    <div class="center">
        <img src="${data.image_path}" alt="${data.doc_title}">
        <div id="map"></div>
    </div>
    <p>${data.doc_title}</p>
    
    <p>音声</p>
    <audio controls src="${data.voice_path}"></audio>
    <p>${data.Comment}</p>
    `
  )}document.getElementById("result").innerHTML = html[1];//json.properties[n]のデータ(手動で切り替え)
  console.log(html);
  
}
window.addEventListener("load", () => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => formatJSON(data))
    .then(() => {
      //最初に表示される地図の範囲は手動で最適化して設定
      let lat = 35.6; 
      let lng = 139.72; 
      let zoom = 15; 

      let map = L.map("map", {
        //""
        preferCanvas: true, 
      }); 
      map.setView([lat, lng], zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
      //fetchの中にfetch
      fetch("../dataset/dataset.geojson") 
        .then((response) => response.json())
        .then((data) => {
          L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
              let root = feature.properties;
              let name = root.pic_title;
              layer.bindPopup(name);//clickするとpopup表示
            },
          }).addTo(map);
        });
    });
});
