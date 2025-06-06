import { Link } from "react-router";

type SmallCardProps = {
  logo: string;
  count: number;
  name: string;
};

const SmallCard = ({ logo, count, name }: SmallCardProps) => {
  const carCountText =
    String(count).slice(-1) === "1" && count !== 11 ? "vozilo" : "vozila";

  return (
    <Link
      to="/"
      className=" max-w-[200px] rounded-md bg-white px-3 py-2  flex gap-x-4 items-center border-2 border-transparent transition-all duration-500 hover:border-primary"
    >
      <img src={logo} className=" w-10 h-10  object-cover" />
      <div>
        <h3 className=" font-[600] text-[1.1rem]">{name}</h3>
        <p className="  text-gray-500 ">
          {count} {carCountText}
        </p>
      </div>
    </Link>
  );
};

export default SmallCard;
