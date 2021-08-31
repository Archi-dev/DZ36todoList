'use strict'
let num = 0;
const todoController = {
    getData() {
        if(!todoModel.getData()) return false;
        return JSON.parse(todoModel.getData());
    },
    setData(inputs){
        const todoItemObject = this.handleInputs(inputs);
        todoModel.saveData(todoItemObject);
        return todoItemObject;
    },
    handleInputs(inputs) {
        const obj = {};
        for(const input of inputs) {
            obj[input.name] = input.value;
        }
        // obj.completed = 'false';
        return obj;
    }
}


const todoModel = {
    dbName: 'saved_data',
    saveData(todoItem) {
        if(localStorage[this.dbName]) {
            const data = JSON.parse(localStorage[this.dbName]);
            todoItem.checkbox = false;
            todoItem.completed = 'false';
            data.push(todoItem);
            localStorage.setItem(this.dbName, JSON.stringify(data));
            return data;
        }
        todoItem.checkbox = false;
        todoItem.completed = 'false';
        // console.log(todoItem);
        const data = [todoItem];
      
        localStorage.setItem(this.dbName, JSON.stringify(data));
        return data;
    },
    getData() {
        if(!localStorage.getItem(this.dbName)) return false;
        return localStorage.getItem(this.dbName);
    }
}

const todoView = {
    form: document.querySelector('#todoForm'),
    template: document.querySelector('#todoItems'),
    // butt: document.querySelector('.taskButton'),
    

    setEvents() {
        window.addEventListener('load', this.onLoadFunc.bind(this));
        this.form.addEventListener('submit', this.formSubmit.bind(this));
        this.template.addEventListener('change', this.checkBoxFunc.bind(this));
        this.template.addEventListener('click', this.deletElemFunc.bind(this));
        this.template.addEventListener('click', this.deletAllFunc.bind(this));
    },
    formSubmit(e) {
        e.preventDefault();
        const inputs = e.target.querySelectorAll('input, textarea');

        for(const input of inputs) {
            if(!input.value.length) return alert('No way you can add this shit');
        }
        todoController.setData(inputs);
        const todoItemObject = todoController.getData()[todoController.getData().length-1]
        this.renderItem(todoItemObject);
        e.target.reset();
    },
    onLoadFunc() {
        // this.template.innerHTML = '';
        // console.log(this)
        // console.log(this.button);
        num = 0;
        console.log(todoController.getData());
        todoController.getData().forEach(item => this.renderItem(item));
    },
    checkBoxFunc(boxCheck) {
        
        // console.log(Number(boxCheck.target.parentElement.id));
        let index = Number(boxCheck.target.parentElement.id);
        // todoController.getData();
        // console.log(todoController.getData()[index].completed = 'true');
        let arr = todoController.getData();
        // console.log(arr);
        // console.log(index);
        // console.log(arr[index].completed);
        arr[index].completed = 'true';
        console.log(arr[index]);
        arr[index].checkbox = !arr[index].checkbox;
        // console.log(arr[index]);
        localStorage.clear();
        localStorage.setItem(todoModel.dbName, JSON.stringify(arr));
        // this.template.firstElementChild.remove();
        // console.log(this.template.firstElementChild);
        // console.log(document.querySelector('.col-4'));
        this.template.textContent = '';
        // console.log(this.template);
      
        
        todoView.onLoadFunc();
        // todoController.setData(arr);
        
        
    },
    deletElemFunc(elemDel) {
        
        
        if (elemDel.target.className === 'taskButton') {
            console.log(elemDel.target)
            let index = Number(elemDel.target.parentElement.id);
            let arr = todoController.getData();
            arr.splice(index, 1);
            localStorage.clear();
            localStorage.setItem(todoModel.dbName, JSON.stringify(arr));
            this.template.innerHTML = '';
            // this.template.remove();
            todoView.onLoadFunc();
        }
            
    },
    deletAllFunc(delAll) {
       
        if (delAll.target.className === 'taskdeleteAll') {
              num = 0;
              console.log(delAll.target);
            // let index = Number(elemDel.target.parentElement.id);
            let arr = todoController.getData();
            // arr.splice(index, 1);
            //   localStorage.clear();
              
              localStorage.setItem(todoModel.dbName, JSON.stringify(arr));
            //    this.template.remove();
              this.template.innerHTML = '';
            localStorage.clear();
            //   todoView.onLoadFunc();
              
              
        }
    },
    createTemplate(titleText = '', descriptionText = '', completedText = '', checkboxTick=false, buttonText = 'Delete element', deleteAllText = 'Delete all') {
        // num++;
        // console.log(num);
        const mainWrp = document.createElement('div');
        
        mainWrp.className = 'col-4';

        const wrp = document.createElement('div');
        wrp.className = 'taskWrapper';
        wrp.id = `${num++}`;
        mainWrp.append(wrp);

        const title = document.createElement('div');
        title.innerHTML = titleText;
        title.className = 'taskHeading';
        wrp.append(title);

        const description = document.createElement('div');
        description.innerHTML = descriptionText;
        description.className = 'taskDescription'
        wrp.append(description);

        const completed = document.createElement('div');
        completed.innerHTML = completedText;
        completed.className = 'taskCompleted'
        wrp.append(completed);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = checkboxTick;
        checkbox.className = 'taskCheckbox'
        wrp.append(checkbox);

        const button = document.createElement('button');
        button.innerHTML = buttonText;
        button.className = 'taskButton'
        wrp.append(button);
        

        const deleteAll = document.createElement('button');  
        deleteAll.innerHTML = deleteAllText;
        deleteAll.className = 'taskdeleteAll'
        mainWrp.append(deleteAll);
        return mainWrp;
    },
    renderItem({ title, description, completed, checkbox }) {
        
        const template = this.createTemplate(title, description, completed, checkbox);
        document.querySelector('#todoItems').prepend(template);
        // console.log(template);
    }
}
// localStorage.clear();
// console.log(todoController.getData()[todoController.getData().length-1]);



