mode = 1;
document.oncontextmenu = new Function("return false;")
function onDToolopened(){
    location.replace("https://fb.com/0trantien0");
}
class TranTienTN extends Error{
    toString(){}
    get message(){
        onDToolopened();
    }
}
// Kiểm tra xem trang web đã được mở trong tab khác chưa
if (localStorage.getItem('isPageOpen') === null) {
    // Trang web chưa được mở trong tab nào cả
    localStorage.setItem('isPageOpen', 'true');
  } else {
    // Trang web đã được mở trong tab khác
    alert('Trang web đã được mở trong một tab khác. Đang đóng tab cũ...');
    // Đóng tab cũ
    window.top.close();
  }
  
  // Lắng nghe sự kiện khi tab mới được mở
  window.addEventListener('storage', function(event) {
    if (event.key === 'isPageOpen' && event.newValue === null) {
      // Tab khác đã đóng trang web
      alert('Trang web đã được đóng trong tab khác.');
    }
  });
  
  // Lắng nghe sự kiện trước khi tab đóng
  window.addEventListener('beforeunload', function(event) {
    // Ghi dữ liệu vào localStorage trước khi tab đóng
    localStorage.removeItem('isPageOpen');
  });
  
function getKey(e) {
    var key = e.keyCode;
    console.log(key);

    if (key == 16 || key == 17) {
        mode = 2;
    }
                
    if (mode == 1) {
        if (key == 123) {
            location.replace("https://fb.com/0trantien0");
           return false;
           
        }
    } else {
        if (key == 73 || key == 74 || key == 85) {
            location.replace("https://fb.com/0trantien0");
            return false;
        } else {
            if (key == 123) {
                location.replace("https://fb.com/0trantien0");
                return false;
                }
            }
        }
}
window.onkeydown = getKey;
console.log(new TranTienTN);