import ProfileForm from "@/components/profile/ProfileForm"
import { useAuth } from "@hooks/useAuth"

export default function Profile() {
  const {data, isLoading} = useAuth()

  if(isLoading) return <div className="min-h-screen my-60 text-center justify-center font-bold text-purple-700 text-2xl">Cargando...</div>

  if(data) return <ProfileForm data={data}/>
}
