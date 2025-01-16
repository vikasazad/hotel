import React from "react";
import Services from "../modules/services/components/services";
import { getServices } from "../modules/services/utils/servicesApi";

const page = async () => {
  const _service = await getServices();

  return (
    <div>
      <Services data={_service} />
    </div>
  );
};

export default page;
