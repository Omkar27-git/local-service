// pages/CheckEmail.tsx
const CheckEmail = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          Verify your email 📧
        </h2>
        <p>
          We’ve sent a verification link to your email.
          <br />
          Please check your inbox and click the link to continue.
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
