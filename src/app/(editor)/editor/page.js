import AuthWrapper from "@/components/Auth/AuthWrapper";
const EditorPage = () => {
  return (
    <AuthWrapper allowedRoles={["editor"]}>
      <div>editor page</div>
    </AuthWrapper>
  );
};
export default EditorPage;
