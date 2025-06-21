import { FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { BsExclamationTriangleFill } from "react-icons/bs";

const SingleUserBox = ({ city }: { city: string }) => {
  return (
    <section className=" w-full">
      <div className=" flex items-center gap-x-3 bg-gray-50 p-2 rounded-sm">
        <FaCircleUser size={50} color="gray" />
        <div>
          <h3 className=" text-[1rem]">Username</h3>
          <p className=" text-gray-400">{city}</p>
        </div>
      </div>
      <div className="my-6 ">
        <p className=" flex items-center justify-between mb-1 ">
          Online <span> prije 6 mjeseci</span>
        </p>
        <p className=" flex  items-center justify-between mb-1">
          ID<span>71051</span>
        </p>
        <p className=" flex  items-center justify-between mb-1">
          Registrovan<span>20.11.2023</span>
        </p>
      </div>
      <div>
        <Button
          asChild
          className="mb-3 hover:bg-yellow-50 bg-yellow-100 p-4 text-yellow-600  border-2 border-yellow-300"
          variant="outline"
        >
          <Link to="/register">
            <BsExclamationTriangleFill color="gray" />
            Prijavi se da vidiš broj telefona
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className=" bg-yellow-100 hover:bg-yellow-50 text-yellow-600 p-4  border-2 border-yellow-300"
        >
          <Link to="/register">
            <BsExclamationTriangleFill color="gray" />
            Prijavi se da pošalješ poruku
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default SingleUserBox;
