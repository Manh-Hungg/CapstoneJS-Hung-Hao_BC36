const productService = new ProductService();
function domID(id) {
  return document.getElementById(id);
}
function getProductList() {
  productService.getList().then(function (response) {
    renderProductList(response.data);
  });
}

function renderProductList(data) {
  var html = "";
  for (var i = 0; i < data.length; i++) {
    html += `
          <div class="col-lg-3 col-md-6 item mt-md-0 mt-5 ">
            <div class="card">
                <div class="card-header p-0 position-relative">
                    <a><img class="card-img-bottom " src="${data[i].img}" ></a>
                </div>
                <div class="card-body card-shadow ">
                    <a class="blog-post">${data[i].name}</a>
                    <p>${data[i].desc}</p>
                    <p>Camera Sau: ${data[i].backCamera}</p>
                    <p>Camera Trước: ${data[i].frontCamera}</p>
                    <div class="author align-items-center mt-3 mb-1">
                        <a>Giá: ${data[i].price} $</a>
                    </div>
                    <ul class="blog-meta">
                        <li class="meta-item ">
                            <span class="meta-value"> <span class="fa fa-eye"></span> 300 Views</span>
                        </li>
                        <li class="meta-item ">
                            <span class="meta-value"> <i class="fa-solid fa-plus"></i><span>  </span><i class="fa-solid fa-minus"></i>
                        </li>
                    </ul>
                </div>
            </div>
          </div>`;
  }
  document.getElementById("tblDanhSachSP").innerHTML = html;
}


// let productList = [];
// filterProductList = (type) => {
//     const data = this.productList.filter((element) => {
//         if(type === "all"){
//             return true;
//         }
//         if(element.type === type){
//             return true;
//         }
//         return false;
//     })
//     return data;
// }


domID("selLoai").onchange = (event) => {
  for(let i = 0; i < this.productService.length; i){
    var type = domID("selLoai").value;
    if(type === "loai1"){
      renderProductList(type)
    }

  }



  // const value = event.target.value;
  // const data = productService.filterProductList(value);

  renderProductList(data)
};









window.onload = function () {
  getProductList();
};
