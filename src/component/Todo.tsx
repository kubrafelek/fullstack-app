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
        onMutate: async ({ id, done }) => {
            await trpc.todo.all.cancel()

            //Snapshot prev
            const previousTodos = trpc.todo.all.getData()

            trpc.todo.all.setData(undefined, (prev) => {
                if (!prev) return previousTodos
                return prev.map(t => {
                    if (t.id == id)
                        return ({
                            ...t,
                            done
                        })
                    return t
                })
            })
            return ({ previousTodos })
        },
        onSuccess: (err, { done }) => {
            if (done)
                console.log('Success ....')
        },
        onError: (err, newTodo, context) => {
            console.error(`Error when setting todo ${done ? 'done' : 'undone'}`)
            trpc.todo.all.setData(undefined, () => context?.previousTodos)
        },
        onSettled: async () => {
            await trpc.todo.all.invalidate()
        }
    })

    const { mutate: deleteMutation } = api.todo.delete.useMutation({
        onMutate: async (deleteId) => {
            await trpc.todo.all.cancel()

            //Snapshot prev
            const previousTodos = trpc.todo.all.getData()

            trpc.todo.all.setData(undefined, (prev) => {
                if (!prev) return previousTodos
                return prev.filter(t => t.id != deleteId)
            })
            return ({ previousTodos })
        },
        onError: (err, newTodo, context) => {
            console.error('Error when deleting todo')
            trpc.todo.all.setData(undefined, () => context?.previousTodos)
        },
        onSettled: async () => {
            await trpc.todo.all.invalidate()
        }
    })

    return (
        <>
            <div className='flex gap-2 items-center justify-between'>
                <div className='flex gap-2 items-center '>
                    <input className='cursor-pointer flex gap-2 items-center'
                        type='checkbox' name='done' id={id} checked={done}
                        onChange={(e) => {
                            doneMutation({ id, done: e.target.checked })
                        }} />
                    <label htmlFor={id} className={`cursor-pointer ${done ? 'line-through' : ''}`}>
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