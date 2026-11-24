import { Routes, Route, Navigate, } from 'react-router-dom'
import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CreateArticlePage from './pages/CreateArticlePage'
import CommunityPage from './pages/CommunityPage'
import ArticlesPage from './pages/ArticlesPage'
import ComplaintsPage from './pages/ComplaintsPage'
import CheckSitePage from './pages/CheckSitePage'
import ProfilePage from './pages/ProfilePage'
import FriendsPage from './pages/FriendsPage'
import ArticleDetailPage from './pages/ArticleDetailPage'
import CreateComplaintRoute from './pages/CreateComplaintRoute'
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
          {/* O formulário virou painel lateral: o endereço antigo continua
              abrindo ele, por cima da listagem. */}
          <Route path="create-complaint" element={<CreateComplaintRoute />} />
          <Route path="check-site" element={<CheckSitePage />} />
          <Route path="friends" element={<FriendsPage />} />
          <Route path="profile/:id" element={<ProfilePage />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-article" element={<CreateArticlePage />} />
      </Routes>
    </>
  )
}

export default App
