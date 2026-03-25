import { Routes, Route, Navigate, } from 'react-router-dom'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CreateComplaintPage from './pages/CreateComplaintPage'
import CreateArticlePage from './pages/CreateArticlePage'
import CommunityPage from './pages/CommunityPage'
import ArticlesPage from './pages/ArticlesPage'
import ComplaintsPage from './pages/ComplaintsPage'
import ProfilePage from './pages/ProfilePage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import { ScrollToTop } from './shared/utils/scrollToTop'
import { AppToaster } from './shared/components/Toast'

const App = () => {
  return (
    <>
      <ScrollToTop />
      <AppToaster />

      <Routes>
        <Route path="/" element={<MainPage />}>

          <Route index element={<Navigate to="community" replace />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:id" element={<ArticleDetailPage />} />
          <Route path="complaint" element={<ComplaintsPage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-complaint" element={<CreateComplaintPage />} />
        <Route path="/create-article" element={<CreateArticlePage />} />
      </Routes>
    </>
  )
}

export default App
