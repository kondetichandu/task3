window.onload = function(){
var UIControl = function(){
    var DOM = {
        id: document.querySelector(".Employee_id"),
        name: document.querySelector(".Employee_name"),
        salary: document.querySelector(".Employee_salary"),
        age: document.querySelector(".Employee_age"),
        iname: document.querySelector(".input_name"),
        isalary: document.querySelector(".input_salary"),
        iage: document.querySelector(".input_age"),
        updatebutton:document.querySelector(".update"),
        edit:document.querySelector(".edit"),
        container:document.querySelector(".container"),
        update:document.querySelector(".updateRun"),
        cancel:document.querySelector(".cancel")
    };

    return {
        changeEmployeeDetails : function(id,name,salary,age){
            DOM.id.textContent = id;
            DOM.name.textContent = name;
            DOM.salary.textContent = salary;
            DOM.age.textContent = age;
            DOM.iname.value = name;
            DOM.isalary.value = salary;
            DOM.iage.value = age;
        },
        sendDOM: function(){
            return DOM;
        }
    };
}();

var mediator = function(UICtrl){
    var DOM = UICtrl.sendDOM();

    async function giveValues(id){
        var data = await fetch("http://dummy.restapiexample.com/api/v1/employees");
        var employlist = await data.json();
        //console.log(employlist.data[0]);
        var employee = employlist.data[id];
        UICtrl.changeEmployeeDetails(employee.id,employee.employee_name,employee.employee_salary,employee.employee_age);
    }
    function passValue(){
        var urlParams = new URLSearchParams(window.location.search);
        var myParam = urlParams.get('id');

        giveValues(myParam - 1);
    }
    passValue();
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
    DOM.updatebutton.addEventListener('click',function(){
        DOM.edit.style.display="block";
        DOM.container.style.display="none";
    });
    DOM.update.addEventListener("click",async function(){
        var data = {
            name:DOM.iname.value,
            salary:DOM.isalary.value,
            age:DOM.iage.value
        };
        if(verify(data))
        {
            DOM.edit.style.display="none";
            DOM.container.style.display="block";
            console.log(data);
            var urlParams = new URLSearchParams(window. location.search);
            var id = urlParams.get('id');
            var add = await fetch('http://dummy.restapiexample.com/api/v1/update/'+id,{
            method :"PUT",
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
            if(check.status == "success"){
                window.alert("updated success fully");
                
                DOM.age.textContent = data.age;
                DOM.name.textContent = data.name;
                DOM.salary.textContent = data.salary;
            }
            console.log(check);
        }
    });
    DOM.cancel.addEventListener('click',function(){
        DOM.edit.style.display="none";
        DOM.container.style.display="block";
    })
}(UIControl);
}