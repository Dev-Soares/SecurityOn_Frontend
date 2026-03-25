import { useNavigate } from 'react-router-dom'

const useNavigateTo = () => {
  const navigate = useNavigate()
  return (path: string) => navigate(path)
}

export default useNavigateTo
