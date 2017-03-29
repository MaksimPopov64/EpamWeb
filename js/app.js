


  var  form = document.getElementsByTagName("form");




function Goods(name, count, price)
{
 this.name=name;
 this.count=count;
 this.price=price;
}

var goods = new Array(6);// создаём начальный список товаров

     for (var i = 0; i< goods.length;i++)
     {

       goods[i]= new Goods('Товар'+i,i,1200+i)

   }
CreateTable(goods.length);

CreateGoods();

var add = document.getElementById('e')

   add.onclick=function()
   {

        var UpdateAdd = document.getElementById("Add/Update");

        UpdateAdd.innerHTML="Add";

        UpdateAdd.onclick=function()

        {

              f=validate.call(form[0]);
              console.log(f);
              name1=document.getElementById("nameInput");
              count=document.getElementById("countInput");
              price=document.getElementById("priceInput");

              if ((name1.value!="") && (f))

              {
                goods.push(new Goods(name1.value,count.value,price.value));

                   name1.value="";
                   count.value="";
                   price.value="";
                   UpdateAdd.innerHTML="Add/Update";
                   CreateTable(1);//добавляем одну строку
                   CreateGoods();//создаём новый список товаров
              }



   }
 }
//фильтрация

var search = document.querySelector(".button")

      search.onclick=function(){
           Filter();
  }
//сортировка по цене
var priceSort = document.getElementById('price');
     var x=false;
     priceSort.onclick = function(){
         SortPrice();
      if (x){
      priceSort.innerHTML="";
       priceSort.style.background = 'url(img/arrowUP.jpg) no-repeat';
       CreateGoods();
     }
     else {
       priceSort.innerHTML="";
       priceSort.style.background = 'url(img/arrowDown.png) no-repeat';
     goods.reverse();
     CreateGoods();
   }
       x=!x

     }
//сортировка по имени

var nameSort = document.querySelector(".sort")

    var y=false;

     nameSort.onclick = function(){

        SortName();
       if (y){

        nameSort.style.background = 'url(img/arrowUP.jpg) no-repeat';
         CreateGoods();
      }
      else {
      
        nameSort.style.background = 'url(img/arrowDown.png) no-repeat';

      goods.reverse();

      CreateGoods();

    }
        y=!y


      }
// Удаление и редактирование товаров

      var table = document.getElementsByTagName("TBODY")[0];

      table.onclick = function(event) {

         var target = event.target; // где был клик?

         if(target.innerHTML=="Delete"){
           var confirmation = confirm("Вы уверены?");
         if(confirmation){
           var number=target.getAttribute("number");
           goods.splice(target.parentNode.parentNode.parentNode.rowIndex-1,1);//удаляем товар из этой строки
           console.log(goods.length);
           console.log(target.parentNode.parentNode.parentNode.rowIndex);
          table.deleteRow(target.parentNode.parentNode.parentNode.rowIndex);
        }
      }
        else if(target.innerHTML=="Edit")

        {
             var c = document.querySelector(".column>a");
             c.innerHTML="Update";
             var number=target.getAttribute("number");
             var UpdateAdd = document.getElementById("Add/Update");

                UpdateAdd.onclick=function(){
                   name1=document.getElementById("nameInput");
                   count=document.getElementById("countInput");
                   price=document.getElementById("priceInput");
                   f=validate.call(form[0]);
                   if((name1.value!="")&&(f))

                   {

                        goods[number].name=String(name1.value);
                        goods[number].count=Number(count.value);
                        goods[number].price=Number(price.value);
                        goods.push(goods[number]);
                        goods.splice(target.parentNode.parentNode.parentNode.rowIndex-1,1);
                        name1.value="";
                        count.value="";
                        price.value="";
                        CreateGoods();
                   }

                }


        }
      }


function CreateGoods()

