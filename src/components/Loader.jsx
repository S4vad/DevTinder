import { SyncLoader  } from "react-spinners";

export const Loader = () => {
  return (
          <div className="flex justify-center items-center h-screen">
        <SyncLoader color="#3B82F6" size={13}/> 
      </div>
  )
}
