import { IoMdClose } from "react-icons/io";
import "./Drawer.css";

interface DrawerProps {
  isDrawerOpen: boolean;
  hideDrawer: () => void;
  children: React.ReactElement;
  className?: string;
  heading?: string;
}
const Drawer = (props: DrawerProps) => {
  const {
    isDrawerOpen,
    hideDrawer,
    children,
    className = "",
    heading = "",
  } = props;

  return (
    <div>
      <div
        className={`fixed top-0 right-0 h-full w-1/4 bg-white
        ${isDrawerOpen && "animation-slideIn"}
        z-20 ${className} overflow-scroll`}
      >
        <div className="px-6 py-4">
          <div className="flex justify-between">
            <h3 className="text-[1.35rem] font-semibold tracking-wider">
              {heading}
            </h3>

            <button className="" onClick={hideDrawer}>
              <IoMdClose size={"24px"} color="black" />
            </button>
          </div>

          <div className="mt-6">{children}</div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={hideDrawer}
      ></div>
    </div>
  );
};

export default Drawer;