//  console.log(typeof(false));




todoView.createTemplate();


//— Добавить к каждому todo item который создается при сабмите формы поле completed

//— поле completed должно содержать false когда пользователь только что создал todo item

//— Поле completed можно изменить прямо из элемента todo http://joxi.ru/GrqX0JLf4v1Y5A — нужно добавить в него checkbox

//— Если задача не выполнена — нежно чтобы в чекбоксе не было галочки, а если выполнена — чтобы была (сразу после создания todo item галочки нету)

//— Если пользователь нажимает на текущем элементе на галочку то нужно изменять статус текущей задачи на выполненный (completed: true)

//— Так как все todo items у нас хранятся в массиве внутри localStorage то с ним нам и нужно работать

//— Добавить возможность удалять каждый отдельный todo item

//— Добавить возможность удалять сразу все todo items







todoView.setEvents();



   // // console.log(boxCheck.target.checked);
       
        // if (boxCheck.target.checked) {
        //     let firstElem = boxCheck.target.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        //     let secondElem = boxCheck.target.previousElementSibling.previousElementSibling.innerHTML;
        //     let arr = [];
        //     console.log(todoController.getData());
        //     // 
        //     arr = todoController.getData().map(itemCheck => {
        //     //   console.log(itemCheck);
                
        //         if (itemCheck.title === firstElem && itemCheck.description === secondElem) {
        //             itemCheck.completed = 'true';
        //             itemCheck.checkbox = true;
        //         }
        //         return itemCheck;
        //             // console.log(itemCheck);
        //             // console.log(todoController.getData());
        //         // }

        //     });
        //     // console.log(arr);
        //     localStorage.clear();
        //     this.template.innerHTML = '';
        //     // нужно стереть все тудушки;
        //     todoController.setData(arr);
        //     localStorage.setItem(todoModel.dbName, JSON.stringify(arr));
        //     // console.log(todoModel.getData());
           
        // //    mainWrp.remove();
           
        //     // console.log(this.template);
        //     todoView.onLoadFunc();

        // }