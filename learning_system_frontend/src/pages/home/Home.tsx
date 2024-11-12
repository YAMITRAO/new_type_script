import UserContextData from "../../context/user_context/UserContext";

const Home = () => {
  const { state, dispatch } = UserContextData();
  console.log("context values are :-", state.id, dispatch);
  return (
    <>
      <div className="h-screen w-full">
        {!state.id && (
          <div className=" text-3xl text-slate-700 flex justify-center mt-20">
            Register Project:{" "}
            <span className="text-red-700 hover:underline cursor-pointer transition-all">
              {" "}
              Click Here
            </span>
          </div>
        )}
        {state.id && <div>Alreay registered</div>}
      </div>
    </>
  );
};

export default Home;
