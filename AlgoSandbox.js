/**
 * Created by Gerben on 8-9-2016.
 */
var divCounter = 100;
function allowDrop(ev) {
    ev.preventDefault();

}

function drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
}

function getNewCodeContainer() {
    var cc = document.createElement("div");
    cc.setAttribute("id", "div" + divCounter);
    divCounter += 1;
    cc.classList.add("codeContainer");
    cc.setAttribute("ondrop", "dropToProgram(event)");
    cc.setAttribute("ondragover", "allowDrop(event)");
    return cc;

}



function destroyBlock(ev) {
    ev.preventDefault();

    var program = document.getElementById("program");
    var data = ev.dataTransfer.getData("id");
    var element = document.getElementById(data);
    if(element.parentNode.classList.contains("codeContainer")) {
        program.removeChild(element.parentNode);
    }

}

function dropToProgram(ev) {
    ev.preventDefault();

    var data = ev.dataTransfer.getData("id");
    var element = document.getElementById(data);
    var target = ev.target;
    var toolBox = document.getElementById("toolBox");
    console.log(target.classList);
    while (!(target.classList.contains("codeContainer") || target.classList.contains("newElement"))) {
        target = target.parentNode;
        console.log(target);
    }
    console.log(target);

    if (element == null || !element.classList.contains("codeStatement")) {
        return;
    }
    var program = document.getElementById("program");
    var newDiv = getNewCodeContainer();

    program.insertBefore(newDiv, target);
    console.log(element.parentNode.classList);
    if (element.parentNode.classList.contains("codeContainer")) {
        program.removeChild(element.parentNode);
    }

    if (element.parentNode.id == "toolBox") {
        var oldelement = element.cloneNode(true);
        oldelement.setAttribute("id", "div" + divCounter);
        divCounter += 1;
        toolBox.insertBefore(oldelement, element.nextElementSibling);
    }
    newDiv.appendChild(element);

}