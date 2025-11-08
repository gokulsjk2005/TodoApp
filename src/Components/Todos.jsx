import checkedIcon from './Assets/checked.png'
import uncheckedIcon from './Assets/unchecked.png'
import cross from './Assets/close.png'

const Todos = ({text,no,display,fn}) => {
  
    const toggleImg = () => {
        let data = JSON.parse(localStorage.getItem("MyTodos"));
        for(let i=0;i<data.length;i++){
            if(data[i].no===no){
                if(data[i].display===""){
                    data[i].display = "checked";
                }
                else{
                    data[i].display = "";
                }
                break;
            }
        }
        fn(data);
        // data.sort((a,b)=>(a.display==="checked")-(b.display==="checked"));
        localStorage.setItem("MyTodos",JSON.stringify(data));
    }

    const deleteTodos = (no) => {
        let data = JSON.parse(localStorage.getItem("MyTodos"));
        data = data.filter((todo)=>todo.no!==no);
        fn(data);
    }

    return (

        <div className='todos w-full'>
            <div className="flex items-center justify-between w-full xs:px-10 py-1.5">
                <div className="flex gap-5 items-center" onClick={()=>toggleImg(no)}>
                    {display===""?<img src={uncheckedIcon} className='w-6 h-6 cursor-pointer' />:<img src={checkedIcon} className='w-6 h-6 cursor-pointer'/>}
                    <h1 className={`text-lg ${display}`}>{text}</h1>
                </div>
                <div className="p2">
                    <img src={cross} className='w-4 h-4 cursor-pointer' onClick={()=>deleteTodos(no)}/>
                </div>
            </div>
        </div>

  )
}

export default Todos