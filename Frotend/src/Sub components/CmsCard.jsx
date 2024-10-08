import React from 'react';

const CmsCard = ({ handleSubmit, handleChange, formData ,setIsLoggedIn}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData); // Call the prop function with the formData
  };


 
    const handleLogin = () => {
      setIsLoggedIn(true);
    };
  


  return (
    <div className="card shadow-lg pt-5 mt-5" style={{ maxWidth: "400px", width: "100%" }}>
      <div className="card-header bg-primary text-white text-center pt-5">
        <h3>Admin Login</h3>
      </div>
      <div className="card-body p-4">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange} // Use the passed down function
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange} // Use the passed down function
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-lg" onClick={handleLogin}>
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="card-footer text-center">
        <small>
          <a href="#" className="text-decoration-none text-muted">
            Forgot your password?
          </a>
        </small>
      </div>
    </div>
  );
};

export default CmsCard;
