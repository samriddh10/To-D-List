let btnAdd =document.getElementById('btnAdd')
let newTask = document.getElementById('newTask')
let list = document.getElementById('list')

btnAdd.onclick = function(){
    if(newTask.value == ''){
        return
    }
    const newlist = document.createElement('li')//
    newlist.style.color = 'white'
    const newItem= document.createElement('div')//div 1
    newItem.setAttribute('class','list-item')
    const operation = document.createElement('div')//div 2
    operation.setAttribute('class','operation')
    newItem.style.color = 'white'
    newItem.innerText = newTask.value
    newItem.appendChild(operation)
    newlist.appendChild(newItem)
    list.appendChild(newlist)
    newTask.value = ''
    //delelte button
    let deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete'
    operation.appendChild(deleteButton)
    deleteButton.setAttribute('id','deleteButton')
    deleteButton.onclick= function(event){
        //event.target.parentElement.parentElement.parentElement.remove()
        newlist.remove()
    }

    //done button
    let doneButton = document.createElement('button')
    doneButton.innerText = 'Done'
    operation.appendChild(doneButton)
    doneButton.setAttribute('id','doneButton')

    doneButton.onclick = function(){
        if(newItem.style.color === 'green'){
            newItem.style.color = 'white'
            doneButton.innerText = 'Done'
            doneButton.style.backgroundColor = 'rgb(26, 208, 47)'
        } else {
            newItem.style.color = 'green'
            doneButton.innerText = '✅'
            doneButton.style.backgroundColor = 'white'
        }
    }

    //up button
    let upButton = document.createElement('button')
    upButton.innerText = '↑'
    operation.appendChild(upButton)

    upButton.onclick = function(event){
       
        event.target.parentElement.parentElement.parentElement.parentElement.insertBefore(
            event.target.parentElement.parentElement.parentElement,
            event.target.parentElement.parentElement.parentElement.previousSibling
        )

    }
    //DOWN button
    let downButton = document.createElement('button')
    downButton.innerText = '↓'
    operation.appendChild(downButton)

    downButton.onclick = function(event){
        
        event.target.parentElement.parentElement.parentElement.parentElement.insertBefore(
            event.target.parentElement.parentElement.parentElement.nextSibling,
            event.target.parentElement.parentElement.parentElement
        )

    }

    
    
}