import { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function AppBar() {
    const [name, setName] = useState();
    const navigate  = useNavigate();

    useEffect(() => {
        setName(localStorage.getItem("name"));
    }, [])

    const handleSubmit = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name"),
        navigate("/signin")
    }

    

    return <div>
        <header className="flex justify-between items-center p-3 border-b-[1px] border-b-gray-400 shadow-sm">
            <div>
                <div className="flex gap-2 items-center">
                  <FaTasks className="h-7 w-7"></FaTasks>
                  <span className="text-xl font-bold ">ToDo</span>
                </div>
            </div>
            <div>
                <snap>Hi, {name}</snap>
            </div>
            <div>
                <ul>
                    <li>
                        <button className="bg-red-500 rounded-md text-white py-1.5 px-3" onClick={handleSubmit}>Logout</button>
                    </li>
              
                </ul>
            </div>
        </header>
    </div>

}