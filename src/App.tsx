import { Routes, Route, Navigate, } from 'react-router-dom'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CreateComplaintPage from './pages/CreateComplaintPage'
import CommunityPage from './pages/CommunityPage'
import ArticlesPage from './pages/ArticlesPage'
import ComplaintsPage from './pages/ComplaintsPage'
import ProfilePage from './pages/ProfilePage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import { ScrollToTop } from './shared/utils/scrollToTop'



const App = () => {
  return (
    <>
    <ScrollToTop />
    <Routes>
        <Route path="/" element={ <MainPage />}>

        <Route index element={<Navigate to="community" replace />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="articles" element={<ArticlesPage />} />
            <Route path="articles/:slug" element={<ArticleDetailPage />} />
            <Route path="complaint" element={<ComplaintsPage />} />
            <Route path="profile" element={<ProfilePage />} />           
        </Route>

        <Route path="/login" element={ <LoginPage />} />
        <Route path="/signup" element={ <SignupPage />} />
        <Route path="/create-complaint" element={ <CreateComplaintPage />} />

    </Routes>
    </>
  )
}

export default App
