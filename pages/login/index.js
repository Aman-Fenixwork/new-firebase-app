import Login from "../../components/login/Login"
import withAuth from "../../HOC/withAuth";

const LoginPage = () => {
  return (<Login />)
}

export default withAuth(LoginPage);