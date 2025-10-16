import RegistrationForm from "./components/registration-form";

const Register = () => {
  return (
    <div id="register-page" className="h-screen flex justify-center items-center">
      <div className="flex w-full lg:w-10/12 justify-center items-center bg-white space-y-8">
        <div className="w-full px-8">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
