import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@api/ProjectAPI";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { isManager } from "@utils/policies";
import { useAuth } from "@hooks/useAuth";

export default function EditProject() {
    const params = useParams();
    const projectId = params.projectId!;
    const { data: user, isLoading: authLoading } = useAuth();
    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId],
        queryFn: () => getProjectById(projectId),
        staleTime: 5 * 60 * 1000, // Cache durante 5 minutos
        retry: false,
    });

    // Espera a que ambos estados de carga terminen antes de validar
    if (authLoading || isLoading) {
        return <div className="min-h-screen text-center font-bold text-purple-700 text-2xl">Cargando...</div>;
    }

    // Manejo de errores o datos faltantes
    if (isError || !data || !user) {
        return <Navigate to="/404" />;
    }

    // Validar si el usuario es manager
    if (isManager(data.manager, user._id)) {
        return <EditProjectForm data={data} projectId={projectId} />;
    }

    return <Navigate to="/404" />;
}
