const json_data = __DATA__;

const username = json_data['name'];
const cover_img = json_data['cover-image'].includes('http') ? json_data['cover-image'] : `./images/${json_data['cover-image']}`;
const avatar_img = json_data['avatar-image'].includes('http') ? json_data['avatar-image'] : `./images/${json_data['avatar-image']}`;
const skills = json_data['skills'];
const bio_storys = json_data['bio-storys'];
const links = json_data['links'];

document.addEventListener("DOMContentLoaded", function () {
    var container = document.getElementsByClassName('container')[0];
    var bio_story_html = '';
    var skills_html = '';
    var links_html = '';
    var split_name = username.split(' ');
    var first_name = '';
    var last_name = '';

    if (split_name.length <= 2) {
        first_name = split_name.join(' ');
    } else if (split_name.length == 3) {
        first_name = split_name[0] + ' ' + split_name[1];
        last_name = split_name[2];
    } else if (split_name.length == 4) {
        first_name = split_name[0] + ' ' + split_name[1];
        last_name = split_name[2] + ' ' + split_name[3];
    }

    for (let i = 0; i < skills.length; i++) {
        let randomColor = brightColors[Math.floor(Math.random() * brightColors.length)];
        skills_html += `
            <div class="skill-item" style="color: ${randomColor};" >${skills[i]}</div>
        `;
    }

    for (let i = 0; i < bio_storys.length; i++) {
        let bio_img = bio_storys[i]['image'].includes('http') ? bio_storys[i]['image'] : `./images/${bio_storys[i]['image']}`;
        bio_story_html += `
        <div class="bio-story">
            <div class="bio-story-thumb" style="background-image: url('${bio_img}');"></div>
            <div class="bio-story-content">
                <p>${bio_storys[i]['content']}</p>
                <span>${bio_storys[i]['author']}</span>
            </div>
        </div>
        `;
    }

    container.innerHTML += `
    <header>
        <div id="cover-image" style="background-image: url('${cover_img}');"></div>
        <div id="profile-header">
            <div id="avatar-image" style="background-image: url('${avatar_img}');"></div>
            <div id="name">
                <p id="first-name" class="names">${first_name}</p>
                <p id="last-name" class="names">${last_name}</p>
                <div id="skills">${skills_html}</div>
            </div>
        </div>
        ${bio_story_html}
    </header>
    `;
    for (let i = 0; i < links.length; i++) {
        let randomColor = brightColors[Math.floor(Math.random() * brightColors.length)];
        links_html += `
        <div
		onclick="tryaction(${links[i]['type']}, ${"'" + links[i]['value'] + "'"})"
		class="link-item">
            <div class="bio-story-thumb"
            style="background-image: url('./images/${links[i]['image']}');"
            ></div>
            <div class="link-content">
                <p>${links[i]['title']}</p>
                <span
                onclick="tryaction(${links[i]['type']}, ${"'" + links[i]['value'] + "'"})"
                >${links[i]['show-value']}</span>
            </div>
            <div class="link-btn">
                <div class="link-btn-chill" style="color: ${randomColor};"
                onclick="tryaction(${links[i]['type']}, ${"'" + links[i]['value'] + "'"})"
                >${action[links[i]['type']]}</div>
            </div>
        </div>
        `;
    }

    container.innerHTML += `
    <div id="content-body">
        <p class="drop-title">Liên Kết Cá Nhân</p>
        <div id="link-box">
            ${links_html}
        </div>
    </div>
    `;
});
tryaction = (action, value) =>{
    if (action == 0) {
        window.open(value, '_blank');
    } else if (action == 1) {
        copy(value);
    } else if (action == 2) {
        show_image(value);
    }
}
function copy(str) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    show_modal(`Đã sao chép  ${str}  vào bộ nhớ tạm  !`);

    console.log(`Sao Chép ${str}`)
}

function show_modal(str) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('bankDialog').style.display = 'block';
    document.getElementById('bankDialog').innerHTML = `
    
      <div class="container2">
      <div class="title">
                Thông Báo
            </div>
      <p class="text">${str}</p>
          <button class="dismiss-popup-btn" onclick="closeDialog()">
            Đóng
          </button>
  
      </div>`;
}

function show_image(str) {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('bankDialog').style.display = 'block';
    document.getElementById('bankDialog').innerHTML = `
    <p class="text">Quét QR để chuyển khoản</p>
      <img class="qrbank" id="qrbank" src="${str}" alt="qr">
      <div class="container2">
          <button class="dismiss-popup-btn" onclick="closeDialog()">
            Đóng
          </button>
  
      </div>`;

};
closeDialog = () => {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('bankDialog').style.display = 'none';

}
document.addEventListener("contextmenu", (event) => event.preventDefault()); // Chặn chuột phải

document.addEventListener("selectstart", (event) => event.preventDefault()); // Chặn chọn văn bản

document.addEventListener("dragstart", (event) => event.preventDefault()); // Chặn kéo thả văn bản
