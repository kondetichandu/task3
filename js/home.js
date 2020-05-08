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
    function verify(data){
        if(data.name.length == 0
            ||data.salary.length == 0
            || data.age.length == 0
        ){
            window.alert("fill all details in the form");
            return false;
        }
        else if(data.name.match(/[^A-Za-z ]+/g) != null){
            window.alert("Name should only contain alphabets");
            return false;
        }
        else if(data.salary<1)
        {
            window.alert("Salary should be greater the 1");
            return false;
        }
        else if(data.age<1){
            window.alert("Age should be greater the 1");
            return false;
        }
        else if(data.age.split('.').length != 1)
        {
            window.alert("Age should be integer");
            return false;
        }
        else{
            console.log(data.age.split('.').length);
            return true;
        }
    }
    Dom.add.addEventListener('click',async function(){
        var data = {
            name:Dom.name.value,
            salary:Dom.salary.value,
            age:Dom.age.value
        };
        if(verify(data)){
            Dom.name.value="";
            Dom.salary.value="";
            Dom.age.value="";
            Dom.addform.style.display="none";
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
             
            if(check.status =="success"){
                window.alert('user added');
                UICtrl.addList(document.querySelectorAll(".employ_button").length+1,data.name);
            }
            else{
                window.alert('Sorry failed');
            }
        }
        // addList(document.querySelectorAll(".employ_button").length+1,Dom.name.value);
    });
}(UIControl);
}