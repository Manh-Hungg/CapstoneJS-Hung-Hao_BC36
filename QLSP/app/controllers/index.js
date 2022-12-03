let productsService = new ProductService();

function domID(id) {
  return document.getElementById(id);
}

function getProductList() {
  productsService.getList().then(function (response) {
    renderProductList(response.data);
  });
}

function renderProductList(data) {
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html += `<tr>
            <td>${i + 1}</td>
            <td>${data[i].name}</td>
            <td>${data[i].price}</td>
            <td><img style ="height:150px" src="${data[i].img}" ></td>
            <td><p>${data[i].desc}</p></td>
            <td>
                <button onclick="deleteProduct('${
                  data[i].id
                }')" class="btn btn-danger"> Xoá </button>
                
                <button data-target="#myModal" data-toggle="modal" class="btn btn-success" onclick="openUpdateModal(${
                  data[i].id
                })"> Sửa </button>
            </td>
          </tr>`;
  }
  document.getElementById("tblDanhSachSP").innerHTML = html;
  reset();
}

domID("btnThemSP").onclick = function () {
  // querySelector lấy phần tử đầu tiên kiếm được

  document.querySelector(".modal-title").innerHTML = "Thêm sản phẩm";
  document.querySelector(".modal-footer").innerHTML =
    "<button onclick='addProduct()' class='btn btn-primary'>Thêm</button>";
};
function addProduct() {
  let isValidate = validateForm();
  if (!isValidate) return;

  let name = domID("TenSP").value;
  let price = domID("GiaSP").value;
  let img = domID("HinhSP").value;
  let desc = domID("MoTaSP").value;

  let product = new Product(name, price, img, desc);

  document.querySelector(".close").click();
  productsService.addProduct(product).then(function () {
    alert("Thêm sản phẩm thành công");
    getProductList();
  });
}

function openUpdateModal(id) {
  document.querySelector(".modal-title").innerHTML = "Sửa sản phẩm";
  document.querySelector(
    ".modal-footer"
  ).innerHTML = `<button onclick='updateProduct(${id})' class='btn btn-primary'>Sửa</button>`;

  productsService.getById(id).then(function (response) {
    domID("TenSP").value = response.data.name;
    domID("GiaSP").value = response.data.price;
    domID("HinhSP").value = response.data.img;
    domID("MoTaSP").value = response.data.desc;
  });
}
function updateProduct(id) {
  let isValidate = validateForm();
  if (!isValidate) return;

  let name = domID("TenSP").value;
  let price = domID("GiaSP").value;
  let img = domID("HinhSP").value;
  let desc = domID("MoTaSP").value;

  let product = new Product(name, price, img, desc);

  document.querySelector(".close").click();

  productsService.updateProduct(id, product).then(function () {
    alert("Sửa sản phẩm thành công");
    getProductList();
  });
  reset();
}

function deleteProduct(id) {
  productsService.deleteProduct(id).then(function () {
    alert("Xoá thành công");
    getProductList();
  });
}
reset = () => {
  domID("nameSP").style.display = "none";
  domID("priceSP").style.display = "none";
  domID("imgSP").style.display = "none";
  domID("descSP").style.display = "none";
};

validateForm = () => {
  let productName = domID("TenSP").value;
  let productPrice = domID("GiaSP").value;
  let productImg = domID("HinhSP").value;
  let productDesc = domID("MoTaSP").value;

  isValidate = true;

  isValidate &=
    required(productName, "nameSP") && checkName(productName, "nameSP");
  domID("nameSP").style.display = "block";

  isValidate &=
    required(productPrice, "priceSP") &&
    checkBasicSalary(productPrice, "priceSP");
  domID("priceSP").style.display = "block";

  isValidate &=
    required(productImg, "imgSP") && checkUrlImg(productImg, "imgSP");
  domID("imgSP").style.display = "block";

  isValidate &= required(productDesc, "descSP");
  domID("descSP").style.display = "block";

  return isValidate;
};

// Validate
required = (value, spanId) => {
  if (value.length === 0) {
    domID(spanId).innerHTML = "* Trường này bắt buộc nhập.";
    return !1;
  }
  domID(spanId).innerHTML = "";
  return !0;
};

checkBasicSalary = (value, spanId) => {
  let pattern = /^([5-9]\d{2}|[1-9]\d{4}|[1-9]\d{3})$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    return !0;
  }
  document.getElementById(spanId).innerHTML = "* Nhập giá từ 500 - 99999";
  return !1;
};

checkUrlImg = (value, spanId) => {
  let pattern = /^.*\.(?:jpg|gif|png)$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    return !0;
  }
  document.getElementById(spanId).innerHTML =
    "* Nhập Url theo dạng ( .jpg, .gif hoặc .png)";
  return !1;
};

checkName = (value, spanId) => {
  let pattern = /^[A-z 0-9\+]+$/g;
  if (pattern.test(value)) {
    document.getElementById(spanId).innerHTML = "";
    return !0;
  }
  document.getElementById(spanId).innerHTML =
    "* Chỉ chấp nhận các ký tự A-z 0-9 và +";
  return !1;
};

// ===================================================================================

window.onload = function () {
  getProductList();
};
