import React from "react";

const AccessibleName = () => {
  return (
    <div>
      <button>Submit</button>
      <button>Cancel</button>
      <label htmlFor="email">Email</label>
      <input id="email" type="text" />
      <label htmlFor="search">Search</label>
      <input id="search" type="text" />
      <button aria-label="sign in">
        <svg />
      </button>
      <button aria-label="sign out">
        <svg />
      </button>
    </div>
  );
};

export default AccessibleName;
