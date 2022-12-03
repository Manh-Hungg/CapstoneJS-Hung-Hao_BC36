var productsService = new ProductService();

function domID(id){
    return document.getElementById(id);
}

function getProductList(){
    productsService.getList().then(function (response) {
        renderProductList(response.data);
    });
}


function renderProductList(data){  
      var html = "";
      for (var i = 0; i < data.length; i++) {
        html += `<tr>
            <td>${i+1}</td>
            <td>${data[i].name}</td>
            <td>${data[i].price}</td>
            <td><img style ="height:150px" src="${data[i].img}" ></td>
            <td><p>${data[i].desc}</p></td>
            <td>
                <button onclick="deleteProduct('${
                  data[i].id
                }')" class="btn btn-danger"> Xoá </button>
                
                <button data-target="#myModal" data-toggle="modal" class="btn btn-success" onclick="openUpdateModal(${data[i].id})"> Sửa </button>
            </td>
          </tr>`;
        }
      document.getElementById("tblDanhSachSP").innerHTML = html;
} 

domID("btnThemSP").onclick= function(){

    // querySelector lấy phần tử đầu tiên kiếm được

    document.querySelector('.modal-title').innerHTML="Thêm sản phẩm";
    document.querySelector('.modal-footer').innerHTML="<button onclick='addProduct()' class='btn btn-primary'>Thêm</button>"

};
function addProduct(){
    var name = domID("TenSP").value;
    var price = domID("GiaSP").value;
    var img = domID("HinhSP").value;
    var desc = domID("MoTaSP").value;
   
    var product = new Product(name, price, img, desc);

    document.querySelector(".close").click();
    productsService.addProduct(product).then(function (){
        alert("Thêm sản phẩm thành công");
        getProductList();
    })
   
}

function openUpdateModal(id){
    document.querySelector('.modal-title').innerHTML="Sửa sản phẩm";
    document.querySelector('.modal-footer').innerHTML=`<button onclick='updateProduct(${id})' class='btn btn-primary'>Sửa</button>`

    productsService.getById(id).then(function (response) {
        domID("TenSP").value = response.data.name
        domID("GiaSP").value = response.data.price
        domID("HinhSP").value = response.data.img
        domID("MoTaSP").value = response.data.desc

    })
}
function updateProduct(id){
    var name = domID("TenSP").value;
    var price = domID("GiaSP").value;
    var img = domID("HinhSP").value;
    var desc = domID("MoTaSP").value;
   
    var product = new Product(name, price, img, desc);

    document.querySelector(".close").click();

    productsService.updateProduct(id, product).then(function(){
        alert("Sửa sản phẩm thành công")
        getProductList();
    })    

}

function deleteProduct(id) {
    productsService.deleteProduct(id).then(function(){
        alert("Xoá thành công")
        getProductList();
    })


}




window.onload = function(){
    getProductList();
};