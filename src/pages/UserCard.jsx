export const UserCard = ({ user }) => {
    if (!user) {
    return <div className="p-5">No user data</div>;
  }
  const { photoUrl, firstName, lastName, about } = user;
  

  return (
    <div>
    
      <div  className="card bg-base-300 w-70 shadow-sm m-4">
        <figure>
          <img
            src={photoUrl}
            alt={firstName}
            className="w-full h-60 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <p>{about}</p>
          <div className="card-actions justify-center gap-6">
            <button className="btn btn-secondary">Interested</button>
            <button className="btn btn-primary">Reject</button>
          </div>
        </div>
      </div>
    </div>
  );
};
