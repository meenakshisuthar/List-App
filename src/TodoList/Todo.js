import React, {useState, useEffect} from 'react'
import "./Todo.css"

// get the localstorage data back
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist")
    if(lists){
        return JSON.parse(lists)
    }else{
        return[]
    }
}

const Todo = () => {
    const [inputData, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [isEditItem, setIsEditItem] = useState("")
    const [toggleButton, setToggleButton] = useState(false)

    // add the items function
    const addItems = () =>{
        if(!inputData){
            alert("Plz fill the data")
        }else if(inputData && toggleButton){
            setItems(
                items.map((curElement) => {
                    if(curElement.id === isEditItem){
                        return {...curElement, name : inputData }
                    }
                    return curElement
                })
            )
            setInputData([])
            setIsEditItem(null)
            setToggleButton(false)
        }
        
        else{
           const myNewInputData = {
             id: new Date().getTime().toString(),
             name: inputData
           }
           setItems([...items, myNewInputData])
           setInputData("")
        }
    }
    
    // how to edit items
    const editItem = (index) => {
       const item_todo_edited = items.find((curElement) => {
        return curElement.id === index
       })
       setInputData(item_todo_edited.name)
       setIsEditItem(index)
       setToggleButton(true)
    }

    // how to delete items
     const deleteItem = (index) => {
         const updatedItems = items.filter((curElement) => {
            return curElement.id !== index
         })
         setItems(updatedItems)
     }

    //  remove all the elements
    const removeAll = () =>{
        setItems([])
    }

    // adding local storage
    useEffect(() => {
      localStorage.setItem("mytodolist", JSON.stringify(items))
    }, [items])

  return (
    <>
     <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="./images/todo.svg" alt="todologo"/>
                <figCaption>Add Your List Here ✌️</figCaption>
            </figure>
            <div className="addItems">
                <input type="text" placeholder='✍️ Add Items' className='form-control' value={inputData} onChange={(event) => 
                    setInputData(event.target.value)
                }/>
                {toggleButton ?
                 (<i className="far fa-edit add-btn" onClick={addItems}></i>) :
                 (<i className="fa fa-plus add-btn" onClick={addItems}></i>)
                 }
            </div>

             {/* Show our items */}
                <div className="showItems">
                    {items.map((curElement) => {
                        return(<div className="eachItem" key={curElement.id}>
                                  <h3>{curElement.name}</h3>
                                  <div className="todo-btn">
                                    <i className="far fa-edit add-btn" onClick={() => editItem(curElement.id)}></i>
                                    <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(curElement.id)}></i>
                                  </div>
                               </div>)
                     })}
                </div>
             {/* Remove all button */}

            <div className="showItems">
                <button className="btn effect04" data-sm-link-text="REMOVE ALL" onClick={removeAll}>
                    <span>CHECK LIST</span>
                </button>
            </div>
        </div>
     </div> 
    </>
  )
}

export default Todo
