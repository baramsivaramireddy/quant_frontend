import Header from "@/components/Header";

const LayoutComponent = ({ children }) => {
  return (
    <div>
      <div>
        <Header />
      </div>

      <div>
        {children}
      </div>
    </div>
  );
};

export default LayoutComponent;
