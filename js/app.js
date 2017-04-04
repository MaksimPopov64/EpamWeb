var form = document.getElementsByTagName("form");
var priceSort = document.getElementById('price');
var nameSort = document.querySelector(".sort");
var search = document.querySelector(".button");
var add = document.getElementById('e');
var table = document.getElementsByTagName("TBODY")[0];
var filter = document.getElementsByTagName('input'); //находим все input

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

    UpdateAdd = document.getElementById("Add/Update");

    UpdateAdd.innerHTML = "Add";

    UpdateAdd.onclick = function()

    {

        f = validate.call(form[0]);
        name1 = document.getElementById("nameInput");
        count = document.getElementById("countInput");
        price = document.getElementById("priceInput");

        if ((name1.value != "") && (f))

        {
            if (price.value == "") {
                price.value = 0;
            }
            AddRow(1);
            goods.push({
                name: name1.value,
                count: count.value,
                price: price.value
            });
            CreateGoods();




            //CreateGoods(); //создаём новый список товаров
            name1.value = "";
            count.value = "";
            price.value = "";
            UpdateAdd.innerHTML = "Add/Update";


        }



    }
}
//фильтрация



search.onclick = function() {
    Filter();
}
  x = false;
priceSort.onclick = function() {
  
    SortPrice();

    if (x) {
        priceSort.innerHTML = "";
        priceSort.style.background = 'url(img/arrowUp.jpg) no-repeat';
        goods.reverse();
        CreateGoods();
    } else {
        priceSort.innerHTML = "";
        priceSort.style.background = 'url(img/arrowDown.png) no-repeat';
        goods.reverse();
        CreateGoods();
    }
    x = !x

}
//сортировка по имени
var y=false;

nameSort.onclick = function() {

    SortName();

    if (y) {
        nameSort.style.background = 'url(img/arrowUp.jpg) no-repeat';
        goods.reverse();
        CreateGoods();

    } else {

        nameSort.style.background = 'url(img/arrowDown.png) no-repeat';
        goods.reverse();
        CreateGoods();


    }
    y = !y
    console.log(y);


}
// Удаление и редактирование товаров

table.onclick = function(event) {

    target = event.target; // где был клик?

    if (target.innerHTML == "Delete") {
        confirmation = confirm("Вы уверены?");
        if (confirmation) {
            number = target.getAttribute("number");
            goods.splice(target.parentNode.parentNode.parentNode.rowIndex - 1, 1); //удаляем товар из этой строки
            table.deleteRow(target.parentNode.parentNode.parentNode.rowIndex);
        }
    } else if (target.innerHTML == "Edit")

    {
        c = document.querySelector(".column>a");
        c.innerHTML = "Update";
        number = target.getAttribute("number");
        UpdateAdd = document.getElementById("Add/Update");

        UpdateAdd.onclick = function() {
            name1 = document.getElementById("nameInput");
            count = document.getElementById("countInput");
            price = document.getElementById("priceInput");
            f = validate.call(form[0]);
            if ((name1.value != "") && (f))

            {

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
            }

        }


    }
}


function CreateGoods()

{ // вывод товаров в таблицу


    var nameList = document.querySelectorAll("td>a");
    var countList = document.querySelectorAll(".count");
    var priceList = document.querySelectorAll("td:nth-child(2)");




    for (i in goods) {

        nameList[i].innerHTML = goods[i].name;
        countList[i].innerHTML = goods[i].count;
        priceList[i].innerHTML = '$' + String(goods[i].price);

    }
}

function AddRow(n) //структура таблицы

{


    for (i = 0; i < n; i++) {
        row = document.createElement("TR");
        td1 = document.createElement("TD");
        td2 = document.createElement("TD");
        td3 = document.createElement("TD");
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        table.appendChild(row);
        row.setAttribute("number", i);
        link = document.createElement("a");
        td1.appendChild(link);
        link.setAttribute("href", "#");
        div = document.createElement("div");
        td1.appendChild(div);
        div.classList.add('count');
        buttonDelete = document.createElement("div");
        buttonEdit = document.createElement("div");
        buttonEdit.classList.add('button');
        buttonDelete.classList.add('button');
        td3.appendChild(buttonDelete);
        td3.appendChild(buttonEdit);
        DeleteLink = document.createElement("a");
        buttonDelete.appendChild(DeleteLink);
        DeleteLink.setAttribute("href", "#");
        DeleteLink.setAttribute("number", i);
        DeleteLink.innerHTML = "Delete";
        EditLink = document.createElement("a");
        buttonEdit.appendChild(EditLink);
        EditLink.setAttribute("href", "#");
        EditLink.setAttribute("number", i);
        EditLink.innerHTML = "Edit";


    }
}



function SortPrice() { // сортировка по цене



    for (i in goods-1) {

        for (j in goods - 1 - i) {

            if (goods[j].price > goods[j + 1].price) {

                buf = goods[j];
                goods[j] = goods[j + 1];
                goods[j + 1] = buf;
            }

        }

    }
    return goods;
}

function SortName() { // пузырьковая сортировка по имени

    for (i in goods-1) {

        for (j in goods - 1 - i) {

            if (goods[j + 1].name < goods[j].name) {

                var buf = goods[j + 1];
                goods[j + 1] = goods[j];
                goods[j] = buf;

            }

        }


    }
    return goods;

}

function Filter() {
    trs = document.querySelectorAll('tr'); // находим все строки
    for (j = 1; j < trs.length; j++) { // при каждом нажатии делаем строки видимыми

        trs[j].style.display = "";

    }
    console.log(trs[j]);
    if (filter[0].value != "") {

        // находим по подстроке название товара, если не удовлетворяет критериям - прячем строку таблицы
        for (j = 1; j < trs.length; j++) {

            if (String(goods[j - 1].name).toUpperCase().indexOf(String(filter[0].value).toUpperCase()) == -1) {

                trs[j].style.display = 'none';

            }


        }
    }


}



function showError(container, errorMessage) {
    container.className = 'error';
    msgElem = document.createElement('span');
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
    err = 0;
    elems = this.elements;
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
        return false;
    } else {
        elems.name.removeAttribute("style");
        elems.count.removeAttribute("style");
        return true;
    }




}
