
//Phần 1,2,3 :
const productService = new ProductService();
function domID(id) {
  return document.getElementById(id);
}
function getProductList() {
  productService.getList().then(function (response) {
    renderProductList(response.data);

    // renderCart(response.data);
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
                   <span class="fa fa-eye"></span> 300 View</span>
                   <button id="add-cart" onclick= "cartList(${data[i].id})" class="btn btn-outline-danger ml-3" >ADD CART <input aria-label="quantity" class="input-product" max="10" min="0" name="" type="number" value=""></button>
                    
                </div>
              </div>
               
            </div>
          </div>`;
  }
  document.getElementById("tblDanhSachSP").innerHTML = html;
}
//END phần 1,2,3

// Phần 4:
function filterProductList(type) {
  let list = [];
  productService.getList().then(function (response) {
    const data = response.data;
    for (let i in data) {
      if (data[i].type === type) {
        list.push(data[i]);
      }

      if (type === "all") {
        list.push(data[i]);
      }
    }
    renderProductList(list);
  });
}
domID("type").onchange = (event) => {
  let type = event.target.value;
  filterProductList(type);
};

// END phần 4:

//Phần 5,6,7,8

let list = [];
function cartList(id) {
  productService.getList().then(function (response) {
    const data = response.data;
    let index = data.findIndex((element) => {
      return element.id == id;
    });
    let cartItem = { product: 0, quantity: 1 };
    let co = false;
    if (list.length > 0) {
      for (let i in list) {
        if (list[i].product.id == id) {
          co = true;
          list[i].quantity += 1;
        }

      }
      if (co === false) {
        cartItem.product = data[index];
        list.push(cartItem);
      } 
    } else {
      cartItem.product = data[index];
      list.push(cartItem);
    }
    const renderCart = (list) => {
      let html = "";
      for (let i = 0; i < list.length; i++) {
        html += `<tr>
              <td><img style ="height:50px" src = "${list[i].product.img}"></td>
              <td>${list[i].product.name}</td>
              <td>${list[i].product.price }$</td>
              <td> <input class="input-cart" max="8" min="1" name="" type="number" value="${list[i].quantity}"></td>
              <td>${list[i].product.desc}</td>
              <td><button class="btn btn-outline-danger">Xóa</button></td>
        </tr>`;
      }
      domID("tblGioSP").innerHTML = html;
    };
    renderCart(list);
  });
}

// END phần 5,6,7,8 
//=======================================================================


// ====================================================================
window.onload = function () {
  getProductList();
};
