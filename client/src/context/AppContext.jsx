import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from "../assets/assets";


const AppContext = createContext()

export const AppContextProvider = ({children}) => {
    
    const navigate = useNavigate()
    const [user,setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const fetchUserFromBackend = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        setUser(null);
        return;
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        
        if (data.success) {
            setUser(data.user);
        } else {
            localStorage.removeItem('token');
            setUser(null);
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
    }
};

    const fetchUser = async () => {
        setUser(dummyUserData); // Replace with actual user fetching logic
    }

    const fetchUsersChats = async () => {
        setChats(dummyChats)
        setSelectedChat(dummyChats[0])
    }

    useEffect(() => {
        if(theme === 'dark'){
            document.documentElement.classList.add('dark');
        }
        else{
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    useEffect(() => {
        if(user){
            fetchUsersChats();
        }
        else{
            setChats([]);
            setSelectedChat(null);
        }
    },[user]);

    useEffect(() => {
        fetchUser();
    }, []);

    const value = {
        navigate, user, setUser, chats, setChats, selectedChat, setSelectedChat, theme, setTheme
    }
    
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=> useContext(AppContext)