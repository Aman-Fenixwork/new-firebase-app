// import Login from "../../components/login/Login"
import withAuth from "@HOC/withAuth";
import dynamic from 'next/dynamic';
const Login = dynamic(import('@components/login/Login'), { ssr: false })

const LoginPage = () => {
  return (<Login />)
}

export default withAuth(LoginPage);