"use client";

import PageLayout from "../components/PageLayout";
import OrderTable from "./OrderTable";

const Order: React.FC = () => {
  return (
    <>
      <PageLayout
        title="Order"
      >
        <OrderTable />
      </PageLayout>
    </>
  );
};

export default Order;
