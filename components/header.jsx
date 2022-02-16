const Header = () => {
  return (
    <>
      <div className="p-2 bg-sky-900 text-white flex flex-row justify-between">
        <div>
          <h1> Header </h1>
        </div>
        <div className="flex flex-row gap-8">
          <a href="./api/auth/signin"> Sign in </a>
          <a> Sign out </a>
        </div>
      </div>
    </>
  );
};

export default Header;
