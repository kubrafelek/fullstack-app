import { NextPage } from "next";
import { useRouter } from "next/router";

const User: NextPage = () => {

    const id = useRouter().query.user;

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            Hello {id}
        </div>
    );
}

export default User;
