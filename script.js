




// ==========================================
// 1. HTML ELEMENTS SELECT KARNA
// ==========================================

let form =document.getElementById("task_form");
let name =document.getElementById("task_name");
let time =document.getElementById("task_time");
let progress_text = document.getElementById("progress_text");
let fill_progress = document.getElementById("fill_progress");

let totaltask = 0;
let task = 0;


// ==========================================
// 2. DATABASE SE PURANE TASKS LOAD KARNA
// ==========================================

fetch("get_tasks.php")
.then(response => response.json())
.then(row => {

    totaltask =row.length;

    row.forEach(function(item){

        if(item.is_completed === "1"){
            task++;
        }

        console.log(item.task_name)
        console.log(item.task_time)
        console.log(item.is_completed)

        let crd =document.createElement("div")
        crd.className="task_card"

        // Task name
        let txt =document.createElement("p")
        txt.textContent=item.task_name;
        crd.append(txt)

        // Task time
        let times =document.createElement("input")
        times.type="time";
        times.className="task_time"
        times.value =item.task_time;
        crd.append(times)

        // Checkbox
        let chk=document.createElement("input")
        chk.type="checkbox"
        chk.className = "task_checkbox";
        crd.append(chk)

        if(item.is_completed === "1"){
            chk.checked =true;
        }
        if(chk.checked){
            txt.style.textDecoration="line-through";
        }

        // Checkbox change hone par database update karna
        chk.addEventListener("change",function(event){

            console.log(item.id)
            console.log(chk.checked)

            let obj ={
                id:item.id,
                is_completed: chk.checked
            }

            fetch("update_status.php",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(obj)
            })

            if(chk.checked){
                task++;
                txt.style.textDecoration ="line-through";
            }
            else{
                txt.style.textDecoration ="none";
                task--;
            }

            let percentage =0;

            if(totaltask !== 0){
                percentage =(task / totaltask) * 100;
            }

            fill_progress.style.width=percentage+"%";
            progress_text.textContent=task + " of" + totaltask + " completed";

        })


        // ======================================
        // 2.1 DELETE BUTTON
        // ======================================

        let deletebtn=document.createElement("button");
        deletebtn.textContent="delete";
        deletebtn.className = "delete_btn";
        crd.append(deletebtn)


        // ======================================
        // 2.2 EDIT BUTTON
        // ======================================

        let editbtn =document.createElement("button")
        editbtn.textContent="Edit"
        editbtn.className = "edit_btn";
        crd.append(editbtn)

        editbtn.addEventListener("click",function(event){

            let input =document.createElement("input")
            input.type= "text"
            input.value =txt.textContent;
            crd.append(input)

            let save=document.createElement("button")
            save.textContent="save";
            crd.append(save)

            save.addEventListener("click",function(event){

                let editdata={
                    id:item.id,
                    task_name:input.value,
                }

                fetch("edit_task.php",{
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify(editdata)
                })

                .then(response=>response.text())

                .then(data=>{

                    if(data === "successfuly updated"){
                        txt.textContent=input.value;
                        save.remove();
                        input.remove();
                    }

                })

            })

        })


        // ======================================
        // 2.3 DELETE TASK DATABASE SE KARNA
        // ======================================

        deletebtn.addEventListener("click",function(event){

            let object ={
                id:item.id,
            }

            fetch("delete_task.php",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify(object)
            })

            .then(response=>response.text())

            .then(data=>{

                if(data === "successfuly deleted"){

                    if(chk.checked){
                        task--;
                    }

                    totaltask--;
                    crd.remove()

                    let percentage =0;

                    if(totaltask !== 0){
                        percentage =(task / totaltask) * 100;
                    }

                    fill_progress.style.width=percentage+"%";
                    progress_text.textContent=task + " of" + totaltask + " completed";

                }

            })

        })


        todaytask.append(crd);

    })


    // Initial progress calculate karna
    let percentage = 0;

    if(totaltask !== 0){
        percentage =(task / totaltask) * 100;
    }

    progress_text.textContent=task + " of"+ totaltask + " completed";
    fill_progress.style.width=percentage+"%";

});


// ==========================================
// 3. NEW TASK ADD KARNA
// ==========================================

let issubmitting = false;

