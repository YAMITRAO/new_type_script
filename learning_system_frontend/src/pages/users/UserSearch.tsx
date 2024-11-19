interface UserSearch_int {
  onSearch: (data: string) => void;
}

const UserSearch: React.FC<UserSearch_int> = ({ onSearch }) => {
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  return (
    <div className=" mt-6  w-full  mx-auto flex justify-center">
      {/* search  */}

      <div className="w-[80%]">
        <input
          type="text"
          className="w-full p-1 border border-gray-400 rounded  outline-none indent-2"
          placeholder="Search"
          onChange={searchHandler}
        />
      </div>
    </div>
  );
};

export default UserSearch;
