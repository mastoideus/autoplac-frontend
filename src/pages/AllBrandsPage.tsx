import AlphabeticalList from "@/components/global/AlphabeticalList";

const AllBrandsPage = () => {
  return (
    <div className=" bg-[#fafafa]">
      <div className=" page_layout">
        <AlphabeticalList title="Lista svih proizvođača" type="brands" />
      </div>
    </div>
  );
};

export default AllBrandsPage;
