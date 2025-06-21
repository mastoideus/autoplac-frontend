import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const InfoGridRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className={`flex items-center justify-between p-4 text-sm bg-gray-50`}>
      <p className=" font-[500] capitalize">{label}</p>
      <div>
        <p>{value}</p>
        {typeof value === "boolean" && value === true && (
          <FaCheck color="lightgreen" />
        )}
        {typeof value === "boolean" && value === false && (
          <ImCross className=" text-red-400" />
        )}
      </div>
    </div>
  );
};

export default InfoGridRow;