{// вывод товаров в таблицу


var tbody = document.getElementsByTagName("TBODY")[0];

console.log(tbody.rows.length);
 console.log(goods.length);

 var nameList = document.querySelectorAll("td>a");
 var countList = document.querySelectorAll(".count");
 var priceList = document.querySelectorAll("td:nth-child(2)");




   for (var i = 0; i < goods.length;i++){

           nameList[i].innerHTML=goods[i].name;
           countList[i].innerHTML=goods[i].count;
           priceList[i].innerHTML='$'+String(goods[i].price);

   }



     }



  function SortPrice(){// сортировка по цене


           for (var i = 0; i< goods.length-1;i++){

                for (var j=0; j < goods.length-1-i;j++){

                           if (goods[j].price > goods[j+1].price){

                             var buf = goods[j];
                                 goods[j]=goods[j+1];
                                 goods[j+1]=buf;
                           }

                }

           }
              return goods;
         }

         function SortName(){// пузырьковая сортировка по имени

                  for (var i = 0; i< goods.length-1;i++){

                       for (var j=0; j < goods.length-1-i;j++){

                                  if (goods[j+1].name < goods[j].name){

                                    var buf = goods[j+1];
                                        goods[j+1]=goods[j];
                                        goods[j]=buf;

                                  }

                       }


                  }
                    return goods;

                }
function Filter(){

         var filter = document.getElementsByTagName('input');//находим все input


           var trs = document.querySelectorAll('tr');// находим все строки

           for (var j = 1; j< trs.length;j++) {// при каждом нажатии делаем строки видимыми

              trs[j].style.display="";

            }

         if (filter[0].value!=""){

// находим по подстроке название товара, если не удовлетворяет критериям - прячем строку таблицы
                        for (var j = 1; j< trs.length;j++) {

                          if (String(goods[j-1].name).toUpperCase().indexOf(String(filter[0].value).toUpperCase())==-1)
                          {

                           trs[j].style.display='none';

                               }


         }
       }


}

function CreateTable(n)//структура таблицы

  {

  var tbody = document.getElementsByTagName("TBODY")[0];

  for (var i = 0; i < n;i++){
      var row = document.createElement("TR");
      var td1 = document.createElement("TD");
      var td2 = document.createElement("TD");
      var td3 = document.createElement("TD");
      row.appendChild(td1);
      row.appendChild(td2);
      row.appendChild(td3);
      tbody.appendChild(row);
      row.setAttribute("number", i);
      var link = document.createElement("a");
      td1.appendChild(link);
      link.setAttribute("href","#");
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
      DeleteLink.setAttribute("href","#");
      DeleteLink.setAttribute("number", i);
      DeleteLink.innerHTML="Delete";
      var EditLink = document.createElement("a");
      buttonEdit.appendChild(EditLink);
      EditLink.setAttribute("href","#");
      EditLink.setAttribute("number", i);
      EditLink.innerHTML="Edit";


    }
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
      var err=0;


      var elems = this.elements;

      elems.name.style.border = "1px solid green";
      elems.count.style.border = "1px solid green";
      console.log(elems.name.style);
      resetError(elems.name.parentNode);
      if (!elems.name.value) {
        showError(elems.name.parentNode, ' Укажите наименование.');
       elems.name.style.border = "1px solid #ff0000";
        err++;

      }
      else if (elems.name.value.search(/[A-zА-яЁё]/)==-1) {
          showError(elems.name.parentNode, 'Введите буквы');
          elems.name.style.border = "1px solid #ff0000";
          err++;
      }
      else if (elems.name.value.length>15) {
          showError(elems.name.parentNode, 'Длина поля должна быть не более 15 знаков');
          elems.name.style.border = "1px solid #ff0000";
      err++;
    }


      resetError(elems.count.parentNode);
      if (!elems.count.value) {
        showError(elems.count.parentNode, ' Укажите количество.');
        elems.count.style.border = "1px solid #ff0000";
        err++
      }
      else if (elems.count.value.search(/[1-9]/)==-1) {
          showError(elems.count.parentNode, 'Введите число');
          elems.count.style.border = "1px solid #ff0000";
      err++;
    }


      resetError(elems.price.parentNode);
      if (!elems.price.value) {
        showError(elems.price.parentNode, ' Укажите цену.');


      }

    if (err>0){
      return false;
    }
    else {
       elems.name.removeAttribute("style");
       elems.count.removeAttribute("style");

      return true;
    }




}
