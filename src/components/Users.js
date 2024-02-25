import { useState, useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigation, useLocation } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigation();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get("/users", {
                    signal: controller.signal
                })
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (e) {
                console.log(e);
                navigate("/login", { state: { from: location }, replace: true })
            }
        }
        getUsers();
        // useeffect cleanup function
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (<ul>{users.map((user, i) => <li key={i}>{user?.username}</li>)}</ul>) : (

                    <p>No users to dipplay</p>
                )
            }
        </article>
    )
}

export default Users