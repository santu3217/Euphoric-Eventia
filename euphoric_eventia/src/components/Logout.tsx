import { useNavigate } from 'react-router-dom';


interface SignoutProps {
    onLogout: () => void;
  }

const Logout: React.FC<SignoutProps> = ({onLogout}) => {
    const navigate = useNavigate();
    // removing the user email  
    localStorage.removeItem('userEmail');
    onLogout();
    navigate('/');
    
    return null;
}

export default Logout;
