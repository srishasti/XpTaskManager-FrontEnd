import {useEffect} from 'react'

const Popup = ({msg, onClose}) =>{

    useEffect (() =>{
        const timer = setTimeout(() => {onClose(msg.id)},5000);
        return () => clearTimeout(timer);
    },[])
    
    

    return (
    

    <div style = {{ border:'1px solid black' }}>
                {msg.text}
            
    </div>
    )


}

export default Popup;