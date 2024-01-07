import Header from "@/components/Header";

const LayoutComponent = ({ children }) => {
  return (
    <div className=" flex flex-col h-screen ">
      <header >
        <Header />
      </header>

      <div className="flex-1">{children}</div>
    </div>
  );
};

export default LayoutComponent;
