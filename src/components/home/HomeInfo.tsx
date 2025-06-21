import mrezeImage from "@/assets/images/mreze.png";

const HomeInfo = () => {
  return (
    <div className="text-center">
      <h2 className=" text-xl md:text-4xl font-semibold ">
        Kako funkcioniše AutoPlac
      </h2>
      <div className=" w-24 h-[3px] bg-primary text-center mx-auto my-4"></div>
      <div className="mt-10">
        <p className="mb-6 text-gray-500">
          Nakon registracije profila, potpuno besplatno, u samo nekoliko koraka
          objavite Vaše vozilo.
        </p>
        <p className=" mb-6 text-gray-500">
          Za veću vidljivost Vašeg oglasa koristite AP kredite za jednostavno
          kreiranje promotivne kampanje na najvećim marketinškim platformama:
          Facebook, Instagram, Google i/ili MonadPlug sa svojih 500 partnera!
        </p>
        <img src={mrezeImage} />
      </div>
    </div>
  );
};

export default HomeInfo;
