let tc = document.querySelector(".ticket-container");
let allfilters = document.querySelectorAll(".filter");

let addbtn = document.querySelector(".add-btn");
let delbtn = document.querySelector(".del-btn");
let modalvisible = false;



function loadtickets(colour){
   let alltasks =localStorage.getItem("alltasks");
   if(alltasks != null)
   {
      alltasks = JSON.parse(alltasks);

     if(colour){
        alltasks = alltasks.filter(function(data){
           return data.priority == colour;
        })
     }

      for(let i=0; i < alltasks.length; i++){
         let ticket = document.createElement("div");
      
         ticket.classList.add("ticket");
         ticket.innerHTML= `<div class="ticket-colour ticket-colour-${alltasks[i].priority}"></div>
      
                            <div class="ticket-id">ticketid${alltasks[i].id}</div>   
      
                            <div class="task">${alltasks[i].task}</div>`;
      
      tc.appendChild(ticket);
      ticket.addEventListener("click", function(e){
         if(e.currentTarget.classList.contains("active"))
         {
            e.currentTarget.classList.remove("active");
         } else{
            e.currentTarget.classList.add("active");
         }
      });
      }
   }
}



 loadtickets();




delbtn.addEventListener("click", function(e){
   let selectedticktets = document.querySelectorAll(".ticket.active");
   let alltasks = JSON.parse(localStorage.getItem("alltasks"));

   for(let i=0; i < selectedticktets.length; i++)
   {
      selectedticktets[i].remove();
     let ticketid = selectedticktets[i].querySelector(".ticket-id").innerText;
     
     alltasks = alltasks.filter(function(data){
        return (("#" + data.ticketID) != ticketid);
     });
     
   }
   localStorage.setItem("alltasks", JSON.stringify(alltasks));
});




for(let i=0; i<allfilters.length; i++)
{
    allfilters[i].addEventListener("click", filterhandler);
}

// function filterhandler(e){
//     let span = e.currentTarget.children[0];
//     let style = getComputedStyle(span);
//     tc.style.backgroundColor = style.backgroundColor;
// }  ye wala function sir ne del krdia tha

function filterhandler(e){
   tc.innerHTML = "";
  if(e.currentTarget.classList.contains("active")){
     e.currentTarget.classList.remove("active");
     loadtickets();
  } else{
     let activefilter = document.querySelector(".filter.active");
     if(activefilter){
        activefilter.classList.remove("active");
     }
     e.currentTarget.classList.add("active");
     let ticketpriority = e.currentTarget.children[0].classList[0].split("-")[0];
     loadtickets(ticketpriority);
  }
}

addbtn.addEventListener("click", showmodal);

let selectedpriority = "pink"; // globally declared with some default value (here is pink).

function showmodal(e){
   if(!modalvisible)
   {
       let modal = document.createElement("div"); // node create hogya
       modal.classList.add("modal"); // class "modal" dedi div ko
    modal.innerHTML = ` <div class="task-to-be-added" data-typed="false" contenteditable>Enter your task here.</div>
             <div class="modal-priority-list">
        
            <div class="modal-pink-filter modal-filter active"></div>
            <div class="modal-blue-filter modal-filter"></div>
            <div class="modal-green-filter modal-filter"></div>
            <div class="modal-yellow-filter modal-filter"></div>

</div>`;
tc.appendChild(modal);

let taskmodal = document.querySelector(".task-to-be-added");
taskmodal.addEventListener("click", function(e){
   if(e.currentTarget.getAttribute("data-typed") == "false")
   {
       e.currentTarget.innerText = "";
       e.currentTarget.setAttribute("data-typed", "true");
   }
})
modalvisible = true;

     taskmodal.addEventListener("keypress", addticket.bind(this, taskmodal));
     let modalfilters = document.querySelectorAll(".modal-filter");
      for(let i=0; i < modalfilters.length; i++)
         {
            modalfilters[i].addEventListener("click", selectpriority);
         }

   }
    
}

function selectpriority(e){
  // console.log(e);
   let activefilter = document.querySelector(".modal-filter.active");
   activefilter.classList.remove("active");
   selectedpriority = e.currentTarget.classList[0].split("-")[1];
   e.currentTarget.classList.add("active");

   // taskmodal.click();
   // taskmodal.focus();
   }


function addticket(taskmodal,e){
  if(e.key == "Enter" && e.shiftKey == false && taskmodal.innerText.trim() != "")
  {

   let task = taskmodal.innerText;
   let id = uid();
   let ticket = document.createElement("div");
   
   ticket.classList.add("ticket");
   ticket.innerHTML= `<div class="ticket-colour ticket-colour-${selectedpriority}"></div>

                      <div class="ticket-id">#${id}</div>   

                      <div class="task">${task}</div>`;

document.querySelector(".modal").remove();
modalvisible = false;
tc.appendChild(ticket);
ticket.addEventListener("click", function(e){
   if(e.currentTarget.classList.contains("active"))
   {
      e.currentTarget.classList.remove("active");
   } else{
      e.currentTarget.classList.add("active");
   }
});

let alltasks = localStorage.getItem("alltasks");

if(alltasks == null){
   let data = [{"ticketID":id, "task":task, "priority":selectedpriority}];
   localStorage.setItem("alltasks", JSON.stringify(data));

}else{
   let data = JSON.parse(alltasks); // string ko convert kiya object mei.
   data.push({"ticketID":id, "task":task, "priority":selectedpriority});
   localStorage.setItem("alltasks", JSON.stringify(data));

}



  } else if(e.key == "Enter" && e.shiftKey == false){
     e.preventDefault(); // enter press krne pr next line jaane mei rokega!
     alert("Error! You've not typed anything in the box.");

  }
}

