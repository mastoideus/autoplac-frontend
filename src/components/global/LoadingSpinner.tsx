import { Loader2 } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );
};

export default Spinner;
