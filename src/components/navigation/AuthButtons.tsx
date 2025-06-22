import { Button } from "../ui/button";
import { Link } from "react-router";
import { FaBars } from "react-icons/fa6";

const AuthButtons = ({ onMobileForm }: { onMobileForm: () => void }) => {
  return (
    <>
      <div className=" hidden md:block">
        <Button
          asChild
          variant="outline"
          size="lg"
          className=" text-md hover:bg-transparent font-[500] shadow-none  "
        >
          <Link to="/login">Prijava</Link>
        </Button>
        <Button
          asChild
          size="lg"
          className=" text-md  bg-blue-900 text-white font-[500] "
        >
          <Link to="/register">Registracija</Link>
        </Button>
      </div>
      <div className="block md:hidden">
        <Button
          variant="outline"
          className=" hover:bg-transparent"
          onClick={onMobileForm}
        >
          <FaBars size={27} className=" text-gray-500" />
        </Button>
      </div>
    </>
  );
};

export default AuthButtons;
