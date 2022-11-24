const productService = new ProductService();
function domID(id) {
  return document.getElementById(id);
}
function getProductList() {
  productService.getList().then(function (response) {
    renderProductList(response.data);

    renderCart(response.data);
  });
}
// in ds đt ra màn hình
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
                <div class="meta-item " > 
                   <span class="fa fa-eye"></span> 300 Views</span>
                  <input aria-label="quantity" class="input-product" max="10" min="0" name="" type="number" value="">  
                </div>
                <button class="btn btn-outline-danger" >ADD TO CART</button>
              </div>
              
            </div>
          </div>`;
  }
  document.getElementById("tblDanhSachSP").innerHTML = html;
}
// Tìm theo option
function filterProductList (type) {
  let list = [];
  productService.getList().then(function (response) {
    const xxx =response.data
    for (let i in xxx) {
      if (xxx[i].type === type) {
        list.push(xxx[i]);
      }

      if (type === "all") {
        list.push(xxx[i]);
      }
    }
    renderProductList(list)
  });
}
domID("type").onchange = (event) => {
  let type = event.target.value;
  filterProductList(type);
  console.log(type)
};
  


//=======================================================================

// in giỏ hàng
const renderCart = (data) => {
  let html = "";

  for (let i = 0; i < data.length; i++) {
    html += `
      <tr>
        <td><img style ="height:50px" src = "${data[i].img}"></td>
        <td>${data[i].name}</td>
        <td>${data[i].price}</td>

        <td> <input aria-label="quantity" class="input-cart" max="10" min="1" name="" type="number" value=""> </td>

        <td>${data[i].desc}</td>
        <td>
          <button class="btn btn-outline-secondary" >Delete</button>
        </td>
      </tr>`;
  }

  domID("tblGioSP").innerHTML = html;
};

// ====================================================================
window.onload = function () {
  getProductList();
};
