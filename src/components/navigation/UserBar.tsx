import { FaRegHeart } from "react-icons/fa";
import { TbMessageDots } from "react-icons/tb";
import DropdownUserMenu from "./DropdownUserMenu";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import customFetch from "@/axios";
import Spinner from "../global/LoadingSpinner";
import { useNavigate } from "react-router";
import { useAuthContext } from "@/lib/context/authContext";

const UserBar = () => {
  const { logoutHandler } = useAuthContext();
  const navigate = useNavigate();

  const { mutate: logoutMutate } = useMutation({
    mutationFn: () =>
      customFetch.get("/api/auth/logout", { withCredentials: true }),
    onSuccess: () => {
      logoutHandler();
      navigate("/");
    },
  });

  function logoutUserHandler() {
    logoutMutate();
  }

  /*if (isLoading) {
    return (
      <div className=" h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }*/
  return (
    <div className=" flex items-center gap-x-6">
      <Link to="/" className=" relative">
        <FaRegHeart className=" text-gray-500" size={27} />
        <Badge className=" absolute -top-2 border-white border-[2px] -right-4 h-5 w-2 flex items-center justify-center text-white rounded-full  font-mono tabular-nums">
          1
        </Badge>
      </Link>
      <Link to="/">
        <TbMessageDots className=" text-gray-500" size={27} />
      </Link>
      <div className=" ml-3">
        <DropdownUserMenu onClick={logoutUserHandler} />
      </div>
    </div>
  );
};

export default UserBar;
