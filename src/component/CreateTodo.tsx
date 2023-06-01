import { useState } from "react"
import { todoInput } from '../types';
import { api } from "y/utils/api";


export default function CreateTodo() {

    const [newTodo, setNewTodo] = useState('')

    const trpc = api.useContext()

    const { mutate } = api.todo.create.useMutation({
        onSettled: async () => {
            await trpc.todo.all.invalidate()
        }
    });

    return (
        <>
            <h3 className="text-xl font-bold">Add new todo</h3>
            <form onSubmit={(e) => {
                e.preventDefault()
                const result = todoInput.safeParse(newTodo)

                if (!result.success) {
                    // toast.error(result.error.format()._errors.join('\n'))
                    // return
                    console.log(result.error)
                }

                mutate(newTodo)
            }} className="flex gap-2">
                <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="New Todo..."
                    type="text" name="new-todo" id="new-todo"
                    value={newTodo}
                    onChange={(e) => {
                        setNewTodo(e.target.value)
                    }}
                />
                <button
                    className="text-white bg-blue-700 rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >Create</button>
            </form>
        </>
    )
}