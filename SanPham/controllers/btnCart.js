const buyBtns = document.querySelectorAll(".js-buy-tickets");
const modal = document.querySelector(".js-modal");
const modalContainer = document.querySelector(".js-modal-container");
const modalClose = document.querySelector(".js-modal-close");

//hàm hiển thị modal mua vé (thêm class open vào modal)
function showBuyTickets() {
  modal.classList.add("open");
}
//hàm ẩn modal mua vé (gỡ bỏ class open của modal)
function hideBuyTickets() {
  modal.classList.remove("open");
}
// lặp qua từng thẻ button và hành vi nghe click)
for (const buyBtn of buyBtns) {
  buyBtn.addEventListener("click", showBuyTickets);
}
// nghe hành vi click vào button close
modalClose.addEventListener("click", hideBuyTickets);
//nghe hành vi click và đóng container lại
modal.addEventListener("click", hideBuyTickets);
//nghe hành vi click và ngăn chặn hành vi nổi bọt
modalContainer.addEventListener("click", function (event) {
  event.stopPropagation();
});
