// import toast from "react-hot-toast";
import type { Todo } from "../types";
import { api } from "../utils/api";


type TodoProps = {
    todo: Todo
}

export default function Todo({ todo }: TodoProps) {
    const { id, text, done } = todo

    const trpc = api.useContext()

    const { mutate: doneMutation } = api.todo.toggle.useMutation({
        onSettled: async () => {
            await trpc.todo.all.invalidate()
        }
    })

    const { mutate: deleteMutation } = api.todo.delete.useMutation({
        onSettled: async () => {
            await trpc.todo.all.invalidate()
        }
    })

    return (
        <>
            <div className='flex gap-2 items-center justify-between'>
                <div className='flex gap-2 items-center '>
                    <input className='cursor-pointer flex gap-2 items-center'
                        type='checkbox' name='done' id='done' checked={done}
                        onChange={(e) => {
                            doneMutation({ id, done: e.target.checked })
                        }} />
                    <label htmlFor='done' className={`cursor-pointer`}>
                        {text}
                    </label>
                </div>
                <button className='bg-transparent hover:bg-red-700 text-blue-500 
                font-semibold hover:text-white 
                mt-2 py-1 px-2 border 
                border-blue-500 hover:border-transparent rounded'
                    onClick={(e) => {
                        deleteMutation(id)
                    }}>
                    Delete
                </button>

            </div>
        </>
    )
}