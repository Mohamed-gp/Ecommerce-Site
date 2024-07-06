const AdminDashboardOrderCard = () => {
  return (
    <div
      style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      className="flex bg-white flex-col justify-center items-center p-6 rounded-lg lg:w-3/12 w-full"
    >
      <p>Today</p>
      <p className="text-mainColor text-xl  my-2">2</p>
      <p>2 orders Today</p>
    </div>
  );
};
export default AdminDashboardOrderCard;
