
"use strict";

(function(){

var form = document.getElementsByTagName("form");
var priceSort = document.getElementById('price');
var nameSort = document.querySelector(".sort");
var search = document.querySelector(".button");
var add = document.getElementById('e');
var table = document.getElementsByTagName("TBODY")[0];
var filter = document.getElementsByTagName('input'); //находим все input
var EditButton = document.querySelector(".column>a");
var UpdateAdd = document.getElementById("Add/Update");
var x = false;
var y = false;

function Goods(name, count, price) {
   return {

     name: '',
     count: '',
     price: ''
 }
}

var goods = [];
//инициализируем список товаров
for (var i = 0; i < 6; i++) {
    goods.push({
        name: 'Товар' + i,
        count: i,
        price: 1200 + i
    });
}

AddRow(goods.length);

CreateGoods();

add.onclick = function() {
    var UpdateAdd = document.getElementById("Add/Update");
    UpdateAdd.innerHTML = "Add";
    UpdateAdd.style.background = "green";
    UpdateAdd.onclick = function() {
      var f = validate.call(form[0]);
        var name1 = document.getElementById("nameInput");
        var count = document.getElementById("countInput");
        var price = document.getElementById("priceInput");
        if ((name1.value != "") && (f)) {
            if (price.value == "") {
                price.value = 0;
            }
            AddRow(1);
            goods.push({name: name1.value, count: count.value, price: price.value});
            CreateGoods();
            //очищаем роля
            name1.value = "";
            count.value = "";
            price.value = "";
            UpdateAdd.innerHTML = "Add/Update";
            UpdateAdd.style.background = "";
        }
    }
}
//фильтрация
search.onclick = function() {
    Filter();
}
//сортировка по имени
nameSort.onclick = function() {
    goods.sort(function SortName(featureA, featureB) {
            if (featureA.name.toLowerCase() > featureB.name.toLowerCase())
                return 1;
            if (featureA.name.toLowerCase() < featureB.name.toLowerCase())
                return -1;
            else
                return 0;
            }
        );
    if (y) {
        nameSort.style.background = 'url(img/arrowUp.jpg) no-repeat';
        CreateGoods();
    } else {
        nameSort.style.background = 'url(img/arrowDown.png) no-repeat';
        goods.reverse();
        CreateGoods();
    }
    y = !y
}
priceSort.onclick = function() {
    //сортировка по цене
    goods.sort(function comparePrice(featureA, featureB) {
            if (featureA.price > featureB.price)
                return 1;
            else if (featureA.price < featureB.price)
                return -1;
            else
                return 0;
            }
        );
    if (x) {
        priceSort.style.background = 'url(img/arrowUp.jpg) no-repeat';
        CreateGoods();
    } else {
        priceSort.style.background = 'url(img/arrowDown.png) no-repeat';
        goods.reverse();
        CreateGoods();
    }
    x = !x
}
// Удаление и редактирование товаров
table.onclick = function(event) {
    var target = event.target; // где был клик?
    if (target.innerHTML == "Delete") {
      var confirmation = confirm("Вы уверены?");
        if (confirmation) {
            var number = target.getAttribute("number");
            goods.splice(target.parentNode.parentNode.parentNode.rowIndex - 1, 1); //удаляем товар из этой строки
            table.deleteRow(target.parentNode.parentNode.parentNode.rowIndex);
        }
    } else if (target.innerHTML == "Edit") {
        EditButton.innerHTML = "Update";
        var number = target.getAttribute("number");
        target.style.background = 'red';
        EditButton.style.background = 'red';
        UpdateAdd.onclick = function() {
          var  name1 = document.getElementById("nameInput");
            var count = document.getElementById("countInput");
          var  price = document.getElementById("priceInput");
          console.log(1);
          var  f = validate.call(form[0]);
            if ((name1.value != "") && (f)) {

                goods[number].name = String(name1.value);
                goods[number].count = Number(count.value);
                if (price.value == "") {
                    goods[number].price = 0;
                } else {
                    goods[number].price = Number(price.value);
                }
                goods.push(goods[number]);
                goods.splice(target.parentNode.parentNode.parentNode.rowIndex - 1, 1);
                name1.value = "";
                count.value = "";
                price.value = "";
                CreateGoods();
                target.style.background = '';
                EditButton.style.background = '';
            }
        }
    }
}
function CreateGoods()
{ // вывод товаров в таблицу
    var nameList = document.querySelectorAll("td>a");
    var countList = document.querySelectorAll(".count");
    var priceList = document.querySelectorAll("td:nth-child(2)");

    goods.forEach(function createContent(item, i) {

        nameList[i].innerHTML = item.name;
        countList[i].innerHTML = item.count;
        priceList[i].innerHTML = '$' + String(item.price);
    });
}
function AddRow(n) { //структура таблицы
    for (var i = 0; i < n; i++) {
        var row = document.createElement("TR");
        var td1 = document.createElement("TD");
        var td2 = document.createElement("TD");
        var td3 = document.createElement("TD");
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        table.appendChild(row);
        row.setAttribute("number", i);
        var link = document.createElement("a");
        td1.appendChild(link);
        link.setAttribute("href", "#");
        var div = document.createElement("div");
        td1.appendChild(div);
        div.classList.add('count');
        var buttonDelete = document.createElement("div");
        var buttonEdit = document.createElement("div");
        buttonEdit.classList.add('button');
        buttonDelete.classList.add('button');
        td3.appendChild(buttonDelete);
        td3.appendChild(buttonEdit);
        var DeleteLink = document.createElement("a");
        buttonDelete.appendChild(DeleteLink);
        DeleteLink.setAttribute("href", "#");
        DeleteLink.setAttribute("number", i);
        DeleteLink.innerHTML = "Delete";
        var EditLink = document.createElement("a");
        buttonEdit.appendChild(EditLink);
        EditLink.setAttribute("href", "#");
        EditLink.setAttribute("number", i);
        EditLink.innerHTML = "Edit";
    }
}
function Filter() {
    var trs = document.querySelectorAll('tr');
    trs.forEach(function ClearRowStyles(item) { // при каждом нажатии делаем строки видимыми
        return item.style.display = "";
    });
    // находим по подстроке название товара, если не удовлетворяет критериям - прячем строку таблицы
    goods.forEach(function DeleteRowStyles(item, i) { // при каждом нажатии делаем строки видимыми
    if ((filter[0].value != "") && (String(item.name).toUpperCase().indexOf(String(filter[0].value).toUpperCase()) == -1)) {
          trs[i + 1].style.display = 'none';
        }
    });
}

function showError(container, errorMessage) {
    container.className = 'error';
    var msgElem = document.createElement('span');
    msgElem.className = "error-message";
    msgElem.innerHTML = errorMessage;
    container.appendChild(msgElem);
}
function resetError(container) {
    container.className = '';
    if (container.lastChild.className == "error-message") {
        container.removeChild(container.lastChild);
    }
}
function validate() {
    var err = 0;
    var elems = this.elements;
    elems.name.style.border = "1px solid green";
    elems.count.style.border = "1px solid green";
    resetError(elems.name.parentNode);
    if (!elems.name.value) {
        showError(elems.name.parentNode, ' Укажите наименование.');
        elems.name.style.border = "1px solid #ff0000";
        err++;
    } else if (elems.name.value.search(/[A-zА-яЁё]/) == -1) {
        showError(elems.name.parentNode, 'Введите буквы');
        elems.name.style.border = "1px solid #ff0000";
        err++;
    } else if (elems.name.value.length > 15) {
        showError(elems.name.parentNode, 'Длина поля должна быть не более 15 знаков');
        elems.name.style.border = "1px solid #ff0000";
        err++;
    }
    resetError(elems.count.parentNode);
    if (!elems.count.value) {
        showError(elems.count.parentNode, ' Укажите количество.');
        elems.count.style.border = "1px solid #ff0000";
        err++
    } else if ((elems.count.value.search(/[1-9]/) == -1) || (elems.count.value.search(/[A-zА-яЁё]/) != -1)) {
        showError(elems.count.parentNode, 'Введите число');
        elems.count.style.border = "1px solid #ff0000";
        err++;
    }
    if (err > 0) {
        return  false;
    }
    else {
        elems.name.removeAttribute("style");
        elems.count.removeAttribute("style");
        return true;
    }
}
})();
