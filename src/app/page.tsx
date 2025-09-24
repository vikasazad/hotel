import Main from "./modules/main/components/main";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="p-2">
        <Main />
      </div>
    </ProtectedRoute>
  );
}
