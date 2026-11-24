import Sidebar from "@/shared/layouts/Sidebar"
import Content from "@/shared/layouts/Content"
import CreateComplaintSheet from "@/modules/complaints/components/CreateComplaintSheet"
import { ComplaintSheetProvider } from "@/modules/complaints/contexts/complaintSheetContext"

const MainPage = () => {
  // O painel de denúncia é chamado do feed, de "Verificar site" e do card sem
  // resultado: mora aqui, acima de todas as rotas que o abrem.
  return (
    <ComplaintSheetProvider>
      <main className="flex min-h-screen w-full flex-row items-center justify-between 2xl:pl-32 bg-white dark:bg-gray-950">
        <Sidebar />
        <Content />
      </main>

      <CreateComplaintSheet />
    </ComplaintSheetProvider>
  )
}

export default MainPage
