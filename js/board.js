function toggleActive(item) {
    let element = document.getElementById(item);
    element.classList.toggle('active');
}


function newTaskpopupView(event) {
    const elem = event.target;
    const elemList = event.currentTarget;
    if(elem === elemList || elemList.id === "addtask-head-close" || elemList.id === "addtask-btn" || elemList.classList.contains('task-popupadd') ) {
        document.getElementById('addtask-popup').classList.toggle(active);
    }
}


function editTaskpopupView(event) {
    const elem = event.target;
    const elemList = event.currentTarget;
    if(elem === elemList || elemList.id === "edittask-head-close" || elemList.id === "edittask-btn" || elemList.classList.contains('task-popupedit') ) {
        document.getElementById('edittask-popup').classList.toggle(active);
    }
}



function viewTaskpopupView(event) {
    const elem = event.target;
    const elemList = event.currentTarget;
    if(elem === elemList || elemList.id === "viewtask-head-close" || elemList.id === "viewtask-btn" || elemList.classList.contains('task-popupview') ) {
        document.getElementById('viewtask-popup').classList.toggle(active);
    }
}