form.addEventListener("submit",function(event){

    event.preventDefault();

    // alert("Submit event working");
    console.log("SUBMIT EVENT");

    // Double click se duplicate task rokna
    if(issubmitting){
        return;
    }

    issubmitting = true;

    let n =name.value.trim()
    let t =time.value.trim()

    let object = {
        task_name: n,
        task_time : t
    }

    let add_btn=document.getElementById("add_btn");
    add_btn.disabled =true;

    let card =document.createElement("div")
    card.className = "task_card"

    let para =document.createElement("p")
    para.textContent = n;
    // Task database mein save karna
    fetch("save.php",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(object) //ye object se leker stringify tk php ko data bheja jraha hy
    })

    .then(response =>response.text())
.then(data =>{
    card.dataset.id = data;
    name.value = "";
time.value = "";
    console.log(card.dataset.id)
    console.log("REQUEST COMPLETE");
})
.catch(error =>{
    console.log(error);
})
.finally(() => {
    setTimeout(() => {
        add_btn.disabled = false;
        issubmitting = false;
    }, 700);
});


    // ======================================
    // 3.1 NEW TASK KA CARD CREATE KARNA
    // ======================================

    

    totaltask =totaltask+1;

    updateprogress();

    text.textContent =task+" of "+totaltask+" completed";
    console.log(text.textContent)

    card.append(para)


    // ======================================
    // 3.2 NEW TASK KA CHECKBOX
    // ======================================

    let box =document.createElement("input");
    box.type = "checkbox";

    card.prepend(box)

    box.addEventListener("change",function(event){

        if(box.checked ){

            para.style.textDecoration ="line-through"
            task=task+1;

            text.textContent =task+" of " + totaltask+" completed";

        }

        else{

            para.style.textDecoration ="none"
            task=task-1

            text.textContent =task+" of " + totaltask + " completed";

        }

        updateprogress();

    })


    // ======================================
    // 3.3 NEW TASK DELETE KARNA
    // ======================================

    let btn =document.createElement("button")
    btn.textContent ="delete";

    card.append(btn)

    btn.addEventListener("click",function(event){

        if(box.checked){
            task =task -1;
        }

        totaltask =totaltask -1;

        text.textContent = task+" of " + totaltask+" completed"

        card.remove()

        updateprogress();

    })


    // ======================================
    // 3.4 NEW TASK KA TIME
    // ======================================

    let ntime =document.createElement("input");
    ntime.type = "time";
    ntime.value = t

    card.append(ntime)


    // ======================================
    // 3.5 NEW TASK EDIT BUTTON
    // ======================================

    let btn1 =document.createElement("button");

    btn1.textContent="Edit";

    card.append(btn1)

    btn1.addEventListener("click",function(event){

        let para1 =document.createElement("input");

        para1.type = "text";
        para1.value = para.textContent;

        card.append(para1)


        // Save button
        let saveBtn = document.createElement("button");

        saveBtn.textContent = "Save";

        card.append(saveBtn);


        // Edited task database mein save karna
        saveBtn.addEventListener("click", function() {

            let editdata = {
                id: card.dataset.id,
                task_name: para1.value.trim()
            };

            fetch("edit_task.php", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(editdata)
            })

            .then(response => response.text())

            .then(data => {

                if(data === "successfuly updated") {

                    para.textContent = para1.value.trim();

                    para1.remove();

                    saveBtn.remove();

                }

                else {
                    console.log(data);
                }

            })

            .catch(error => console.log(error));

        });

    })


    console.log("NEW CARD:", n);

    console.log("EXISTING CARDS:", todaytask.children.length);

    console.log(
        [...todaytask.children].map(card => card.querySelector("p")?.textContent)
    );

    todaytask.append(card);

});


// ==========================================
// 4. PROGRESS UPDATE FUNCTION
// ==========================================

let text =document.getElementById("progress_text")
let progress =document.getElementById("fill_progress")

function updateprogress(){

    let percen =task/totaltask*100;

    if(totaltask === 0){
        percen = 0;
    }

    progress.style.width = percen +"%";

    text.textContent =task+" of "+totaltask+" completed";

}

text.textContent ="0 of 0 completed"


// ==========================================
// 5. TODAY TASK CONTAINER SELECT KARNA
// ==========================================

let todaytask =document.getElementById("today_task")


// ==========================================
// 6. COMPLETED TASKS FILTER
// ==========================================

let complete =document.getElementById("complete_tasks")

complete.addEventListener("click",function(){

    let cards =todaytask.querySelectorAll(".task_card")

    cards.forEach(function(card){

        let checkbox= card.querySelector("input[type='checkbox']");

        if(checkbox.checked){
            card.style.display = "block";
        }

        else{
            card.style.display="none";
        }

    })

})


// ==========================================
// 7. PENDING TASKS FILTER
// ==========================================

let pending =document.getElementById("pending_tasks");

pending.addEventListener("click",function(){

    let cards =todaytask.querySelectorAll(".task_card")

    cards.forEach(function(card){

        let check =card.querySelector("input[type='checkbox']");

        if(!check.checked){
            card.style.display = "block";
        }

        else{
            card.style.display = "none";
        }

    })

})


// ==========================================
// 8. ALL TASKS FILTER
// ==========================================

let all =document.getElementById("all_tasks")

all.addEventListener("click",function(){

    let cards = todaytask.querySelectorAll(".task_card");

    cards.forEach(function(card){

        let suppose =card.querySelector("input[type='checkbox']")

        card.style.display = "block";

    })

})