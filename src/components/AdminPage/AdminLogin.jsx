import { useOutletContext } from "react-router-dom";

const AdminLogin = () => {
  const {handleSubmit} = useOutletContext()
    return (
      <div className="w-full min-h-[80vh] flex justify-center items-center">
        <div className="flex flex-col items-stretch gap-6">
          <h1 className="text-4xl text-center">Admin Panel</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="bg-transparent border-slate-500 rounded border p-1"
            />
            <button className="bg-primary rounded py-1">Login</button>
          </form>
        </div>
      </div>
    );
  };
  export default AdminLogin