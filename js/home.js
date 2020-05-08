window.onload = function(){
var UIControl = function(){
    var DOM = {
        form:document.querySelector(".form_list"),
        addbutton:document.querySelector(".add_employe"),
        addform:document.querySelector(".add_form"),
        add:document.querySelector(".add"),
        name:document.querySelector(".names"),
        salary:document.querySelector(".salary"),
        age:document.querySelector(".age")
    };
    DOM.addbutton.addEventListener("click",function(){
        if(DOM.addform.style.display == 'block'){
            DOM.addform.style.display = 'none';
        }else{
            DOM.addform.style.display = 'block';
        }
    });
    return {
        sendDOM :function(){
            return DOM;
        },
        addList:function(id,name){
            var Html = '<button class="employ_button" name = "id" value="%id%"><div class="employ_id">%id%</div><div class="employe_name">%name%</div></button>';
            var newHtml = Html.replace(/%id%/g,id);
            newHtml = newHtml.replace(/%name%/g,name);
           // console.log(newHtml);
            DOM.form.insertAdjacentHTML('beforeend',newHtml);
        }
    }
}();


var mediater = function(UICtrl){
    var Dom  = UICtrl.sendDOM();
    async function getEmployee(){
        var data = await fetch("http://dummy.restapiexample.com/api/v1/employees");
        var employlist = await data.json();
        //console.log(employlist.data[0]);
        var employees = employlist.data;
        for (let index = 0; index < employees.length;   index++) {
            const element = employees[index];
            //console.log(element.id+"   "+element.   employee_name);
            UICtrl.addList(element.id,element.employee_name);
        }
    }
    getEmployee();
    Dom.add.addEventListener('click',async function(){
        var data = {
            name:Dom.name.value,
            salary:Dom.salary.value,
            age:Dom.age.value
        };
        console.log(data);
       var add = await fetch('http://dummy.restapiexample.com/api/v1/create',{
        method :"POST",
        mode: 'cors', 
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
             'Content-Type': 'application/json'
         },
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(data)
       });
        var check = await add.json();
        console.log(check);
        Dom.addform.style.display="none";
        if(check.status =="success"){
            window.alert('user added');
            UICtrl.addList(document.querySelectorAll(".employ_button").length+1,Dom.name.value);
        }
        // addList(document.querySelectorAll(".employ_button").length+1,Dom.name.value);
    });
}(UIControl);
}