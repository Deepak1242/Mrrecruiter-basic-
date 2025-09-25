import { Navigate } from 'react-router-dom'
import {useRecoilValue} from "recoil";
import { isLoggedIn } from '../state/auth';

export default function ProtectedRoute({ children }) {
  const isLoggedInState = useRecoilValue(isLoggedIn);
  

  if (!isLoggedInState) {
    return <Navigate to="/login" />
  }
  return children
}
