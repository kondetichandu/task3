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
        console.log(data);
        var urlParams = new URLSearchParams(window.location.search);
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
            DOM.edit.style.display="none";
            DOM.container.style.display="block";
            DOM.age.textContent = data.age;
            DOM.name.textContent = data.name;
            DOM.salary.textContent = data.salary;
        }
        console.log(check);
    });
    DOM.cancel.addEventListener('click',function(){
        DOM.edit.style.display="none";
        DOM.container.style.display="block";
    })
}(UIControl);
}