import React from 'react';
import { useSelector } from 'react-redux';


const CmsCard = ({ handleSubmit, handleChange, formData}) => {


  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData); // Call the prop function with the formData
  };

  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
 


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
              type="email"
              className="form-control"
              id="email"
              name="email"
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
            <button type="submit" className="btn btn-primary btn-lg">
              Login
            </button>
          </div>
          {status === 'loading' && <p>Logging in...</p>}
          {status === 'failed' && <p>Error: {error}</p>}
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
