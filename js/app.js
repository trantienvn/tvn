function isMobileDevice() {
    var check = false;
    (function(a) {
      if(/(android|iphone|ipad|mobile|windows phone|iemobile|opera mini|blackberry|bb10|playbook)/i.test(a)) {
        check = true;
      }
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }
  
  if (isMobileDevice()) {
    console.log("Thiết bị là di động");
  } else {
    console.log("Thiết bị là máy tính");
  }
  
let json_data = __DATAMOBILE__;

if(!isMobileDevice()){
    json_data = __DATA__;
}
//const json_data = __DATA__;

const username = json_data['name'];
const cover_img = json_data['cover-image'];
const avatar_img = json_data['avatar-image']
const skills = json_data['skills'];
const bio_storys = json_data['bio-storys']
const links = json_data['links']

$(document).ready(function() {

    console.log('READY !');
	console.log('Chào mừng đến trang cá nhân của tiến !');
	console.log('muốn lấy mã nguồn thì đến https://github.com/mrdatdepzai/nguyenhuudat');
    draw_console_header();

    var container = document.getElementsByClassName('container')[0];
    var bio_story_html = '';
    var skills_html = '';
    var links_html = '';

    //LOAD CONFIG
    
    //MODAL PROCESS


    // RENDER HEADER

    var split_name = username.split();
    var first_name = '';
    var last_name = '';

    if (split_name.length <= 2) {
        first_name = split_name.join(' ');
    } else if (split_name == 3) {
        first_name = split_name[0] + split_name[1];
        last_name = split_name[2];
    } else if (split_name == 4) {
        first_name = split_name[0] + split_name[1];
        last_name = split_name[2] + split_name[3];
    }


    for (let i = 0; i < skills.length; i++) {
        if (i % 2 == 0) {
            skills_html += `
                <div class="skill-item" style="color: #EF9D64;" >${skills[i]}</div>
            `;
        } else {
            skills_html += `
                <div class="skill-item" style="color: #85D18A;" >${skills[i]}</div>
            `;
        }
    }

    for (let i = 0; i < bio_storys.length; i++) {
        bio_story_html += `
        <div class="bio-story">
            <div class="bio-story-thumb"
                style="background-image: url('./images/${bio_storys[i]['image']}');"
            ></div>
            <div class="bio-story-content">
                <p>${bio_storys[i]['content']}</p>
                <span>${bio_storys[i]['author']}</span>
            </div>
        </div>
        `;
    }

    container.innerHTML += `
    <header>
        <div id="cover-image"
            style="background-image: url('./images/${cover_img}');"
        ></div>
        <div id="profile-header">
            <div id="avatar-image"
                style="background-image: url('./images/${avatar_img}');"
            ></div>
            <div id="name">
                <p id="first-name" class="names">${first_name}</p>
                <p id="last-name" class="names">${last_name}</p>
                <div id="skills">
                    ${skills_html}
                </div>
            </div>
        </div>
        ${bio_story_html}
    </header>
    `;

    //RENDER CONTENT BODY

    


    
    for (let i = 0; i < links.length; i++) {
        var pos = links[i]['type'];
        switch (pos){
        case 0:
        links_html += `
        <div
		onclick="window.open(${"'"}${links[i]['value']}${"'"}, '_blank')"
		class="link-item">
            <div class="bio-story-thumb"
            style="background-image: url('./images/flatform/${links[i]['image']}');"
            ></div>
            <div class="link-content">
                <p>${links[i]['title']}</p>
                <span
                onclick="window.open(${"'"}${links[i]['value']}${"'"}, '_blank')"
                >${links[i]['show-value']}</span>
            </div>
            <div class="link-btn">
                <div class="link-btn-chill light-orange"
                onclick="window.open(${"'"}${links[i]['value']}${"'"}, '_blank')"
                >MỞ</div>
            </div>
        </div>
        `;
        break;
        case 1:
        links_html += `
        <div
		onclick="copy(${"'"}${links[i]['value']}${"'"})"
		class="link-item">
            <div class="bio-story-thumb"
            style="background-image: url('./images/flatform/${links[i]['image']}');"
            ></div>
            <div class="link-content">
                <p>${links[i]['title']}</p>
                <span
                onclick="copy(${"'"}${links[i]['value']}${"'"})"
                >${links[i]['show-value']}</span>
            </div>
            <div class="link-btn">
                <div class="link-btn-chill light-blue"
                onclick="copy(${"'"}${links[i]['value']}${"'"})"
                >CHÉP</div>
            </div>
        </div>
        `;
        break;
        case 2:
        links_html += `
        <div
		onclick="show_image(${"'"}${links[i]['value']}${"'"})"
		class="link-item">
            <div class="bio-story-thumb"
            style="background-image: url('./images/flatform/${links[i]['image']}');"
            ></div>
            <div class="link-content">
                <p>${links[i]['title']}</p>
                <span
                onclick="show_image(${"'"}${links[i]['value']}${"'"})"
                >${links[i]['show-value']}</span>
            </div>
            <div class="link-btn">
                <div class="link-btn-chill light-blue"
                onclick="show_image(${"'"}${links[i]['value']}${"'"})"
                >MỞ</div>
            </div>
        </div>
        `;
        }
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


// 

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
    document.getElementById('description').innerText = str;
    document.getElementById("image").style.visibility = "none";
    document.getElementsByClassName("popup")[0].classList.add("active");
    

}

document.getElementById("dismiss-popup-btn").addEventListener("click", function() {
    document.getElementsByClassName("popup")[0].classList.remove("active");
});
function show_image(str){
    window.location.href = str
};
function draw_console_header() {
    console.log("%c Smile                  .","font-size:28px;color:red;background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEaElEQVRYhcVXT0iUWxT/fc7ogIsW0UYdx7I2Iq8ZihauhoSoEEJNEBGkneNCUrCBSpudb1GSIEiL3IguBHUUDcL+ODoMjyAwkJT3XomL2liO4BCVVr8W5/tz5/tmxqnXe+/AWXz3nvs7v+/cc889F8hfCgE0AvgdwGMAWzZ9rM816ra/TCoA9ANIAmCemtTXVPxT5xEV+OxZsLcXnJ0FV1fBrS3R1VUZ6+0VGxuZyM84rgTw0ABpbQWXl0EyP11eljUKiYc6Zl7yG4B3AOjzgfPz+Tu26/y8YOgk3unYOaVU0/AnAJaXg+/f/5jDZ8/AS5fAo0fBQACcmgK3twULAAsK8BeA0lwEEgBYW2uBTkyAwaClgQB4/jx4/Dj44gX4/Dn48aP87eHDzoS8cEFwamvNsUQ259cB0O+3/ry7O3e2nzsH3r4NNjZaYyUlJezo6GB1dbU5dueOYPr9pt11u3OvpmEPAB88EOc1NRZoKBRiLBZjLBZjKBQyxwMBiYDx3draSlXa29sJgB4PuLkp2ACo+/KqBO4DYHOzOF9chL7Qw3g8TrvE43F6PB4CYFeX2NbV1TnsSLKlpYUAGIkIdnOzSfi+SmAbAOfmxMgADYfDGUFJMhwOEwDLysR2dHQ0o93Y2BgBsKlJsOfmzCgkDecXjXAaiXfsmBglEgmS5OTkJIuLi9nW1mYCJxIJAqDbLbYbGxsZCaysrBAAq6os/EDAjMJFALinhigTAb/fb+5zMpnMSmB4eJhut5ter5fT09MkyVQqZa79/FnwIxGTwD0AeAKACwsWAfsWNDQ00OVysaioiKlUKm0LDh2yCHR2drKgoIAAWF9fnzUCCwsmgScAsA6AL19aBvYk3N/f58TEBBcXFx1JePKklQMzMzPUNI2apnFpaSljDpDiSyewDgC7ALizk17VjNDmOoY1NRqHh9NPwdDQEAcHB7OeAlJ86Ri7WQmMjkpZzVaEurvFbnvbGotGo2kJODU1ZWQ8NzezE3BsAQl++AB++SL7pZbiYFDKs2p79apFoqenh2traxwYGKDL5SIAnjiRbm/fAkcSknK/nz4Nvn6d30WkkrBrZ2e6rT0JHceQBEdGxMjnA79+TZ/79g0cHATHx8FHj6ztu3FDtq2yEjx1CjxyBOzvl8tKXW8/ho5CZGgwKIY3bzoJXL4siVpYCIbDzrW7u+DeHvjpk3POXoigl0WzFBv69KkVxpERJ9Dbt+CtW+D6evr4mzcSlfFxMB5Pn8tUigHbZaSqUZQAsK/v4Fzo67Psu7qc89kuI8d1rGpTkwXq84HXrkmSvnolOjsrY0r7xbt3nTi5rmMgQ0Oi6pkzcp6zZbqhVVVgNOpcf1BDYoijJVO1rk5IaJokH5TLqKwsd+dstGQuF/7I5hwASvXGkeXlUuUykSguFnW7RTMlqPrnRlPqcuFvHNCUAnm05f390gdeuZJeYu36M225If/rw0SViALynz7NVKnADz5ONQ07+EWPU1X+lef5dx3fisFC3wKhAAAAAElFTkSuQmCC');");
	console.log("im tien");
}
