import { ReactComponent as EditIcon } from '../assets/icons/editIcon.svg'
import { ReactComponent as DragIcon } from '../assets/icons/dragIcon.svg'
import { ReactComponent as DeleteIcon } from '../assets/icons/deletIcon.svg'

const TodoItem = ({todo}: any) => {
    return (
    <div 
    key={todo.id} 
    className='px-2'>
    <li
      key={todo.id}
      className='bg-white items-center border-b-2 py-0 md:py-2 px-2 md:px-5 flex rounded-lg mb-3 ml-auto mr-auto mt-4'
    >
      <input
        type='checkbox'
        className='h-4 w-4 md:h-7 md:w-7 mt-auto mb-auto mr-2 ml-2 rounded-full text-[#4d3434] focus:ring-[#757575]'
        id={todo.id}
        checked={todo.isComplete}
        // onChange={checkboxhandler}
      />
      <div className='text-[#676767] font-light md:font-bold mr-auto p-2 md:text-sm text-[12px]'>
        {todo.todoText}
      </div>
      <div className='text-[13.5px] md:text-base cursor-pointer md:space-x-12 space-x-4 justify-items-center flex '>
        <EditIcon />
        <DeleteIcon />
        <DragIcon />
      </div>
    </li>
  </div>)
}

export default TodoItem;