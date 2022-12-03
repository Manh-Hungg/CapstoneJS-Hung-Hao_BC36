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
                <a class="product-name">${data[i].name}</a>
                <p>${data[i].desc}</p>
                <p>Camera Sau: ${data[i].backCamera}</p>
                <p>Camera Trước: ${data[i].frontCamera}</p>
                <div class="author align-items-center mt-3 mb-1">
                  <a>Giá: ${data[i].price} $</a>
                </div>
                <div class="meta-item " > 
                    <div>
                      <p class="fa fa-eye"></p>
                      <span>300 View</span>
                    </div> 
                    <button onclick= "cartList(${data[i].id})" class="add-cart  btn btn-outline-danger" >ADD CART</button>
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
    let cartItem = { product: {}, quantity: 1 };

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
    renderCart(list);
    total();
    saveLocal();
  });
}

const renderCart = (list) => {
  let html = "";
  for (let i = 0; i < list.length; i++) {
    const totalPrice = () => {
      return list[i].product.price * list[i].quantity;
    };
    html += `<tr>
          <td><img style ="height:50px" src = "${list[i].product.img}"></td>
          <td class ="nameProduct">${list[i].product.name}</td>
          <td>${totalPrice()}$</td>
          <td>
            <div class="btn_add">
              <input class="minus is-form" onclick="btnSub(${
                list[i].product.id
              })" type="button" value="-">
              <input aria-label="quantity" id="input-qty" class="input-qty" max="10" min="1" name="" type="number" value="${
                list[i].quantity
              }">
              <input class="plus is-form" onclick="btnAdd(${
                list[i].product.id
              })" type="button" value="+">
            </div>
          </td>
          <td>${list[i].product.desc}</td>
          <td><button class="btn btn-outline-danger" onclick="deleteProduct(${
            list[i].product.id
          })">Xóa</button></td>
    </tr>`;
  }
  domID("tblGioSP").innerHTML = html;
  total();
};

// END phần 5,6,7,8
//=======================================================================

const btnAdd = (id) => {
  for (let i in list) {
    if (list[i].product.id == id) {
      list[i].quantity += 1;
    }
  }
  renderCart(list);

  saveLocal();
};
const btnSub = (id) => {
  for (let i in list) {
    if (list[i].product.id == id && list[i].quantity > 1) {
      list[i].quantity -= 1;
    }
  }
  renderCart(list);

  saveLocal();
};
const total = () => {
  let totalMoney = 0;
  for (let i in list) {
    totalMoney += list[i].product.price * list[i].quantity;
  }
  let html = `<strong class="totalProduct">
                  Total:
                  <span class="total">${totalMoney}$</span>
              </strong>`;

  domID("total").innerHTML = html;
};

const findId = (id) => {
  for (let i in list) {
    if (list[i].product.id == id) {
      return i;
    }
  }
};

const deleteProduct = (id) => {
  let idx = findId(id);
  list.splice(idx, 1);

  renderCart(list);
  saveLocal();
};

document.querySelector(".pay").onclick = () => {
  list = [];
  renderCart(list);
};

document.querySelector(".clearAll").onclick = () => {
  list = [];
  renderCart(list);
};

const saveLocal = () => {
  let listJSON = JSON.stringify(list);

  localStorage.setItem("listCart", listJSON);
};

const getLocal = () => {
  let listJSON = localStorage.getItem("listCart");
  if (!listJSON) return;

  let list = JSON.parse(listJSON);

  renderCart(list);
};

// ====================================================================
window.onload = function () {
  getLocal();
  getProductList();
};
